import React from 'react';
import { RotateCcw, X, Info } from 'lucide-react';

export default function SwipeButtons({
  onPass,
  onLike,
  onUndo,
  onToggleBio,
  canUndo = false,
  disabled = false,
}) {
  return (
    <div className="w-full max-w-lg mx-auto px-6 py-3 flex items-center justify-center gap-4 sm:gap-6 select-none">
      {/* Undo Button (Quality of Life) */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full neo-btn flex items-center justify-center text-amber-600 transition-all ${
          canUndo && !disabled
            ? 'bg-amber-50 hover:bg-amber-100 cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
            : 'opacity-40 cursor-not-allowed bg-zinc-100'
        }`}
        title="Undo previous swipe (Ctrl+Z)"
        aria-label="Undo previous swipe"
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
      </button>

      {/* Pass Button (✕) with Bolder Cross & Deeper Red */}
      <button
        onClick={onPass}
        disabled={disabled}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full neo-btn bg-white hover:bg-[#ffe5ea] text-[#c8102e] active:bg-[#fecdd3] flex items-center justify-center transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e]"
        title="Pass (Swipe Left / ← Arrow)"
        aria-label="Pass profile"
      >
        <X className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5]" />
      </button>

      {/* Like Button with Plain & Vibrant Green Heart */}
      <button
        onClick={onLike}
        disabled={disabled}
        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full neo-btn bg-white hover:bg-[#e8fdf2] text-[#00e676] active:bg-[#bbf7d0] flex items-center justify-center transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] shadow-hard-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e676]"
        title="Like (Swipe Right / → Arrow)"
        aria-label="Like profile"
      >
        {/* Simple Plain Vector Heart in Vibrant Green */}
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 sm:w-10 sm:h-10 fill-[#00e676] stroke-none shrink-0"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      {/* Info / Bio Button */}
      <button
        onClick={onToggleBio}
        disabled={disabled}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full neo-btn bg-white hover:bg-zinc-50 active:bg-zinc-100 flex items-center justify-center text-zinc-700 transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
        title="View full profile details (Spacebar)"
        aria-label="View profile details"
      >
        <Info className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>
    </div>
  );
}
