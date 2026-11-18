import express from 'express';
import { store } from '../store.js';

const router = express.Router();

/**
 * GET /feed
 * Returns unswiped profiles. Supports optional ?circle= query parameter.
 * Strictly strips any knowledge of whether a profile has liked the user.
 */
router.get('/feed', (req, res) => {
  try {
    const { circle } = req.query;
    const feed = store.getFeed(circle);
    res.json({
      success: true,
      count: feed.length,
      feed
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /swipe
 * Records a swipe ('like' or 'pass') and evaluates if a mutual match occurs.
 * Body: { profileId: string, action: 'like' | 'pass' }
 */
router.post('/swipe', (req, res) => {
  try {
    const { profileId, action } = req.body;
    if (!profileId || !action) {
      return res.status(400).json({
        success: false,
        error: 'Missing profileId or action in request body'
      });
    }

    const result = store.swipe(profileId, action);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * GET /matches
 * Returns list of mutual matches.
 */
router.get('/matches', (req, res) => {
  try {
    const matches = store.getMatches();
    res.json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /undo
 * Reverts the most recent swipe action.
 */
router.post('/undo', (req, res) => {
  try {
    const result = store.undo();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /reset
 * Clears all swipes and matches, allowing the interviewer to restart the demo.
 */
router.post('/reset', (req, res) => {
  try {
    const result = store.resetState();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /stats
 * Dev stats for reviewer bar.
 */
router.get('/stats', (req, res) => {
  try {
    const stats = store.getStats();
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
