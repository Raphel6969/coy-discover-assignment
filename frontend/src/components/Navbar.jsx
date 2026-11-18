import React from 'react';
import { Lock, Plus, Compass, Heart, Home, Sparkles } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  matchCount = 0,
  onOpenSlotUpsell,
}) {
  return (
    <header
      role="banner"
      className="w-full bg-white border-b-2 border-coy-ink px-4 sm:px-6 lg:px-8 py-4 sm:py-5 select-none transition-all shadow-sm"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Wordmark Logo - Bigger, Accessible, High Impact */}
        <button
          onClick={() => setActiveTab && setActiveTab('discover')}
          className="flex items-center gap-2.5 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-pink focus-visible:ring-offset-2 rounded-xl p-1 -m-1 transition-transform active:scale-95"
          aria-label="Coy Home - Navigate to Discover Deck"
        >
          <span className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-coy-ink flex items-baseline leading-none">
            coy<span className="text-coy-pink text-4xl sm:text-5xl leading-none">.</span>
          </span>
          <span className="neo-badge bg-coy-pink-tint text-coy-pink text-xs sm:text-sm py-1 px-2.5 sm:px-3 font-bold uppercase tracking-wider shadow-hard-sm">
            Discover
          </span>
        </button>

        {/* Desktop & Tablet Navigation Links (Larger, High Contrast, Accessible) */}
        <nav
          role="navigation"
          aria-label="Desktop Primary Navigation"
          className="hidden md:flex items-center gap-2 bg-coy-subtle border-2 border-coy-ink rounded-full p-1.5 shadow-hard-sm"
        >
          <button
            onClick={() => setActiveTab('home')}
            aria-current={activeTab === 'home' ? 'page' : undefined}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-bold transition-all min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-pink ${
              activeTab === 'home'
                ? 'bg-coy-ink text-white shadow-hard-sm'
                : 'text-zinc-700 hover:text-coy-ink hover:bg-white'
            }`}
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            aria-current={activeTab === 'discover' ? 'page' : undefined}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-heading font-bold transition-all min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-pink ${
              activeTab === 'discover'
                ? 'bg-coy-pink text-white shadow-hard-sm'
                : 'text-zinc-700 hover:text-coy-ink hover:bg-white'
            }`}
          >
            <Compass className="w-4 h-4 stroke-[2.5]" />
            <span>Discover Deck</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            aria-current={activeTab === 'matches' ? 'page' : undefined}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-bold transition-all min-h-[40px] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-pink ${
              activeTab === 'matches'
                ? 'bg-[#00e676] text-coy-ink border border-coy-ink shadow-hard-sm'
                : 'text-zinc-700 hover:text-coy-ink hover:bg-white'
            }`}
          >
            {/* Simpleton Plain Classic Heart */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current stroke-none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Matches</span>
            {matchCount > 0 && (
              <span
                aria-label={`${matchCount} mutual matches`}
                className="ml-1.5 px-2 py-0.5 bg-coy-ink text-white text-xs font-mono font-bold rounded-full border border-coy-ink"
              >
                {matchCount}
              </span>
            )}
          </button>
        </nav>

        {/* Slot Counter & CTA Buttons (Bigger, Accessible, High Affordance) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Active Slots Badge */}
          <div
            className="flex items-center gap-2 bg-white border-2 border-coy-ink rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono font-bold shadow-hard-sm"
            aria-label="3 of 3 crush slots available"
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coy-pink stroke-[2.5]" />
            <span className="text-coy-ink font-extrabold">3/3</span>
            <span className="text-zinc-500 font-semibold text-xs hidden sm:inline">Slots</span>
          </div>

          {/* Unlock Slots Button */}
          <button
            onClick={onOpenSlotUpsell}
            className="flex items-center gap-1.5 sm:gap-2 bg-coy-pink hover:bg-coy-pink-hover text-white text-xs sm:text-sm font-heading font-extrabold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-coy-ink shadow-hard active:translate-x-[2px] active:translate-y-[2px] transition-all min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-ink focus-visible:ring-offset-2"
            title="Unlock more secret crush slots"
            aria-label="Unlock more crush slots"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Get</span>
            <span>Slots</span>
          </button>
        </div>
      </div>
    </header>
  );
}
