import React from 'react';
import { Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  title = 'Frontline Coins',
  subtitle = 'Law Enforcement Owned',
  showBack = false,
  onBack,
  rightAction,
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.4)] border-b border-border-tactical">
      <div className="camo-bg px-4 h-16 flex items-center justify-between">
        {/* Brand identity logo */}
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-tactical-yellow transition-colors rounded-lg hover:bg-surface-elevated"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-lg bg-primary-container/80 flex items-center justify-center text-tactical-yellow ring-1 ring-border-tactical shadow-inner"
              aria-label="Frontline Coins Home"
            >
              <Shield className="w-5 h-5 fill-tactical-yellow/20" />
            </button>
          )}

          <div className="flex flex-col text-left">
            <span className="font-display text-[11px] text-tactical-yellow uppercase tracking-widest leading-tight font-bold">
              {title}
            </span>
            <span className="font-display text-[15px] text-text-crisp uppercase leading-tight truncate max-w-[180px] font-semibold">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                onClick={() => navigate('/quote')}
                className="hidden min-[360px]:flex items-center justify-center h-8 px-3 bg-tactical-yellow text-surface-charcoal font-display text-[11px] font-bold rounded-[6px] uppercase hover:bg-tactical-yellow-hover shadow-tactical-sm transition-transform active:scale-95"
              >
                Quote
              </button>
              <button
                onClick={() => navigate('/support')}
                className="w-9 h-9 rounded flex items-center justify-center text-text-muted hover:text-tactical-yellow hover:bg-surface-elevated transition-colors"
                aria-label="Notifications & Dispatch"
              >
                <Bell className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
