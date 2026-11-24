import { useState, useEffect } from 'react';

export function useFrameScale(frameWidth = 432, frameHeight = 912): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // Keep at least 16px free above and below (32px total margin)
      const scaleH = (vh - 32) / frameHeight;
      const scaleW = (vw - 32) / frameWidth;
      const s = Math.min(1, Math.max(0.35, Math.min(scaleH, scaleW)));
      setScale(s);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [frameWidth, frameHeight]);

  return scale;
}


