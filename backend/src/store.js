import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILES_FILE = path.join(__dirname, 'data', 'profiles.json');
const STATE_FILE = path.join(__dirname, 'data', 'user_state.json');

// Initialize default state
const DEFAULT_STATE = {
  swipes: {}, // { profileId: 'like' | 'pass' }
  matches: [], // Array of matched profile objects with matchedAt
  swipeHistory: [], // Array of { profileId, action, timestamp } for Undo support
  activeCircle: 'All'
};

class DataStore {
  constructor() {
    this.profiles = [];
    this.state = { ...DEFAULT_STATE };
    this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(PROFILES_FILE)) {
        const rawProfiles = fs.readFileSync(PROFILES_FILE, 'utf-8');
        this.profiles = JSON.parse(rawProfiles);
      } else {
        console.error('profiles.json not found!');
        this.profiles = [];
      }

      if (fs.existsSync(STATE_FILE)) {
        const rawState = fs.readFileSync(STATE_FILE, 'utf-8');
        this.state = JSON.parse(rawState);
      } else {
        this.saveState();
      }
    } catch (err) {
      console.error('Error reading data files:', err);
    }
  }

  saveState() {
    try {
      fs.writeFileSync(STATE_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing user_state.json:', err);
    }
  }

  /**
   * Returns feed of profiles the user has not yet swiped on.
   * STRICT COY PRIVACY PROMISE:
   * Strips out `hasLikedUser` so the client NEVER learns if someone already liked them.
   */
  getFeed(circleFilter = 'All') {
    return this.profiles
      .filter((p) => !this.state.swipes[p.id])
      .filter((p) => {
        if (!circleFilter || circleFilter === 'All') return true;
        return p.circle === circleFilter;
      })
      .map((p) => {
        // Strip sensitive server-side match data
        const { hasLikedUser, ...publicProfile } = p;
        return publicProfile;
      });
  }

  /**
   * Process a swipe action ('like' or 'pass')
   */
  swipe(profileId, action) {
    if (!profileId || !['like', 'pass'].includes(action)) {
      throw new Error('Invalid swipe payload');
    }

    const targetProfile = this.profiles.find((p) => p.id === profileId);
    if (!targetProfile) {
      throw new Error('Profile not found');
    }

    // Record swipe
    this.state.swipes[profileId] = action;
    this.state.swipeHistory.push({
      profileId,
      action,
      timestamp: new Date().toISOString()
    });

    let isMatch = false;
    let matchProfile = null;

    // Check mutual like condition
    if (action === 'like' && targetProfile.hasLikedUser) {
      isMatch = true;
      const alreadyMatched = this.state.matches.some((m) => m.id === profileId);
      if (!alreadyMatched) {
        const { hasLikedUser, ...safeProfile } = targetProfile;
        matchProfile = {
          ...safeProfile,
          matchedAt: new Date().toISOString()
        };
        this.state.matches.unshift(matchProfile);
      }
    }

    this.saveState();

    return {
      success: true,
      profileId,
      action,
      isMatch,
      matchProfile
    };
  }

  /**
   * Rewind/Undo the last swipe (Quality-of-Life feature)
   */
  undo() {
    if (!this.state.swipeHistory || this.state.swipeHistory.length === 0) {
      return { success: false, message: 'No swipe history to undo' };
    }

    const lastSwipe = this.state.swipeHistory.pop();
    const { profileId, action } = lastSwipe;

    // Remove from swipes
    delete this.state.swipes[profileId];

    // If it was a match, remove from matches
    if (action === 'like') {
      this.state.matches = this.state.matches.filter((m) => m.id !== profileId);
    }

    this.saveState();

    const restoredProfile = this.profiles.find((p) => p.id === profileId);
    const { hasLikedUser, ...safeProfile } = restoredProfile || {};

    return {
      success: true,
      restoredProfile: safeProfile,
      remainingHistoryCount: this.state.swipeHistory.length
    };
  }

  /**
   * Get all mutual matches
   */
  getMatches() {
    return this.state.matches;
  }

  /**
   * Reset all swipes and matches for testing / interview demo
   */
  resetState() {
    this.state = {
      swipes: {},
      matches: [],
      swipeHistory: [],
      activeCircle: 'All'
    };
    this.saveState();
    return { success: true, message: 'Feed and matches reset successfully' };
  }

  /**
   * Summary stats for developer/reviewer bar
   */
  getStats() {
    const totalProfiles = this.profiles.length;
    const swipedCount = Object.keys(this.state.swipes).length;
    const matchesCount = this.state.matches.length;
    const remainingCount = totalProfiles - swipedCount;

    return {
      totalProfiles,
      swipedCount,
      matchesCount,
      remainingCount,
      seededPreLikes: this.profiles.filter((p) => p.hasLikedUser).length
    };
  }
}

export const store = new DataStore();
