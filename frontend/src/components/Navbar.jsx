import React from 'react';
import { Lock, Plus, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenSlotUpsell }) {
  return (
    <header className="w-full bg-coy-canvas border-b-2 border-coy-ink px-4 py-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Wordmark Logo */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="font-heading font-extrabold text-2xl tracking-tight text-coy-ink flex items-baseline">
            coy<span className="text-coy-pink text-3xl leading-none">.</span>
          </span>
          <span className="neo-badge bg-coy-pink-tint text-coy-pink text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider">
            Discover
          </span>
        </div>

        {/* Slot counter & upsell (Matching Coy's exact slot economy) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border-2 border-coy-ink rounded-full px-2.5 py-1 text-xs font-mono font-bold shadow-hard-sm">
            <Lock className="w-3 h-3 text-coy-pink" />
            <span className="text-coy-ink">3/3</span>
            <span className="text-zinc-400 font-normal text-[10px]">Slots</span>
          </div>

          <button
            onClick={onOpenSlotUpsell}
            className="flex items-center gap-1 bg-coy-pink hover:bg-coy-pink-hover text-white text-xs font-heading font-bold px-2.5 py-1 rounded-full border-2 border-coy-ink shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px] transition-all"
            title="Unlock more crush slots"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            <span>Slots</span>
          </button>
        </div>
      </div>
    </header>
  );
}
