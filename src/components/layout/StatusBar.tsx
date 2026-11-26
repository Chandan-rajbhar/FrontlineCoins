import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = React.useState('9:41');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-9 bg-transparent px-6 flex items-center justify-between text-text-muted font-sans text-xs select-none z-50 shrink-0"
      aria-hidden="true"
    >
      <span className="font-semibold text-text-crisp text-[11px]">{time}</span>

      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="font-bold text-[9px] text-tactical-yellow">5G</span>
        <Wifi className="w-3 h-3 text-text-muted" />
        <Battery className="w-3.5 h-3.5 text-tactical-yellow fill-tactical-yellow/30" />
      </div>
    </div>
  );
};
