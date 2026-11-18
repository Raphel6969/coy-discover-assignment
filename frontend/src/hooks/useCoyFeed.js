import { useState, useEffect, useCallback } from 'react';

export function useCoyFeed() {
  const [feed, setFeed] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({});
  const [activeCircle, setActiveCircle] = useState('All');
  const [activeMatchModal, setActiveMatchModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [error, setError] = useState(null);

  // Fetch feed with circle filter
  const fetchFeed = useCallback(async (circle = activeCircle) => {
    try {
      setIsLoading(true);
      const url = circle && circle !== 'All' ? `/api/feed?circle=${encodeURIComponent(circle)}` : '/api/feed';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setFeed(data.feed || []);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [activeCircle]);

  // Fetch mutual matches
  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
      }
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  }, []);

  // Fetch stats for reviewer bar
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

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

    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: currentCard.id, action })
      });
      const data = await res.json();

      if (data.isMatch && data.matchProfile) {
        setActiveMatchModal(data.matchProfile);
        fetchMatches();
      }

      fetchStats();
    } catch (err) {
      console.error('Swipe error:', err);
      // Revert if API fails
      fetchFeed();
    } finally {
      setIsSwiping(false);
    }
  };

  // Undo last swipe
  const handleUndo = async () => {
    try {
      const res = await fetch('/api/undo', { method: 'POST' });
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
      }
    } catch (err) {
      console.error('Undo error:', err);
    }
  };

  // Reset feed & matches
  const handleReset = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/reset', { method: 'POST' });
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
    error,
    handleSelectCircle,
    handleSwipe,
    handleUndo,
    handleReset,
    refreshMatches: fetchMatches
  };
}
