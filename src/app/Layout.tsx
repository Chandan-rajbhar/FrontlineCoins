import React from 'react';
import { useLocation } from 'react-router-dom';
import { DeviceFrame } from '../components/layout/DeviceFrame';
import { AppShell } from '../components/layout/AppShell';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Quote screen has custom sticky bottom bar, so hide the bottom tab bar
  const isQuoteScreen = path.startsWith('/quote');
  const showBottomBar = !isQuoteScreen;

  return (
    <DeviceFrame>
      <AppShell showBottomBar={showBottomBar}>
        {children}
      </AppShell>
    </DeviceFrame>
  );
};
