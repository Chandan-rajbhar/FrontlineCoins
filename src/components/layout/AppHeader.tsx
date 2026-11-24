import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Bell } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#F4F3EA] border-b border-[#D9DCC8] shrink-0 z-30 pt-[env(safe-area-inset-top,0px)] select-none">
      <div className="w-full max-w-[640px] mx-auto h-[64px] px-[12px] flex items-center justify-between">
        {/* Left: 40x40 olive logo tile + text stack */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-[10px] text-left cursor-pointer group focus:outline-none"
          aria-label="Frontline Coins Home"
        >
          {/* 40x40 olive (#4A5A1E) radius-8 logo tile with 22px yellow shield outline */}
          <div className="w-[40px] h-[40px] rounded-[8px] bg-[#4A5A1E] flex items-center justify-center shrink-0">
            <Shield className="w-[22px] h-[22px] stroke-[#FFCC00] stroke-[2] fill-none" />
          </div>

          {/* Text stack: Frontline Coins / Law enforcement owned */}
          <div className="flex flex-col">
            <span className="font-display font-semibold text-[17px] leading-[20px] uppercase tracking-[0.04em] text-[#1B1C16] group-hover:text-[#4A5A1E] transition-colors">
              Frontline Coins
            </span>
            <span className="font-sans text-[11px] leading-[14px] text-[#5E6350]">
              Law enforcement owned
            </span>
          </div>
        </button>

        {/* Right: 44x44 bell button (radius 8, 1px #C9CDB4 border, white bg) */}
        <button
          type="button"
          onClick={() => navigate('/support')}
          aria-label="Notifications"
          className="w-[44px] h-[44px] rounded-[8px] border border-[#C9CDB4] bg-white flex items-center justify-center shrink-0 hover:bg-[#F4F3EA] active:scale-95 transition-all cursor-pointer focus:outline-none"
        >
          <Bell className="w-[20px] h-[20px] text-[#1B1C16] stroke-[1.8]" />
        </button>
      </div>
    </header>
  );
};
