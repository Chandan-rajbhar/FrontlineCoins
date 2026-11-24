import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dim/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative w-full rounded-[8px] bg-surface-elevated border border-border-tactical p-5 shadow-tactical-modal z-10 flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-center justify-between pb-3 border-b border-border-tactical mb-4">
          {title && (
            <h3 className="font-display uppercase text-sm font-bold text-text-crisp tracking-wider">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded flex items-center justify-center text-text-muted hover:text-tactical-yellow transition-colors ml-auto"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full text-on-surface">{children}</div>
      </div>
    </div>
  );
};
