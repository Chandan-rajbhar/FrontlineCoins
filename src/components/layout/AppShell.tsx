import React from 'react';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from './BottomTabBar';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showTopBar?: boolean;
  showBottomBar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  showBottomBar = true,
}) => {
  return (
    <div className="w-full max-w-full h-full flex flex-col bg-[#F4F3EA] text-[#1B1C16] relative overflow-hidden">
      {/* 1. Global fixed AppHeader */}
      <AppHeader />

      {/* 2. Main content: only scrollable area */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar w-full max-w-full relative flex flex-col">
        <div className="w-full max-w-[640px] mx-auto flex-1 flex flex-col min-h-full">
          {children}
        </div>
      </main>

      {/* 3. Bottom tab bar */}
      {showBottomBar && <BottomTabBar />}
    </div>
  );
};
