import React from 'react';
import { X, Sparkles, Zap, Shield, Check } from 'lucide-react';

export default function SlotUpsellModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const packs = [
    { slots: '+1 Slot', price: '₹99', desc: 'Single guess unlock', popular: false },
    { slots: '+3 Slots', price: '₹199', desc: 'Most popular • Never expire', popular: true },
    { slots: '+5 Slots', price: '₹299', desc: 'Best value for campus circles', popular: false },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="relative w-full max-w-sm bg-coy-canvas rounded-3xl neo-card p-6 border-3 border-coy-ink text-center shadow-hard-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-coy-ink p-1 rounded-full border-2 border-coy-ink bg-white shadow-hard-sm"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coy-pink text-white font-mono font-bold text-xs border-2 border-coy-ink shadow-hard-sm mb-3">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>COY SLOTS STORE</span>
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-coy-ink">
          Need More Crush Slots?
        </h3>
        <p className="text-xs text-coy-muted-dark mt-1 font-medium">
          Slots never expire until used. Every guess remains 100% double-blind.
        </p>

        {/* Pricing Cards */}
        <div className="mt-4 space-y-2.5">
          {packs.map((pack, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border-2 border-coy-ink flex items-center justify-between text-left transition-all ${
                pack.popular
                  ? 'bg-coy-pink text-white shadow-hard-md transform -translate-y-0.5'
                  : 'bg-white text-coy-ink shadow-hard-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-base">{pack.slots}</span>
                  {pack.popular && (
                    <span className="bg-white text-coy-pink font-mono font-bold text-[9px] px-2 py-0.5 rounded-full border border-coy-ink">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className={`text-[11px] ${pack.popular ? 'text-white/90' : 'text-zinc-500'}`}>
                  {pack.desc}
                </div>
              </div>

              <div className="text-right">
                <span className="font-heading font-extrabold text-lg block">{pack.price}</span>
                <span className={`text-[9px] font-mono ${pack.popular ? 'text-white/80' : 'text-zinc-400'}`}>
                  One-time
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-coy-green" />
          <span>Assignment Note: Demo store preview (no actual charges)</span>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full neo-btn bg-white hover:bg-zinc-100 text-coy-ink py-2.5 rounded-xl font-heading font-bold text-xs"
        >
          Close Store
        </button>
      </div>
    </div>
  );
}
