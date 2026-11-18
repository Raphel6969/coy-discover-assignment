import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ReviewerBar from './components/ReviewerBar';
import CircleFilter from './components/CircleFilter';
import SwipeCard from './components/SwipeCard';
import SwipeButtons from './components/SwipeButtons';
import MatchModal from './components/MatchModal';
import MatchesView from './components/MatchesView';
import EmptyState from './components/EmptyState';
import HomeTab from './components/HomeTab';
import SlotUpsellModal from './components/SlotUpsellModal';
import { useCoyFeed } from './hooks/useCoyFeed';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [isSlotStoreOpen, setIsSlotStoreOpen] = useState(false);

  const {
    feed,
    currentProfile,
    nextProfile,
    matches,
    stats,
    activeCircle,
    activeMatchModal,
    setActiveMatchModal,
    isLoading,
    isSwiping,
    canUndo,
    handleSelectCircle,
    handleSwipe,
    handleUndo,
    handleReset,
  } = useCoyFeed();

  // Desktop keyboard navigation (Left = Pass, Right = Like)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if a modal is open or not in Discover tab
      if (activeTab !== 'discover' || activeMatchModal || isSlotStoreOpen) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('pass');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('like');
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, activeMatchModal, isSlotStoreOpen, handleSwipe, handleUndo]);

  return (
    <div className="min-h-screen bg-coy-canvas flex flex-col justify-between selection:bg-coy-pink selection:text-white">
      {/* Reviewer Mode Banner for Demo / Interview Evaluation */}
      <ReviewerBar
        stats={stats}
        onReset={handleReset}
        isResetting={isLoading}
      />

      {/* Main App Container (Mobile-First Shell) */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col relative bg-coy-canvas sm:border-x-2 sm:border-coy-ink min-h-[92vh]">
        {/* Top Header */}
        <Navbar onOpenSlotUpsell={() => setIsSlotStoreOpen(true)} />

        {/* Content Area */}
        <main className="flex-1 flex flex-col relative px-4 pt-2 pb-24 overflow-hidden">
          {/* TAB 1: HOME TAB (Blank placeholder per assignment spec) */}
          {activeTab === 'home' && (
            <HomeTab
              onSwitchToDiscover={() => setActiveTab('discover')}
              onOpenUpsell={() => setIsSlotStoreOpen(true)}
            />
          )}

          {/* TAB 2: DISCOVER TAB (Core Feature Buildout) */}
          {activeTab === 'discover' && (
            <div className="flex-1 flex flex-col justify-between">
              {/* Circle Categorization Filter (Part A Feature Synergy) */}
              <CircleFilter
                activeCircle={activeCircle}
                onSelectCircle={handleSelectCircle}
              />

              {/* Feed Content */}
              {isLoading && feed.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-coy-ink border-t-coy-pink animate-spin mb-3"></div>
                  <span className="font-heading font-bold text-sm text-coy-ink">
                    Loading Coy Discover Deck...
                  </span>
                </div>
              ) : feed.length === 0 ? (
                <div className="flex-1 flex items-center justify-center my-auto">
                  <EmptyState
                    onReset={handleReset}
                    onGoToMatches={() => setActiveTab('matches')}
                    matchCount={matches.length}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between mt-2">
                  {/* Card Stack Deck */}
                  <div className="relative w-full aspect-[3/4] max-h-[460px] mx-auto">
                    {/* Background Card for Stack Depth Effect */}
                    {nextProfile && (
                      <SwipeCard
                        key={nextProfile.id}
                        profile={nextProfile}
                        isFront={false}
                      />
                    )}

                    {/* Active Front Card with Gesture Physics */}
                    {currentProfile && (
                      <SwipeCard
                        key={currentProfile.id}
                        profile={currentProfile}
                        onSwipe={handleSwipe}
                        isFront={true}
                      />
                    )}
                  </div>

                  {/* Desktop / Touch Action Buttons */}
                  <SwipeButtons
                    onPass={() => handleSwipe('pass')}
                    onLike={() => handleSwipe('like')}
                    onUndo={handleUndo}
                    canUndo={canUndo}
                    disabled={isSwiping || feed.length === 0}
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MATCHES TAB */}
          {activeTab === 'matches' && (
            <MatchesView
              matches={matches}
              onGoToDiscover={() => setActiveTab('discover')}
            />
          )}
        </main>

        {/* Persistent Bottom Tab Bar */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          matchCount={matches.length}
        />
      </div>

      {/* "It's a Match!" Celebration Overlay Modal */}
      {activeMatchModal && (
        <MatchModal
          match={activeMatchModal}
          onClose={() => setActiveMatchModal(null)}
          onGoToMatches={() => {
            setActiveMatchModal(null);
            setActiveTab('matches');
          }}
        />
      )}

      {/* Coy Slot Economy Modal */}
      <SlotUpsellModal
        isOpen={isSlotStoreOpen}
        onClose={() => setIsSlotStoreOpen(false)}
      />
    </div>
  );
}
