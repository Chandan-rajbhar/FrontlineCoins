import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Coins, FileText, Package, User, LucideIcon } from 'lucide-react';

interface TabItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  { name: 'Home', path: '/', icon: Shield },
  { name: 'Shop', path: '/shop', icon: Coins },
  { name: 'Quote', path: '/quote', icon: FileText },
  { name: 'Orders', path: '/orders', icon: Package },
  { name: 'Account', path: '/account', icon: User },
];

export const BottomTabBar: React.FC = () => {
  return (
    <nav
      className="shrink-0 w-full bg-white border-t border-[#D9DCC8] z-30 select-none"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      role="navigation"
      aria-label="Bottom tab navigation"
    >
      <div className="w-full max-w-[640px] mx-auto flex justify-around items-center h-[64px] px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-[64px] transition-colors relative select-none gap-[4px] ${
                  isActive ? 'text-[#4A5A1E]' : 'text-[#5E6350] hover:text-[#1B1C16]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* 32x3px yellow bar at the very top of the active item */}
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[32px] h-[3px] bg-[#FFCC00]" />
                  )}
                  <Icon
                    className="w-[22px] h-[22px] shrink-0"
                    strokeWidth={1.8}
                  />
                  <span
                    className={`font-sans text-[11px] leading-tight whitespace-nowrap ${
                      isActive ? 'font-bold text-[#4A5A1E]' : 'font-medium text-[#5E6350]'
                    }`}
                  >
                    {tab.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
