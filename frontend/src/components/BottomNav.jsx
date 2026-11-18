import React from 'react';
import { Home, Compass, Heart } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, matchCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'discover', label: 'Discover', icon: Compass, badge: null },
    { id: 'matches', label: 'Matches', icon: Heart, badge: matchCount > 0 ? matchCount : null },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-coy-ink py-2 px-6 z-40 select-none pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all relative ${
                isActive
                  ? 'text-coy-ink font-heading font-extrabold'
                  : 'text-zinc-500 hover:text-coy-ink font-medium'
              }`}
            >
              <div
                className={`relative p-1.5 rounded-xl transition-transform ${
                  isActive
                    ? 'bg-coy-pink text-white border-2 border-coy-ink shadow-hard-sm -translate-y-1'
                    : 'hover:bg-zinc-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#00e676] text-coy-ink text-[10px] font-mono font-bold w-4 h-4 rounded-full border border-coy-ink flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] ${isActive ? 'text-coy-ink font-bold' : 'text-zinc-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
