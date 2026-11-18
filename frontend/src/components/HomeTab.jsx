import React from 'react';
import { Lock, Heart, Shield, Plus, Sparkles, ArrowRight } from 'lucide-react';

export default function HomeTab({ onSwitchToDiscover, onOpenUpsell }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 select-none animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Hero Callout */}
        <div className="neo-card p-5 sm:p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="neo-badge bg-coy-pink text-white font-bold text-[10px]">
                HOME TAB • COY CORE
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-500">
                3/3 Slots Active
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-coy-ink leading-tight">
              Double-Blind Crush Matching
            </h2>
            <p className="text-xs sm:text-sm text-coy-muted-dark mt-2 font-medium leading-relaxed">
              Add someone in your circle by phone, email, or Instagram. If they secretly add you too, you match. Otherwise, nobody ever knows.
            </p>

            {/* 3 Crush Slots UI (1:1 Coy App Mirror) */}
            <div className="mt-5 space-y-3">
              {[1, 2, 3].map((slotNum) => (
                <div
                  key={slotNum}
                  className="p-3 sm:p-3.5 rounded-xl border-2 border-dashed border-coy-ink/40 bg-coy-canvas flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border-2 border-coy-ink flex items-center justify-center font-mono font-bold text-xs shadow-hard-sm">
                      0{slotNum}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-coy-ink">
                        Empty Crush Slot
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        Locked for 30 days once set
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenUpsell}
                    className="neo-btn bg-white hover:bg-zinc-50 text-coy-ink px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <span>Free allowance: 3 slots</span>
            <button
              onClick={onOpenUpsell}
              className="font-heading font-bold text-coy-pink hover:underline"
            >
              Need more slots? →
            </button>
          </div>
        </div>

        {/* Right Column: Discover Feature Callout Banner & Privacy Architecture */}
        <div className="flex flex-col gap-5">
          <div className="neo-card p-5 sm:p-6 bg-coy-pink text-white border-3 border-coy-ink shadow-hard-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 fill-current" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider">
                  NEW EXPERIMENTAL FEATURE
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl leading-snug">
                Explore the "Discover" Tab
              </h3>
              <p className="text-xs sm:text-sm text-white/95 mt-2 leading-relaxed">
                As required in the assignment, this Home tab is kept clean. Head over to the <span className="font-bold underline">Discover Tab</span> to experience swipe-based secret matching with 30 seeded profiles, dynamic physics, and instant mutual match reveal!
              </p>
            </div>

            <button
              onClick={onSwitchToDiscover}
              className="mt-6 w-full neo-btn bg-white hover:bg-zinc-100 text-coy-ink py-3 px-5 rounded-xl font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-hard active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>Launch Discover Deck</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Privacy Edge Cases Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-coy-ink shadow-hard-sm text-xs text-zinc-600">
            <div className="flex items-center gap-1.5 font-heading font-bold text-coy-ink text-sm mb-1.5">
              <Shield className="w-4 h-4 text-[#00c853]" />
              <span>Privacy & DPDP Act 2023 Guarantees</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-500">
              <li>Never reveal who has liked you unless it is mutual</li>
              <li>Encrypted salted SHA-256 hash storage for all identifiers</li>
              <li>Universal opt-out killswitch enabled at <span className="font-mono">getcoy.com/stop</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
