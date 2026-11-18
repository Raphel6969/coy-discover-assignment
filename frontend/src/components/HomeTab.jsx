import React, { useState } from 'react';
import { Lock, Heart, Shield, Plus, Sparkles, ArrowRight, X, User, Mail, Phone } from 'lucide-react';

export default function HomeTab({ onSwitchToDiscover, onOpenUpsell }) {
  const [activeSlotForm, setActiveSlotForm] = useState(null); // number of slot being edited (1, 2, or 3)

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
              {[1, 2, 3].map((slotNum) => {
                const isEditing = activeSlotForm === slotNum;

                if (isEditing) {
                  return (
                    <div
                      key={slotNum}
                      className="p-4 rounded-xl border-2 border-coy-ink bg-white shadow-hard-sm space-y-3 animate-in fade-in duration-150"
                    >
                      <div className="flex items-center justify-between pb-2 border-b-2 border-zinc-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-coy-pink text-white px-2 py-0.5 rounded">
                            0{slotNum}
                          </span>
                          <span className="font-heading font-extrabold text-xs sm:text-sm text-coy-ink">
                            Add Secret Crush
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveSlotForm(null)}
                          className="text-zinc-400 hover:text-coy-ink p-1 rounded-full border border-coy-ink bg-zinc-50 shadow-hard-sm"
                          aria-label="Cancel adding crush"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Name Field */}
                      <div>
                        <label className="block text-[11px] font-heading font-bold text-coy-ink mb-1 flex items-center gap-1.5">
                          <User className="w-3 h-3 text-coy-pink" />
                          <span>Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Maya Sharma"
                          className="w-full px-3 py-2 border-2 border-coy-ink rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-coy-pink bg-white"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-[11px] font-heading font-bold text-coy-ink mb-1 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-coy-pink" />
                          <span>Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. maya@college.edu"
                          className="w-full px-3 py-2 border-2 border-coy-ink rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-coy-pink bg-white"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label className="block text-[11px] font-heading font-bold text-coy-ink mb-1 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-coy-pink" />
                          <span>Phone Number</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3 py-2 border-2 border-coy-ink rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-coy-pink bg-white"
                        />
                      </div>

                      <div className="pt-1 flex gap-2">
                        <button
                          type="button"
                          className="flex-1 neo-btn-primary py-2 rounded-lg text-xs font-heading font-bold shadow-hard-sm opacity-90 cursor-default"
                        >
                          Save Crush to Slot 0{slotNum}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSlotForm(null)}
                          className="neo-btn bg-white hover:bg-zinc-50 text-zinc-600 px-3 py-2 rounded-lg text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={slotNum}
                    className="p-3 sm:p-3.5 rounded-xl border-2 border-dashed border-coy-ink/40 bg-white flex items-center justify-between"
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
                      onClick={() => setActiveSlotForm(slotNum)}
                      className="neo-btn bg-white hover:bg-coy-pink hover:text-white text-coy-ink px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      title={`Add a secret crush in Slot 0${slotNum}`}
                    >
                      + Add
                    </button>
                  </div>
                );
              })}
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
        </div>
      </div>
    </div>
  );
}
