import React from 'react';
import { ProofComment } from '../../types';

interface ChatBubbleProps {
  comment: ProofComment;
  isOfficial?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  comment,
  isOfficial = false,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 max-w-[85%] ${
        isOfficial ? 'self-start' : 'self-end'
      }`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-display uppercase">
        <span
          className={`font-bold ${
            isOfficial ? 'text-tactical-yellow' : 'text-primary'
          }`}
        >
          {comment.author}
        </span>
        <span className="text-text-muted font-sans">{comment.timestamp}</span>
      </div>

      <div
        className={`p-3 rounded-[8px] text-xs font-sans leading-relaxed border ${
          isOfficial
            ? 'bg-primary-container text-text-crisp border-border-tactical'
            : 'bg-surface-elevated text-on-surface border-border-tactical'
        }`}
      >
        {comment.text}
      </div>
    </div>
  );
};
