import React from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useFrameScale } from '../../hooks/useFrameScale';
import { StatusBar } from './StatusBar';

interface DeviceFrameProps {
  children: React.ReactNode;
}

const SCREEN_WIDTH = 412;
const SCREEN_HEIGHT = 892;
const BEZEL = 10;
const FRAME_WIDTH = SCREEN_WIDTH + BEZEL * 2; // 432
const FRAME_HEIGHT = SCREEN_HEIGHT + BEZEL * 2; // 912

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { isDesktop } = useBreakpoint();
  const scale = useFrameScale(FRAME_WIDTH, FRAME_HEIGHT);

  // Mobile / Tablet (< 1024px): No frame, root is 100dvh, app fills screen, only <main> scrolls
  if (!isDesktop) {
    return (
      <div className="w-full max-w-full h-[100dvh] bg-[#F4F3EA] flex flex-col overflow-hidden">
        {children}
      </div>
    );
  }

  // Desktop (>= 1024px): Centered Galaxy S26 hardware frame with scale-to-fit
  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] grid place-items-center overflow-hidden bg-[#E6E5DA] select-none"
      role="region"
      aria-label="Samsung Galaxy S26 Phone Frame Viewport"
    >
      {/* Background tactical pattern - soft neutral */}
      <div className="absolute inset-0 camo-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E6E5DA]/80 via-transparent to-[#D9DCC8]/30 pointer-events-none" />

      {/* Scale-to-fit outer box: width & height equal scaled size */}
      <div
        className="relative shrink-0 overflow-visible"
        style={{
          width: `${FRAME_WIDTH * scale}px`,
          height: `${FRAME_HEIGHT * scale}px`,
        }}
      >
        {/* Hardware Bezel Container */}
        <div
          className="relative bg-[#1A1A1A] rounded-[48px] shadow-[0_24px_64px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.10)] border-[3px] border-[#333333]"
          style={{
            width: `${FRAME_WIDTH}px`,
            height: `${FRAME_HEIGHT}px`,
            padding: `${BEZEL}px`,
            boxSizing: 'border-box',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Inner Screen Viewport */}
          <div
            className="relative w-[412px] h-[892px] overflow-hidden rounded-[40px] bg-[#F4F3EA] flex flex-col border border-black/20"
            style={{
              contain: 'paint layout size',
            }}
          >
            {/* Camera Hole Punch */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[11px] h-[11px] bg-black rounded-full z-50 pointer-events-none ring-[1.5px] ring-[#2A2A2A]" />

            {/* Hardware Status Bar */}
            <div className="shrink-0 h-[36px] z-40 bg-transparent">
              <StatusBar />
            </div>

            {/* Application Root Scroll Area */}
            <div className="flex-1 min-h-0 w-full relative overflow-hidden bg-[#F4F3EA]">
              {children}
            </div>

            {/* Gesture Navigation Bar */}
            <div
              className="shrink-0 h-[24px] w-full flex items-center justify-center z-40 bg-white/95 border-t border-[#D9DCC8]"
              style={{
                position: 'relative',
              }}
            >
              <div className="w-[108px] h-[4px] bg-[#C9CDB4] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
