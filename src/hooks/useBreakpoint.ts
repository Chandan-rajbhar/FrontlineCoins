import { useState, useEffect } from 'react';

export interface Breakpoints {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
  height: number;
}

export function useBreakpoint(): Breakpoints {
  const [state, setState] = useState<Breakpoints>(() => {
    if (typeof window === 'undefined') {
      return { isDesktop: true, isTablet: false, isMobile: false, width: 1440, height: 900 };
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      isDesktop: w >= 1024,
      isTablet: w >= 640 && w < 1024,
      isMobile: w < 640,
      width: w,
      height: h,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setState({
        isDesktop: w >= 1024,
        isTablet: w >= 640 && w < 1024,
        isMobile: w < 640,
        width: w,
        height: h,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
