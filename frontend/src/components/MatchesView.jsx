import React, { useState } from 'react';
import { Heart, MessageCircle, Sparkles, MapPin, GraduationCap, Clock, ExternalLink } from 'lucide-react';

export default function MatchesView({ matches = [], onGoToDiscover }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh] max-w-sm mx-auto select-none">
        <div className="w-16 h-16 rounded-3xl bg-coy-pink-tint border-2 border-coy-ink flex items-center justify-center text-coy-pink shadow-hard mb-4 transform -rotate-3">
          <Heart className="w-8 h-8 fill-current stroke-[2]" />
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-coy-ink">
          No Mutual Matches Yet
        </h3>

        <p className="text-xs text-coy-muted-dark mt-2 leading-relaxed">
          Matches on Coy happen only when two people secretly like each other. Start swiping on the Discover feed to find yours!
        </p>

        <button
          onClick={onGoToDiscover}
          className="mt-6 neo-btn-primary px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-hard"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore Discover Feed</span>
        </button>

        <div className="mt-8 p-3 bg-white border-2 border-coy-ink rounded-xl shadow-hard-sm text-left text-[11px] text-zinc-600">
          <span className="font-bold text-coy-ink block mb-0.5">💡 Coy's Privacy Guarantee</span>
          Nobody ever knows you liked them unless the feeling is 100% mutual.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-coy-ink flex items-center gap-2">
            Mutual Matches
            <span className="neo-badge bg-coy-green-tint text-coy-green-dark border-coy-ink text-xs px-2 py-0.5">
              {matches.length}
            </span>
          </h2>
          <p className="text-xs text-coy-muted-dark mt-0.5 font-medium">
            Both of you liked each other on Coy!
          </p>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {matches.map((match) => (
          <div
            key={match.id}
            onClick={() => setSelectedMatch(match)}
            className="neo-card p-3 bg-white hover:bg-coy-pink-tint/30 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              {/* Photo */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-coy-ink shadow-hard-sm shrink-0 bg-zinc-100">
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-coy-green rounded-full border border-coy-ink"></span>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-heading font-bold text-base text-coy-ink truncate">
                    {match.name}
                  </h4>
                  <span className="font-mono text-xs text-zinc-500 font-bold ml-1">{match.age}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-zinc-600 truncate mt-0.5">
                  <GraduationCap className="w-3 h-3 text-coy-pink shrink-0" />
                  <span className="truncate">{match.college}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  <span>
                    {match.matchedAt ? new Date(match.matchedAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
              </div>
            </div>

            {/* Snippet & WhatsApp Quick Action */}
            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-zinc-500 italic truncate max-w-[170px]">
                "{match.shortBio}"
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const text = `Hey ${match.name}! We matched on Coy 🎉`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="neo-btn bg-coy-whatsapp text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-hard-sm shrink-0"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Match Detail Drawer / Dialog */}
      {selectedMatch && (
        <div
          onClick={() => setSelectedMatch(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 select-none animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl neo-card p-5 border-3 border-coy-ink shadow-hard-lg"
          >
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-coy-ink mb-4">
              <img
                src={selectedMatch.photo}
                alt={selectedMatch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="neo-badge bg-coy-green text-white border-coy-ink">
                  ✓ Mutual Match
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <h3 className="font-heading font-extrabold text-2xl text-coy-ink">
                {selectedMatch.name}, {selectedMatch.age}
              </h3>
              <span className="text-xs font-mono bg-coy-subtle px-2 py-0.5 rounded border border-coy-ink">
                {selectedMatch.city}
              </span>
            </div>

            <p className="text-xs text-coy-muted-dark font-medium mt-1">
              {selectedMatch.college}
            </p>

            <div className="my-3 p-3 bg-coy-canvas rounded-xl border border-coy-ink/30 text-xs">
              <span className="font-bold text-coy-ink block mb-0.5 font-heading">Bio:</span>
              <p className="text-zinc-700">{selectedMatch.shortBio}</p>
            </div>

            {selectedMatch.prompt && (
              <div className="mb-4 p-3 bg-coy-pink-tint rounded-xl border border-coy-ink/30 text-xs">
                <span className="font-mono font-bold text-[10px] text-coy-pink block uppercase">
                  {selectedMatch.prompt.question}
                </span>
                <p className="text-coy-ink font-semibold mt-0.5">{selectedMatch.prompt.answer}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const text = `Hey ${selectedMatch.name}! We both matched on Coy 🎉`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="flex-1 neo-btn bg-coy-whatsapp text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-hard"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Message on WhatsApp</span>
              </button>

              <button
                onClick={() => setSelectedMatch(null)}
                className="neo-btn bg-zinc-100 text-coy-ink px-4 py-2.5 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
