import React from 'react';
import { DeviceFrame } from '../components/layout/DeviceFrame';
import { AppShell } from '../components/layout/AppShell';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <DeviceFrame>
      <AppShell showBottomBar={true}>
        {children}
      </AppShell>
    </DeviceFrame>
  );
};
