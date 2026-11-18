import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, GraduationCap, Sparkles, Heart, X, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function SwipeCard({ profile, onSwipe, isFront }) {
  const [showFullBio, setShowFullBio] = useState(false);

  // Framer Motion gesture physics
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const likeScale = useTransform(x, [20, 120], [0.8, 1.1]);
  const nopeOpacity = useTransform(x, [-20, -120], [0, 1]);
  const nopeScale = useTransform(x, [-20, -120], [0.8, 1.1]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      if (navigator.vibrate) navigator.vibrate(25);
      onSwipe('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      if (navigator.vibrate) navigator.vibrate(15);
      onSwipe('pass');
    }
  };

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        cursor: isFront ? 'grab' : 'default',
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className={`absolute inset-0 select-none touch-none rounded-3xl overflow-hidden neo-card bg-white transition-shadow ${
        isFront ? 'z-20' : 'z-10 scale-[0.96] translate-y-3 opacity-90'
      }`}
    >
      {/* Dynamic Stamp Overlays */}
      {isFront && (
        <>
          {/* LIKE STAMP (VIBRANT NEON GREEN WITH PLAIN FLAT HEART) */}
          <motion.div
            style={{ opacity: likeOpacity, scale: likeScale }}
            className="absolute top-8 left-6 z-30 pointer-events-none transform -rotate-12 border-4 border-[#00e676] bg-[#00e676]/20 text-[#00e676] font-heading font-extrabold text-3xl px-4 py-1.5 rounded-2xl shadow-hard tracking-wide flex items-center gap-2.5"
          >
            <span>LIKE</span>
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#00e676] stroke-none shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* PASS STAMP (DEEP RED WITH BOLD CROSS) */}
          <motion.div
            style={{ opacity: nopeOpacity, scale: nopeScale }}
            className="absolute top-8 right-6 z-30 pointer-events-none transform rotate-12 border-4 border-[#c8102e] bg-[#c8102e]/20 text-[#c8102e] font-heading font-extrabold text-3xl px-4 py-1.5 rounded-2xl shadow-hard tracking-wide flex items-center gap-2.5"
          >
            <span>PASS</span>
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#c8102e] stroke-[4] fill-none shrink-0">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Main Image Container */}
      <div className="relative w-full h-[62%] bg-zinc-900 overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
        />

        {/* Subtle Dark Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Circle Category Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="neo-badge bg-white/95 text-coy-ink backdrop-blur-sm">
            {profile.circle === 'Campus' && '🎓 '}
            {profile.circle === 'Work / Tech' && '💼 '}
            {profile.circle === 'Social' && '☕ '}
            {profile.circle}
          </span>
        </div>

        {/* Quick Info On Photo */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10 pointer-events-none">
          <div className="flex items-baseline gap-2">
            <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight drop-shadow-sm">
              {profile.name}
            </h2>
            <span className="font-mono text-xl text-zinc-300 font-bold">{profile.age}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-200 mt-0.5 font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-coy-pink shrink-0" />
            <span className="truncate">{profile.college}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-300 mt-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-coy-pink shrink-0" />
            <span>{profile.city}</span>
          </div>
        </div>

        {/* Tap to expand toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFullBio(!showFullBio);
          }}
          className="absolute bottom-3 right-4 z-20 bg-white/90 hover:bg-white text-coy-ink p-1.5 rounded-full border border-coy-ink shadow-hard-sm transition-transform active:scale-95"
          title="Toggle profile details"
        >
          {showFullBio ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Profile Details Bottom Half */}
      <div className="p-4 bg-white h-[38%] flex flex-col justify-between overflow-y-auto no-scrollbar">
        {/* Short Bio */}
        <div>
          <p className="text-xs sm:text-sm text-coy-muted-dark font-medium leading-relaxed">
            "{profile.shortBio}"
          </p>

          {/* Expandable Coy Prompt */}
          {showFullBio && profile.prompt && (
            <div className="mt-2.5 bg-coy-canvas p-2.5 rounded-xl border border-coy-ink/40 text-xs animate-in fade-in duration-200">
              <span className="font-mono font-bold text-[10px] text-coy-pink uppercase tracking-wide block">
                {profile.prompt.question}
              </span>
              <p className="text-coy-ink font-semibold mt-0.5 leading-snug">
                {profile.prompt.answer}
              </p>
            </div>
          )}
        </div>

        {/* Interests Pills */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {profile.interests?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-coy-subtle text-coy-ink border border-coy-ink text-[11px] font-heading font-semibold px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#18181b]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
