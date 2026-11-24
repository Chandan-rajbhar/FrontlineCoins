import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useDesignStore } from '../../store/useDesignStore';
import { DesignViewer } from '../../components/domain/DesignViewer';
import { ChatBubble } from '../../components/domain/ChatBubble';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';

export const DesignApprovalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentVersion, status, comments, setVersion, setStatus, addComment } =
    useDesignStore();

  const [chatInput, setChatInput] = useState('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
  const [changeNotes, setChangeNotes] = useState('');

  const proofImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuACSSPRru1BuPyhd9-6lbGLYBzGs2P2aozr-Br9miPwcnJUSNrq0C0AKPEIdQ73E_p6PN5V3eSHkasA3PR_yW-qjEkJVHvIhJm5nx14O_6fsDAszul-2cfcbPKTsgUyI7oA0oymb6JaQqaqu5ddg2sICIejqFGMs0uJhs-2WFVUdibNmaSu82UaEPtHK8MIfBVsEaA2xp5fTQsrwzSgLOSnYPIFLnz61PH43Gxun7g';

  const versionTabs = [
    { id: 'v1.0', label: 'Proof v1.0' },
    { id: 'v2.0', label: 'Proof v2.0' },
    { id: 'v3.0', label: 'Proof v3.0 (Active)' },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      addComment({
        author: 'Officer Vance',
        text: chatInput.trim(),
      });
      setChatInput('');
    }
  };

  const handleConfirmApproval = () => {
    setStatus('Approved');
    setIsApproveModalOpen(false);
    navigate('/orders');
  };

  const handleConfirmChanges = () => {
    if (changeNotes.trim()) {
      addComment({
        author: 'Officer Vance',
        text: `Revision Request: ${changeNotes.trim()}`,
      });
      setStatus('Changes Requested');
      setChangeNotes('');
      setIsChangesModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-2 gap-4 text-on-surface">
      {/* Header and Status */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display text-[10px] text-tactical-yellow uppercase tracking-widest font-bold">
            Frontline Artwork Desk
          </span>
          <h1 className="font-display text-xl font-bold uppercase text-text-crisp tracking-wide">
            Design Proof Approval
          </h1>
        </div>
        <Badge
          variant={
            status === 'Approved' ? 'olive' : status === 'Changes Requested' ? 'red' : 'yellow'
          }
          size="md"
        >
          {status}
        </Badge>
      </div>

      {/* Version Tabs */}
      <Tabs
        tabs={versionTabs}
        activeId={currentVersion}
        onChange={(v) => setVersion(v)}
      />

      {/* Proof Viewer with Zoom & Tap-to-Pin */}
      <DesignViewer
        imageUrl={proofImageUrl}
        comments={comments}
        onAddComment={(pin) =>
          addComment({
            author: 'Officer Vance',
            text: pin.text,
            x: pin.x,
            y: pin.y,
          })
        }
      />

      {/* Action Buttons: REQUEST CHANGES & APPROVE DESIGN (1 Yellow Primary) */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setIsChangesModalOpen(true)}
        >
          Request Changes
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsApproveModalOpen(true)}
          disabled={status === 'Approved'}
        >
          {status === 'Approved' ? 'Design Approved' : 'Approve Design'}
        </Button>
      </div>

      {/* Chat with Design Team */}
      <div className="flex flex-col gap-2 rounded-[8px] bg-surface-elevated border border-border-tactical p-3">
        <div className="flex items-center gap-1.5 border-b border-border-tactical pb-2 text-xs font-display uppercase tracking-wider font-bold text-text-crisp">
          <MessageSquare className="w-4 h-4 text-tactical-yellow" />
          <span>Design Desk Messages</span>
        </div>

        <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto no-scrollbar py-1">
          {comments.map((c) => (
            <ChatBubble
              key={c.id}
              comment={c}
              isOfficial={c.author.includes('Frontline')}
            />
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-border-tactical/50">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Message the design team..."
            className="flex-1 px-3 py-2 bg-surface-charcoal border border-border-tactical rounded-[6px] text-xs text-text-crisp placeholder:text-text-muted focus:outline-none focus:border-tactical-yellow"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-[6px] bg-primary-container text-tactical-yellow flex items-center justify-center hover:bg-tactical-yellow hover:text-surface-charcoal transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Confirm Artwork Approval"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <CheckCircle2 className="w-10 h-10 text-tactical-yellow" />
          <h4 className="font-display text-base font-bold text-text-crisp uppercase">
            Authorize Stamping & Production
          </h4>
          <p className="font-sans text-xs text-text-muted">
            By approving this proof, your coin will proceed to high-tonnage die stamping with zero mold fees.
          </p>
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsApproveModalOpen(false)}
            >
              Review Again
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleConfirmApproval}
            >
              Confirm & Mint
            </Button>
          </div>
        </div>
      </Modal>

      {/* Request Changes Modal */}
      <Modal
        isOpen={isChangesModalOpen}
        onClose={() => setIsChangesModalOpen(false)}
        title="Request Design Revisions"
      >
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs text-text-muted">
            All design revisions are 100% free with unlimited adjustments until battle-ready.
          </p>
          <textarea
            value={changeNotes}
            onChange={(e) => setChangeNotes(e.target.value)}
            placeholder="Describe requested adjustments (e.g. rim text, plating tint, enamel color)..."
            rows={4}
            className="w-full p-2.5 bg-surface-charcoal border border-border-tactical rounded-[6px] text-xs text-text-crisp placeholder:text-text-muted focus:outline-none focus:border-tactical-yellow"
          />
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleConfirmChanges}
          >
            Submit Revisions
          </Button>
        </div>
      </Modal>
    </div>
  );
};
