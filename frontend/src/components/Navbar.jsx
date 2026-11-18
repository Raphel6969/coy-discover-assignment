import React from 'react';
import { Lock, Plus, Compass, Heart, Home } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  matchCount = 0,
  onOpenSlotUpsell,
}) {
  return (
    <header className="w-full bg-coy-canvas border-b-2 border-coy-ink px-4 sm:px-6 lg:px-8 py-3 select-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Wordmark Logo */}
        <div
          onClick={() => setActiveTab && setActiveTab('discover')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-coy-ink flex items-baseline">
            coy<span className="text-coy-pink text-3xl sm:text-4xl leading-none">.</span>
          </span>
          <span className="neo-badge bg-coy-pink-tint text-coy-pink text-[10px] sm:text-xs py-0.5 px-2 sm:px-2.5 font-bold uppercase tracking-wider">
            Discover
          </span>
        </div>

        {/* Desktop / Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-white border-2 border-coy-ink rounded-full p-1 shadow-hard-sm">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-bold transition-all ${
              activeTab === 'home'
                ? 'bg-coy-ink text-white shadow-hard-sm'
                : 'text-zinc-600 hover:text-coy-ink'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-bold transition-all ${
              activeTab === 'discover'
                ? 'bg-coy-pink text-white shadow-hard-sm'
                : 'text-zinc-600 hover:text-coy-ink'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Deck</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-bold transition-all relative ${
              activeTab === 'matches'
                ? 'bg-[#00e676] text-coy-ink border border-coy-ink shadow-hard-sm'
                : 'text-zinc-600 hover:text-coy-ink'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Matches</span>
            {matchCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-coy-ink text-white text-[10px] font-mono rounded-full">
                {matchCount}
              </span>
            )}
          </button>
        </nav>

        {/* Slot counter & upsell (Matching Coy's exact slot economy) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 bg-white border-2 border-coy-ink rounded-full px-2.5 sm:px-3 py-1 text-xs font-mono font-bold shadow-hard-sm">
            <Lock className="w-3 h-3 text-coy-pink" />
            <span className="text-coy-ink">3/3</span>
            <span className="text-zinc-400 font-normal text-[10px] hidden sm:inline">Slots</span>
          </div>

          <button
            onClick={onOpenSlotUpsell}
            className="flex items-center gap-1 bg-coy-pink hover:bg-coy-pink-hover text-white text-xs font-heading font-bold px-2.5 sm:px-3 py-1 rounded-full border-2 border-coy-ink shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px] transition-all"
            title="Unlock more crush slots"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            <span className="hidden sm:inline">Get</span>
            <span>Slots</span>
          </button>
        </div>
      </div>
    </header>
  );
}
