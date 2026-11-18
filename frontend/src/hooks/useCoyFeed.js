import { useState, useEffect, useCallback } from 'react';
import fallbackProfiles from '../data/profiles.json';

// Local storage keys for standalone static deployments (e.g. Netlify)
const LS_SWIPES_KEY = 'coy_swipes_v1';
const LS_MATCHES_KEY = 'coy_matches_v1';
const LS_HISTORY_KEY = 'coy_history_v1';

export function useCoyFeed() {
  const [feed, setFeed] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({});
  const [activeCircle, setActiveCircle] = useState('All');
  const [activeMatchModal, setActiveMatchModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [isClientFallback, setIsClientFallback] = useState(false);

  // Helper: get local storage state for static deployment
  const getLocalState = useCallback(() => {
    try {
      const swipes = JSON.parse(localStorage.getItem(LS_SWIPES_KEY) || '{}');
      const matches = JSON.parse(localStorage.getItem(LS_MATCHES_KEY) || '[]');
      const history = JSON.parse(localStorage.getItem(LS_HISTORY_KEY) || '[]');
      return { swipes, matches, history };
    } catch {
      return { swipes: {}, matches: [], history: [] };
    }
  }, []);

  // Fetch feed with circle filter
  const fetchFeed = useCallback(async (circle = activeCircle) => {
    try {
      setIsLoading(true);
      const url = circle && circle !== 'All' ? `/api/feed?circle=${encodeURIComponent(circle)}` : '/api/feed';
      const res = await fetch(url);
      if (!res.ok) throw new Error('API server unreachable');
      const data = await res.json();
      if (data.success) {
        setFeed(data.feed || []);
        setIsClientFallback(false);
      }
    } catch (err) {
      // Fallback for static Netlify hosting: filter client-side without exposing pre-likes
      setIsClientFallback(true);
      const { swipes } = getLocalState();
      const clientFeed = fallbackProfiles
        .filter((p) => !swipes[p.id])
        .filter((p) => (!circle || circle === 'All' ? true : p.circle === circle))
        .map(({ hasLikedUser, ...safeProfile }) => safeProfile);
      setFeed(clientFeed);
    } finally {
      setIsLoading(false);
    }
  }, [activeCircle, getLocalState]);

  // Fetch mutual matches
  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/matches');
      if (!res.ok) throw new Error('API server unreachable');
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
      }
    } catch (err) {
      const { matches } = getLocalState();
      setMatches(matches);
    }
  }, [getLocalState]);

  // Fetch stats for reviewer bar
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('API server unreachable');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
      }
    } catch (err) {
      const { swipes, matches } = getLocalState();
      const swipedCount = Object.keys(swipes).length;
      setStats({
        totalProfiles: fallbackProfiles.length,
        swipedCount,
        matchesCount: matches.length,
        remainingCount: fallbackProfiles.length - swipedCount,
        seededPreLikes: fallbackProfiles.filter((p) => p.hasLikedUser).length,
      });
    }
  }, [getLocalState]);

  // Initial load
  useEffect(() => {
    fetchFeed();
    fetchMatches();
    fetchStats();
  }, [fetchFeed, fetchMatches, fetchStats]);

  // Handle Circle change
  const handleSelectCircle = (circle) => {
    setActiveCircle(circle);
    fetchFeed(circle);
  };

  // Perform a swipe
  const handleSwipe = async (action) => {
    if (feed.length === 0 || isSwiping) return;

    const currentCard = feed[0];
    setIsSwiping(true);

    // Optimistically pop card from local feed
    setFeed((prev) => prev.slice(1));
    setCanUndo(true);

    if (!isClientFallback) {
      try {
        const res = await fetch('/api/swipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: currentCard.id, action })
        });
        if (!res.ok) throw new Error('API server unreachable');
        const data = await res.json();

        if (data.isMatch && data.matchProfile) {
          setActiveMatchModal(data.matchProfile);
          fetchMatches();
        }
        fetchStats();
      } catch (err) {
        handleClientSwipe(currentCard, action);
      } finally {
        setIsSwiping(false);
      }
    } else {
      handleClientSwipe(currentCard, action);
      setIsSwiping(false);
    }
  };

  // Client-side swipe handler for static Netlify hosting
  const handleClientSwipe = (currentCard, action) => {
    const { swipes, matches, history } = getLocalState();
    swipes[currentCard.id] = action;
    history.push({ profileId: currentCard.id, action, timestamp: new Date().toISOString() });

    const rawProfile = fallbackProfiles.find((p) => p.id === currentCard.id);
    let matchedProfile = null;

    if (action === 'like' && rawProfile?.hasLikedUser) {
      const { hasLikedUser, ...safeProfile } = rawProfile;
      matchedProfile = { ...safeProfile, matchedAt: new Date().toISOString() };
      matches.unshift(matchedProfile);
      setActiveMatchModal(matchedProfile);
      setMatches([...matches]);
    }

    localStorage.setItem(LS_SWIPES_KEY, JSON.stringify(swipes));
    localStorage.setItem(LS_MATCHES_KEY, JSON.stringify(matches));
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history));

    setCanUndo(history.length > 0);
    fetchStats();
  };

  // Undo last swipe
  const handleUndo = async () => {
    if (!isClientFallback) {
      try {
        const res = await fetch('/api/undo', { method: 'POST' });
        if (!res.ok) throw new Error('API server unreachable');
        const data = await res.json();
        if (data.success) {
          if (data.restoredProfile) {
            setFeed((prev) => [data.restoredProfile, ...prev]);
          } else {
            fetchFeed();
          }
          setCanUndo(data.remainingHistoryCount > 0);
          fetchMatches();
          fetchStats();
          return;
        }
      } catch (err) {
        // Fall back to client undo
      }
    }

    // Client-side undo for Netlify
    const { swipes, matches, history } = getLocalState();
    if (history.length === 0) return;

    const last = history.pop();
    delete swipes[last.profileId];
    const filteredMatches = matches.filter((m) => m.id !== last.profileId);

    localStorage.setItem(LS_SWIPES_KEY, JSON.stringify(swipes));
    localStorage.setItem(LS_MATCHES_KEY, JSON.stringify(filteredMatches));
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history));

    const restoredRaw = fallbackProfiles.find((p) => p.id === last.profileId);
    if (restoredRaw) {
      const { hasLikedUser, ...safeProfile } = restoredRaw;
      setFeed((prev) => [safeProfile, ...prev]);
    }

    setMatches(filteredMatches);
    setCanUndo(history.length > 0);
    fetchStats();
  };

  // Reset feed & matches
  const handleReset = async () => {
    try {
      setIsLoading(true);
      if (!isClientFallback) {
        try {
          await fetch('/api/reset', { method: 'POST' });
        } catch {
          // ignore
        }
      }
      localStorage.removeItem(LS_SWIPES_KEY);
      localStorage.removeItem(LS_MATCHES_KEY);
      localStorage.removeItem(LS_HISTORY_KEY);
      setCanUndo(false);
      setActiveMatchModal(null);
      await fetchFeed(activeCircle);
      await fetchMatches();
      await fetchStats();
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    feed,
    currentProfile: feed[0] || null,
    nextProfile: feed[1] || null,
    matches,
    stats,
    activeCircle,
    activeMatchModal,
    setActiveMatchModal,
    isLoading,
    isSwiping,
    canUndo,
    isClientFallback,
    handleSelectCircle,
    handleSwipe,
    handleUndo,
    handleReset,
    refreshMatches: fetchMatches
  };
}
