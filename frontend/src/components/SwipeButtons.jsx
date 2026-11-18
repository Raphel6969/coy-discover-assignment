import React from 'react';
import { RotateCcw, X, Heart, Info } from 'lucide-react';

export default function SwipeButtons({
  onPass,
  onLike,
  onUndo,
  onToggleBio,
  canUndo = false,
  disabled = false,
}) {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-3 flex items-center justify-center gap-4 select-none">
      {/* Undo Button (Quality of Life) */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        className={`w-11 h-11 rounded-full neo-btn flex items-center justify-center text-amber-600 transition-all ${
          canUndo && !disabled
            ? 'bg-amber-50 hover:bg-amber-100 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
            : 'opacity-40 cursor-not-allowed bg-zinc-100'
        }`}
        title="Undo previous swipe"
      >
        <RotateCcw className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Pass Button (✕) */}
      <button
        onClick={onPass}
        disabled={disabled}
        className="w-14 h-14 rounded-full neo-btn bg-white hover:bg-zinc-50 active:bg-zinc-100 flex items-center justify-center text-zinc-800 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
        title="Pass (Swipe Left / ← Arrow)"
      >
        <X className="w-7 h-7 stroke-[2.5] text-coy-ink" />
      </button>

      {/* Like Button (♥) */}
      <button
        onClick={onLike}
        disabled={disabled}
        className="w-16 h-16 rounded-full neo-btn-primary flex items-center justify-center text-white transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] shadow-hard-md"
        title="Like (Swipe Right / → Arrow)"
      >
        <Heart className="w-8 h-8 fill-current stroke-[1.5]" />
      </button>

      {/* Info / Bio Button */}
      <button
        onClick={onToggleBio}
        disabled={disabled}
        className="w-11 h-11 rounded-full neo-btn bg-white hover:bg-zinc-50 active:bg-zinc-100 flex items-center justify-center text-zinc-700 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
        title="View full profile details"
      >
        <Info className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
