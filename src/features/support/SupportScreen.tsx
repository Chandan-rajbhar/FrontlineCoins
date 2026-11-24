import React, { useState } from 'react';
import { Phone, Mail, HelpCircle, Send, CheckCircle2 } from 'lucide-react';
import { mockFaqs } from '../../data/faqs';
import { FaqItem } from '../../components/domain/FaqItem';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const SupportScreen: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSubject('');
        setMessage('');
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-2 gap-4 text-on-surface">
      <div className="flex flex-col">
        <span className="font-display text-[10px] text-tactical-yellow uppercase tracking-widest font-bold">
          24/7 Operations Desk
        </span>
        <h1 className="font-display text-xl font-bold uppercase text-text-crisp tracking-wide">
          Agency Support &amp; FAQs
        </h1>
        <p className="font-sans text-xs text-text-muted mt-0.5">
          Law enforcement operated support lines and instant answers.
        </p>
      </div>

      {/* Direct Contact Actions: Phone and Email */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href="tel:4433243900"
          className="p-3 bg-surface-elevated border border-border-tactical rounded-[8px] flex items-center gap-2.5 hover:border-tactical-yellow/60 transition-colors"
        >
          <div className="w-9 h-9 rounded-[6px] bg-primary-container flex items-center justify-center text-tactical-yellow shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-xs uppercase font-bold text-text-crisp">
              Call Direct
            </span>
            <span className="font-sans text-[11px] text-tactical-yellow font-semibold truncate">
              (443) 324-3900
            </span>
          </div>
        </a>

        <a
          href="mailto:info@frontlinecoinsusa.com"
          className="p-3 bg-surface-elevated border border-border-tactical rounded-[8px] flex items-center gap-2.5 hover:border-tactical-yellow/60 transition-colors"
        >
          <div className="w-9 h-9 rounded-[6px] bg-primary-container flex items-center justify-center text-tactical-yellow shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-xs uppercase font-bold text-text-crisp">
              Email Desk
            </span>
            <span className="font-sans text-[11px] text-tactical-yellow font-semibold truncate">
              info@frontline...
            </span>
          </div>
        </a>
      </div>

      {/* FAQ Accordion (5 Verified FAQs) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold text-text-crisp mb-1">
          <HelpCircle className="w-4 h-4 text-tactical-yellow" />
          <span>Frequently Asked Questions</span>
        </div>

        <div className="flex flex-col gap-2">
          {mockFaqs.map((faq, idx) => (
            <FaqItem key={faq.id} faq={faq} defaultOpen={idx === 0} />
          ))}
        </div>
      </div>

      {/* Official Contact Form */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-surface-elevated border border-border-tactical p-4">
        <div className="flex items-center gap-1.5 border-b border-border-tactical pb-2">
          <Send className="w-4 h-4 text-tactical-yellow" />
          <h3 className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider">
            Dispatch Support Request
          </h3>
        </div>

        {submitted ? (
          <div className="p-4 bg-primary-container/40 rounded-[6px] border border-tactical-yellow flex items-center gap-3 text-xs text-text-crisp">
            <CheckCircle2 className="w-5 h-5 text-tactical-yellow shrink-0" />
            <span>Support dispatch received. A representative will contact your agency shortly.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              label="Subject / Agency Order Number"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Order FLC-9428 or Custom Inquiry"
              required
            />
            <div className="flex flex-col gap-1 text-left">
              <label className="font-display text-xs text-text-crisp uppercase tracking-wider font-semibold">
                Message / Details
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State your question or request..."
                rows={3}
                required
                className="p-3 bg-surface-charcoal border border-border-tactical rounded-[6px] text-text-crisp text-xs font-sans placeholder:text-text-muted focus:outline-none focus:border-tactical-yellow focus:ring-1 focus:ring-tactical-yellow"
              />
            </div>
            <Button type="submit" variant="primary" size="md" fullWidth>
              Send Dispatch
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
