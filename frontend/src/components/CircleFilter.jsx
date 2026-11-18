import React from 'react';
import { GraduationCap, Briefcase, Coffee, Users } from 'lucide-react';

export default function CircleFilter({ activeCircle, onSelectCircle }) {
  const circles = [
    { id: 'All', label: 'All', icon: Users },
    { id: 'Campus', label: 'Campus', icon: GraduationCap },
    { id: 'Work / Tech', label: 'Work', icon: Briefcase },
    { id: 'Social', label: 'Social', icon: Coffee },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1 px-4 select-none">
      <div className="flex items-center gap-2 max-w-md mx-auto justify-start sm:justify-center">
        {circles.map((c) => {
          const Icon = c.icon;
          const isSelected = activeCircle === c.id;

          return (
            <button
              key={c.id}
              onClick={() => onSelectCircle(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold border-2 transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-coy-ink text-white border-coy-ink shadow-hard-sm'
                  : 'bg-white text-coy-ink border-coy-ink hover:bg-coy-pink-tint shadow-hard-sm'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-coy-pink' : 'text-zinc-600'}`} />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
