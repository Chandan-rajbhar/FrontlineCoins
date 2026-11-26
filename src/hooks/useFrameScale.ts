import { useState, useEffect, useCallback } from 'react';

const calculateScale = (frameWidth: number, frameHeight: number): number => {
  if (typeof window === 'undefined') return 1;
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  // Proportional vertical margin: gives 5% to 7% of viewport height as breathing room
  // clamp between 20px and 48px per side (total 40px to 96px)
  const vMarginPerSide = Math.max(20, Math.min(48, Math.round(vh * 0.05)));
  const totalVMargin = vMarginPerSide * 2;

  // Proportional horizontal margin: at least 24px per side
  const hMarginPerSide = Math.max(24, Math.min(60, Math.round(vw * 0.04)));
  const totalHMargin = hMarginPerSide * 2;

  const scaleH = (vh - totalVMargin) / frameHeight;
  const scaleW = (vw - totalHMargin) / frameWidth;

  // Fit inside both width and height, capped at 1.0, min 0.3
  return Math.min(1.0, Math.max(0.3, Math.min(scaleH, scaleW)));
};

export function useFrameScale(frameWidth = 438, frameHeight = 918): number {
  const [scale, setScale] = useState<number>(() =>
    calculateScale(frameWidth, frameHeight)
  );

  const updateScale = useCallback(() => {
    setScale(calculateScale(frameWidth, frameHeight));
  }, [frameWidth, frameHeight]);

  useEffect(() => {
    updateScale();

    window.addEventListener('resize', updateScale, { passive: true });
    window.addEventListener('orientationchange', updateScale, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateScale);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateScale);
      }
    };
  }, [updateScale]);

  return scale;
}
