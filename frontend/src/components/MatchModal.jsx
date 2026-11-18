import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, Share2, Sparkles, X, Check } from 'lucide-react';

export default function MatchModal({ match, onClose, onGoToMatches }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger confetti fireworks burst
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 1000,
        colors: ['#ff2d78', '#22c55e', '#18181b', '#faf8f5', '#f59e0b'],
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch (e) {
      console.log('Confetti not available:', e);
    }
  }, []);

  if (!match) return null;

  const defaultIcebreaker = `Hey ${match.name}! Looks like we both swiped right on Coy 🎉 Small world!`;

  const handleCopyIcebreaker = () => {
    navigator.clipboard.writeText(defaultIcebreaker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(defaultIcebreaker)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-coy-canvas rounded-3xl neo-card p-6 border-3 border-coy-ink text-center shadow-hard-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-coy-ink p-1 rounded-full border-2 border-coy-ink bg-white shadow-hard-sm"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coy-pink text-white font-mono font-bold text-xs border-2 border-coy-ink shadow-hard-sm mb-3 transform -rotate-1">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>MUTUAL MATCH!</span>
        </div>

        {/* Headline */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-coy-ink tracking-tight">
          It's a Match<span className="text-coy-pink">!</span>
        </h2>
        <p className="text-xs text-coy-muted-dark mt-1 font-medium">
          You and <span className="text-coy-ink font-bold">{match.name}</span> secretly liked each other on Coy.
        </p>

        {/* Colliding Profile Avatars */}
        <div className="relative flex items-center justify-center my-6">
          {/* User's Mock Avatar */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-coy-ink shadow-hard transform -rotate-6 z-10 bg-zinc-200">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Central Pulsing Heart Badge with Simple Plain Heart */}
          <div className="absolute z-20 w-11 h-11 rounded-full bg-coy-pink text-white border-2 border-coy-ink flex items-center justify-center shadow-hard animate-bounce">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current stroke-none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Matched Profile's Avatar */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-coy-ink shadow-hard transform rotate-6 z-10 bg-zinc-200">
            <img
              src={match.photo}
              alt={match.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Match Details Pill */}
        <div className="bg-white p-3.5 rounded-xl border-2 border-coy-ink shadow-hard-sm mb-5 text-left">
          <div className="font-heading font-bold text-sm text-coy-ink flex items-center justify-between">
            <span>{match.name}, {match.age}</span>
            <span className="neo-badge bg-[#00e676]/20 text-[#00c853] border-coy-ink text-[10px] py-0.5 px-2 font-bold">
              ✓ Mutual Match
            </span>
          </div>
          <div className="text-xs text-zinc-500 font-medium truncate mt-0.5">
            {match.college} • {match.city}
          </div>
          <div className="mt-2 text-xs text-coy-ink italic font-sans bg-coy-canvas p-2 rounded-lg border border-zinc-200">
            "{match.shortBio}"
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* WhatsApp / Icebreaker Trigger */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full neo-btn bg-coy-whatsapp hover:brightness-105 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-hard"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Say Hi on WhatsApp</span>
          </button>

          {/* Copy Icebreaker */}
          <button
            onClick={handleCopyIcebreaker}
            className="w-full neo-btn bg-white hover:bg-zinc-50 text-coy-ink py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-coy-green" />
                <span className="text-coy-green font-bold">Icebreaker Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Icebreaker Message</span>
              </>
            )}
          </button>

          {/* Keep Swiping */}
          <button
            onClick={onClose}
            className="w-full text-xs text-zinc-600 hover:text-coy-ink font-heading font-bold py-1.5 transition-colors"
          >
            Keep Exploring Profiles →
          </button>
        </div>
      </div>
    </div>
  );
}
