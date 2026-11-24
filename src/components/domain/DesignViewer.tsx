import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Pin } from 'lucide-react';
import { ProofComment } from '../../types';

interface DesignViewerProps {
  imageUrl: string;
  comments: ProofComment[];
  onAddComment: (comment: { x: number; y: number; text: string }) => void;
}

export const DesignViewer: React.FC<DesignViewerProps> = ({
  imageUrl,
  comments,
  onAddComment,
}) => {
  const [zoom, setZoom] = useState(1);
  const [activePin, setActivePin] = useState<{ x: number; y: number } | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setActivePin({ x, y });
  };

  const handleSavePin = () => {
    if (activePin && commentText.trim()) {
      onAddComment({ x: activePin.x, y: activePin.y, text: commentText.trim() });
      setActivePin(null);
      setCommentText('');
    }
  };

  return (
    <div className="relative rounded-[8px] bg-surface-charcoal border border-border-tactical overflow-hidden flex flex-col">
      {/* Zoom Toolbar */}
      <div className="absolute top-2 right-2 z-20 flex gap-1 bg-surface-dim/80 backdrop-blur-sm p-1 rounded border border-border-tactical">
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
          className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-tactical-yellow"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
          className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-tactical-yellow"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Proof Canvas */}
      <div
        onClick={handleImageClick}
        className="relative w-full aspect-square flex items-center justify-center overflow-hidden cursor-crosshair"
      >
        <img
          src={imageUrl}
          alt="Artwork 3D Proof"
          className="w-full h-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        />

        {/* Saved Pin Markers */}
        {comments.map((c, i) => (
          <div
            key={c.id}
            className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-tactical-yellow text-surface-charcoal font-display text-[10px] font-bold flex items-center justify-center shadow-lg border border-surface pointer-events-none"
            style={{ left: `${c.x || 50}%`, top: `${c.y || 50}%` }}
          >
            {i + 1}
          </div>
        ))}

        {/* Active Pin Placement Dialog */}
        {activePin && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-30 bg-surface-elevated border border-tactical-yellow p-3 rounded-[6px] shadow-2xl flex flex-col gap-2 w-56 -ml-28"
            style={{ left: `${activePin.x}%`, top: `${Math.min(75, activePin.y)}%` }}
          >
            <span className="font-display text-[10px] text-tactical-yellow uppercase font-bold">
              Pin Revision Note
            </span>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="e.g. adjust enamel hue"
              className="px-2 py-1 bg-surface-charcoal text-xs text-text-crisp rounded border border-border-tactical focus:outline-none focus:border-tactical-yellow"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setActivePin(null)}
                className="text-[10px] text-text-muted font-display uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePin}
                className="px-2 py-1 bg-tactical-yellow text-surface-charcoal text-[10px] font-display uppercase font-bold rounded"
              >
                Save Pin
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 bg-surface-elevated border-t border-border-tactical text-[11px] font-sans text-text-muted flex items-center gap-1.5">
        <Pin className="w-3.5 h-3.5 text-tactical-yellow" />
        <span>Tap anywhere on the proof to pin a revision request.</span>
      </div>
    </div>
  );
};
