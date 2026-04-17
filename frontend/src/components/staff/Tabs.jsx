import { useState } from 'react';

/**
 * Tabs component with animated underline indicator.
 */
export default function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="border-b border-emerald-100 mb-6">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 relative
              ${activeTab === tab.key
                ? 'text-emerald-700'
                : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <span className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </span>
            {/* Active underline */}
            {activeTab === tab.key && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
