import React from 'react';
import { Lock, Heart, Shield, Plus, Sparkles, ArrowRight } from 'lucide-react';

export default function HomeTab({ onSwitchToDiscover, onOpenUpsell }) {
  return (
    <div className="max-w-md mx-auto px-4 py-4 pb-24 select-none animate-in fade-in">
      {/* Brand Hero Callout */}
      <div className="neo-card p-5 bg-white mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="neo-badge bg-coy-pink text-white font-bold text-[10px]">
            HOME TAB • COY CORE
          </span>
          <span className="text-[11px] font-mono font-bold text-zinc-500">
            3/3 Slots Active
          </span>
        </div>

        <h2 className="font-heading font-extrabold text-2xl text-coy-ink leading-tight">
          Double-Blind Crush Matching
        </h2>
        <p className="text-xs text-coy-muted-dark mt-1 font-medium leading-relaxed">
          Add someone in your circle by phone, email, or Instagram. If they secretly add you too, you match. Otherwise, nobody ever knows.
        </p>

        {/* 3 Crush Slots UI (1:1 Coy App Mirror) */}
        <div className="mt-4 space-y-2.5">
          {[1, 2, 3].map((slotNum) => (
            <div
              key={slotNum}
              className="p-3 rounded-xl border-2 border-dashed border-coy-ink/40 bg-coy-canvas flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border-2 border-coy-ink flex items-center justify-center font-mono font-bold text-xs shadow-hard-sm">
                  0{slotNum}
                </div>
                <div>
                  <div className="font-heading font-bold text-xs text-coy-ink">
                    Empty Crush Slot
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    Locked for 30 days once set
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenUpsell}
                className="neo-btn bg-white hover:bg-zinc-50 text-coy-ink px-2.5 py-1 rounded-lg text-xs font-bold"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Feature Callout Banner */}
      <div className="neo-card p-5 bg-coy-pink text-white border-3 border-coy-ink shadow-hard-md">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="font-mono font-bold text-xs uppercase tracking-wider">
            NEW EXPERIMENTAL FEATURE
          </span>
        </div>

        <h3 className="font-heading font-extrabold text-xl leading-snug">
          Explore the "Discover" Tab
        </h3>
        <p className="text-xs text-white/90 mt-1 leading-relaxed">
          As requested in the assignment, this Home tab is kept clean. Head over to the <span className="font-bold underline">Discover Tab</span> to experience swipe-based secret matching with 30 seeded profiles!
        </p>

        <button
          onClick={onSwitchToDiscover}
          className="mt-4 w-full neo-btn bg-white hover:bg-zinc-100 text-coy-ink py-2.5 px-4 rounded-xl font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-hard active:translate-x-[2px] active:translate-y-[2px]"
        >
          <span>Open Discover Tab</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Privacy Edge Cases Box */}
      <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-coy-ink shadow-hard-sm text-xs text-zinc-600">
        <div className="flex items-center gap-1.5 font-heading font-bold text-coy-ink text-sm mb-1">
          <Shield className="w-4 h-4 text-coy-green" />
          <span>Privacy & DPDP Act Guarantees</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-500 mt-1.5">
          <li>Never reveal who has liked you unless it is mutual</li>
          <li>Encrypted salted hash storage for all identifiers</li>
          <li>Instant opt-out killswitch enabled</li>
        </ul>
      </div>
    </div>
  );
}
