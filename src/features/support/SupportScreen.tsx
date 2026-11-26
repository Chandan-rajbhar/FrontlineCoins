import React, { useState } from 'react';
import { Phone, Mail, HelpCircle, Send, CheckCircle2, Bell, Clock } from 'lucide-react';
import { mockFaqs } from '../../data/faqs';
import { FaqItem } from '../../components/domain/FaqItem';
import { Input } from '../../components/ui/Input';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  isUnread: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order FC-1042 in Production',
    desc: 'Step 4 of 7 completed. Die stamping finished, plating underway.',
    time: '2 hours ago',
    isUnread: true,
  },
  {
    id: 'notif-2',
    title: 'Digital Artwork Proof Ready',
    desc: '3D Proof for Sheriff Star Badge Crest ready for officer sign-off.',
    time: '1 day ago',
    isUnread: false,
  },
];

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
    <div className="px-[12px] pt-[16px] pb-[20px] flex flex-col gap-[16px] w-full bg-[#F4F3EA]">
      {/* Page Title & Header */}
      <div className="flex flex-col gap-[4px]">
        <span className="font-display text-[10px] text-[#3D4C11] uppercase tracking-wider font-bold bg-[#E7ECD2] px-[8px] py-[2px] rounded-[4px] border border-[#C9CDB4] self-start">
          24/7 Operations Desk
        </span>
        <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16] mt-[2px]">
          Agency Support &amp; FAQs
        </h1>
        <p className="font-sans text-[13px] leading-[18px] text-[#5E6350]">
          Law enforcement operated support lines, dispatch alerts, and answers.
        </p>
      </div>

      {/* Direct Contact Actions: Phone and Email */}
      <div className="grid grid-cols-2 gap-[8px]">
        <a
          href="tel:4433243900"
          className="p-[12px] bg-white border border-[#D9DCC8] rounded-[10px] flex items-center gap-[10px] hover:border-[#4A5A1E]/50 transition-colors"
        >
          <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
            <Phone className="w-[16px] h-[16px] stroke-[2]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[13px] uppercase font-semibold text-[#1B1C16]">
              Call Direct
            </span>
            <span className="font-sans text-[11.5px] text-[#4A5A1E] font-semibold truncate">
              (443) 324-3900
            </span>
          </div>
        </a>

        <a
          href="mailto:info@frontlinecoinsusa.com"
          className="p-[12px] bg-white border border-[#D9DCC8] rounded-[10px] flex items-center gap-[10px] hover:border-[#4A5A1E]/50 transition-colors"
        >
          <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
            <Mail className="w-[16px] h-[16px] stroke-[2]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[13px] uppercase font-semibold text-[#1B1C16]">
              Email Desk
            </span>
            <span className="font-sans text-[11.5px] text-[#4A5A1E] font-semibold truncate">
              info@frontline...
            </span>
          </div>
        </a>
      </div>

      {/* Recent Agency Alerts / Notifications */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[10px]">
        <div className="flex items-center gap-[8px] pb-[6px] border-b border-[#D9DCC8]/60">
          <Bell className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
          <h2 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
            Recent Agency Alerts
          </h2>
        </div>

        <div className="flex flex-col gap-[8px]">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className="p-[10px] rounded-[8px] bg-[#F4F3EA]/60 border border-[#D9DCC8] flex flex-col gap-[2px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-[13px] uppercase text-[#1B1C16]">
                  {notif.title}
                </span>
                {notif.isUnread && (
                  <span className="font-display text-[9.5px] font-bold uppercase tracking-wider bg-[#FFF3BF] text-[#1B1C16] px-[6px] py-[1px] rounded-[3px] border border-[#B38F00]/25">
                    New
                  </span>
                )}
              </div>
              <p className="font-sans text-[11.5px] leading-[15px] text-[#5E6350]">
                {notif.desc}
              </p>
              <div className="flex items-center gap-[4px] text-[10.5px] text-[#5E6350] mt-[2px]">
                <Clock className="w-[11px] h-[11px]" />
                <span>{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[8px]">
          <HelpCircle className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
          <h2 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-[8px]">
          {mockFaqs.map((faq, idx) => (
            <FaqItem key={faq.id} faq={faq} defaultOpen={idx === 0} />
          ))}
        </div>
      </div>

      {/* Official Dispatch Support Request Form */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[12px]">
        <div className="flex items-center gap-[8px] pb-[6px] border-b border-[#D9DCC8]/60">
          <Send className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
          <h2 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
            Dispatch Support Request
          </h2>
        </div>

        {submitted ? (
          <div className="p-[14px] bg-[#E7ECD2] rounded-[8px] border border-[#C9CDB4] flex items-center gap-[10px] text-[13px] text-[#1B1C16]">
            <CheckCircle2 className="w-[20px] h-[20px] text-[#4A5A1E] shrink-0" />
            <span className="font-sans font-medium">
              Support dispatch received. A law enforcement representative will contact your agency shortly.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
            <Input
              label="Subject / Agency Order Number"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Order FC-1042 or Custom Inquiry"
              required
            />
            <div className="flex flex-col gap-1 text-left">
              <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                Message / Details
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State your question or request..."
                rows={3}
                required
                className="p-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans placeholder:text-[#5E6350] focus:outline-none focus:border-[#4A5A1E] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-[44px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[14px] uppercase tracking-[0.08em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center cursor-pointer mt-1"
            >
              Send Dispatch
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
