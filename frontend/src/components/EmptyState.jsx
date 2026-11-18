import React from 'react';
import { Compass, RotateCcw, Heart, Sparkles } from 'lucide-react';

export default function EmptyState({ onReset, onGoToMatches, matchCount = 0 }) {
  return (
    <div className="w-full max-w-sm mx-auto p-6 text-center select-none animate-in fade-in">
      <div className="neo-card p-6 bg-white flex flex-col items-center">
        {/* Playful Illustration Badge */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-3xl bg-coy-pink-tint border-3 border-coy-ink flex items-center justify-center text-coy-pink shadow-hard transform rotate-3">
            <Compass className="w-10 h-10 stroke-[2] animate-spin-slow" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-coy-green text-white p-1 rounded-full border-2 border-coy-ink shadow-hard-sm">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-coy-ink">
          You're All Caught Up!
        </h3>

        <p className="text-xs text-coy-muted-dark mt-2 leading-relaxed">
          You've reviewed every profile in this circle. Profiles you've swiped on will never be shown again, per Coy's privacy rules.
        </p>

        {/* Mutual Match Count Callout */}
        {matchCount > 0 && (
          <div className="my-4 w-full p-3 bg-coy-pink-tint rounded-xl border-2 border-coy-ink shadow-hard-sm">
            <span className="font-mono text-xs font-bold text-coy-pink block">
              🎉 YOU HAVE {matchCount} MUTUAL {matchCount === 1 ? 'MATCH' : 'MATCHES'}!
            </span>
            <button
              onClick={onGoToMatches}
              className="mt-2 text-xs font-heading font-bold text-coy-ink hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <Heart className="w-3.5 h-3.5 text-coy-pink fill-current" />
              <span>View Matches Tab</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-2 mt-4">
          <button
            onClick={onReset}
            className="w-full neo-btn bg-white hover:bg-zinc-50 text-coy-ink py-2.5 rounded-xl text-xs font-heading font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Deck</span>
          </button>

          {matchCount > 0 ? (
            <button
              onClick={onGoToMatches}
              className="w-full neo-btn-primary py-2.5 rounded-xl text-xs font-heading font-bold flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Check Mutual Matches ({matchCount})</span>
            </button>
          ) : (
            <div className="text-[11px] text-zinc-400 font-mono pt-1">
              Check back later for new people in your circle.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
