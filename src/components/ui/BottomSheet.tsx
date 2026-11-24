import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-surface-dim/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full rounded-t-[16px] bg-surface-elevated border-t border-border-tactical p-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto no-scrollbar pb-safe">
        {/* Drag handle pill */}
        <div className="w-10 h-1 rounded-full bg-border-tactical mx-auto mb-4" />
        <div className="flex items-center justify-between pb-3 border-b border-border-tactical mb-4">
          {title && (
            <h3 className="font-display uppercase text-sm font-bold text-text-crisp tracking-wider">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded flex items-center justify-center text-text-muted hover:text-tactical-yellow transition-colors ml-auto"
            aria-label="Close sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full text-on-surface">{children}</div>
      </div>
    </div>
  );
};
