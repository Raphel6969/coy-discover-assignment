import React, { useState } from 'react';
import { RotateCcw, Sparkles, ChevronDown, ChevronUp, Keyboard, ShieldCheck } from 'lucide-react';

export default function ReviewerBar({ stats, onReset, isResetting }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-coy-ink text-white text-xs border-b-2 border-coy-ink shadow-sm z-50">
      <div className="max-w-md mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coy-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-coy-pink"></span>
          </span>
          <span className="font-mono font-semibold text-[11px] text-zinc-300">
            REVIEWER MODE <span className="text-zinc-500">•</span>{' '}
            <span className="text-coy-pink font-bold">{stats.seededPreLikes || 8} Pre-Seeded Matches</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            disabled={isResetting}
            title="Reset feed and matches to initial state"
            className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-200 px-2 py-0.5 rounded border border-zinc-700 font-mono transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Feed</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-zinc-400 hover:text-white p-0.5"
            aria-label="Toggle reviewer info"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2.5 max-w-md mx-auto text-zinc-300 space-y-2">
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="bg-zinc-800/80 p-1.5 rounded border border-zinc-700/60">
              <div className="text-zinc-400">Remaining</div>
              <div className="text-white font-bold text-sm">{stats.remainingCount ?? 30}</div>
            </div>
            <div className="bg-zinc-800/80 p-1.5 rounded border border-zinc-700/60">
              <div className="text-zinc-400">Swiped</div>
              <div className="text-white font-bold text-sm">{stats.swipedCount ?? 0}</div>
            </div>
            <div className="bg-zinc-800/80 p-1.5 rounded border border-zinc-700/60">
              <div className="text-coy-pink font-semibold">Mutual Matches</div>
              <div className="text-coy-pink font-bold text-sm">{stats.matchesCount ?? 0}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400 border-t border-zinc-800 pt-1.5">
            <Keyboard className="w-3 h-3 text-coy-pink shrink-0" />
            <span>
              Desktop shortcuts: <kbd className="bg-zinc-800 px-1 py-0.2 rounded border border-zinc-700">←</kbd> Pass,{' '}
              <kbd className="bg-zinc-800 px-1 py-0.2 rounded border border-zinc-700">→</kbd> Like,{' '}
              <kbd className="bg-zinc-800 px-1 py-0.2 rounded border border-zinc-700">Space</kbd> Expand Bio
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
            <ShieldCheck className="w-3 h-3 text-coy-green shrink-0" />
            <span>Double-blind guarantee: Feed payload strictly obscures pre-seeded like status.</span>
          </div>
        </div>
      )}
    </div>
  );
}
