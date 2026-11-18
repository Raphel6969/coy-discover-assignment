import React from 'react';
import { Home, Compass } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, matchCount = 0 }) {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (isActive) => <Home className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />,
      badge: null,
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: (isActive) => <Compass className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />,
      badge: null,
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current stroke-none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      badge: matchCount > 0 ? matchCount : null,
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-coy-ink py-1.5 px-6 z-40 select-none pb-[calc(0.35rem+env(safe-area-inset-bottom))] shadow-sm"
    >
      <div className="max-w-xs mx-auto flex items-center justify-around h-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
              className="relative flex items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coy-pink rounded-xl"
            >
              <div
                className={`relative p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-coy-pink text-white border-2 border-coy-ink shadow-hard-sm -translate-y-0.5'
                    : 'text-zinc-500 hover:text-coy-ink hover:bg-zinc-100'
                }`}
              >
                {tab.icon(isActive)}

                {tab.badge && (
                  <span
                    aria-label={`${tab.badge} matches`}
                    className="absolute -top-1.5 -right-2 bg-[#00e676] text-coy-ink text-[10px] font-mono font-extrabold w-4 h-4 rounded-full border border-coy-ink flex items-center justify-center animate-pulse"
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
