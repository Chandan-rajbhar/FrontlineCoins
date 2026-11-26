import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  RefreshCw,
  Settings,
  Plus,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  Send,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { mockSavedDesigns } from '../../data/designs';
import { mockFaqs } from '../../data/faqs';
import { FaqItem } from '../../components/domain/FaqItem';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { cn } from '../../utils/cn';

export const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, addAddress } = useAuthStore();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('TX');
  const [newZip, setNewZip] = useState('');

  // 3 Independent dropdown card states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);

  // Dispatch form state
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Logout modal state
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportSubject.trim() && supportMessage.trim()) {
      setSupportSubmitted(true);
      setTimeout(() => {
        setSupportSubmitted(false);
        setSupportSubject('');
        setSupportMessage('');
      }, 4000);
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStreet.trim()) {
      addAddress({
        id: `addr-${Date.now()}`,
        label: 'Additional Station Armory',
        street: newStreet.trim(),
        city: newCity.trim() || 'Austin',
        state: newState,
        zip: newZip.trim() || '78701',
        isDefault: false,
      });
      setIsAddressModalOpen(false);
      setNewStreet('');
      setNewCity('');
      setNewZip('');
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <div className="px-[12px] pt-[16px] pb-[28px] flex flex-col gap-[16px] w-full bg-[#F4F3EA]">
      {/* Page Title */}
      <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
        Account
      </h1>

      {/* Officer / Commander Profile Badge */}
      <div className="p-[14px] rounded-[10px] bg-white border border-[#D9DCC8] flex items-center gap-[12px]">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden border border-[#D9DCC8] shrink-0 bg-[#F4F3EA]">
          <img
            alt="Profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB83_uYc9qjE270vtbgZunF_2cjvcAX2IdaWewrXUUKsoVavUX5KsOBUKieMq0MG_m8Rfw9WiPwkdHIOzg4Z3tdpXfoGdp8g4f0CI7G_tYBQiR2XdA62E7IG-JGNEHgJFmgmyjTYEgdl7xcEMKKV6LfJlC6JNtFn4lG7-720d2rIUWMKLQEXomxo5sAG5X2-Fz5g1zLn9pATs2L0eJ_FlYYB2XxyDpxArSzY2pgKbc"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px]">
            <span className="font-display text-[10px] font-bold text-[#3D4C11] uppercase tracking-wider bg-[#E7ECD2] px-[7px] py-[1.5px] rounded-[4px] border border-[#C9CDB4]">
              {user.customerType}
            </span>
          </div>
          <h2 className="font-display text-[18px] leading-[22px] font-bold text-[#1B1C16] uppercase truncate mt-[3px]">
            {user.name}
          </h2>
          <p className="font-sans text-[12px] leading-[16px] text-[#5E6350] truncate mt-[1px]">
            {user.agency} · {user.badgeNumber}
          </p>
        </div>
      </div>

      {/* 1. Saved Approved Designs (One-Tap Reorder) */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[12px]">
        <div className="flex items-center justify-between pb-[6px] border-b border-[#D9DCC8]/60">
          <div className="flex items-center gap-[8px]">
            <RefreshCw className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
            <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
              Saved Approved Dies
            </h3>
          </div>
          <span className="font-sans text-[12px] text-[#5E6350]">
            {mockSavedDesigns.length} Active Dies
          </span>
        </div>

        <div className="flex flex-col gap-[8px]">
          {mockSavedDesigns.map((des) => (
            <div
              key={des.id}
              className="p-[10px] rounded-[8px] bg-white border border-[#D9DCC8] flex items-center justify-between gap-[10px] hover:border-[#4A5A1E]/40 transition-colors"
            >
              <div className="flex items-center gap-[10px] min-w-0">
                <div className="w-[44px] h-[44px] rounded-[6px] bg-[#F4F3EA] border border-[#D9DCC8] overflow-hidden shrink-0">
                  <img
                    src={des.image}
                    alt={des.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-[13.5px] uppercase font-semibold text-[#1B1C16] truncate">
                    {des.name}
                  </span>
                  <span className="font-sans text-[11px] leading-[15px] text-[#5E6350] truncate mt-[1px]">
                    Approved: {des.approvedDate} · ${des.unitPrice.toFixed(2)}/ea
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`/quote?product=prod-1&qty=${des.lastQuantity}`)
                }
                className="h-[32px] px-[14px] rounded-[6px] bg-[#FFCC00] text-[#1B1C16] font-display text-[11px] uppercase font-bold tracking-[0.08em] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all shrink-0 cursor-pointer"
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Station Delivery Addresses */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[12px]">
        <div className="flex items-center justify-between pb-[6px] border-b border-[#D9DCC8]/60">
          <div className="flex items-center gap-[8px]">
            <MapPin className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
            <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
              Station Delivery Addresses
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsAddressModalOpen(true)}
            className="text-[#4A5A1E] font-sans text-[13px] font-medium hover:underline flex items-center gap-[4px] cursor-pointer"
          >
            <Plus className="w-[15px] h-[15px] stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>

        <div className="flex flex-col gap-[8px]">
          {user.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-[10px] bg-white rounded-[8px] border border-[#D9DCC8] flex items-center justify-between gap-[10px]"
            >
              <div className="flex flex-col">
                <span className="font-display uppercase font-semibold text-[13.5px] text-[#1B1C16]">
                  {addr.label}
                </span>
                <span className="font-sans text-[#5E6350] text-[11.5px] mt-[1px]">
                  {addr.street}, {addr.city}, {addr.state} {addr.zip}
                </span>
              </div>
              {addr.isDefault && (
                <span className="font-display text-[10px] uppercase font-bold tracking-wider bg-[#FFF3BF] text-[#1B1C16] px-[7px] py-[2px] rounded-[4px] border border-[#B38F00]/25 shrink-0">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Agency Settings & Tax Exemption */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[12px]">
        <div className="flex items-center gap-[8px] pb-[6px] border-b border-[#D9DCC8]/60">
          <Settings className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />
          <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em]">
            Agency Account Settings
          </h3>
        </div>

        <div className="p-[12px] bg-white rounded-[8px] border border-[#D9DCC8] flex flex-col gap-[6px]">
          <span className="font-display uppercase font-semibold text-[14px] text-[#1B1C16]">
            Tax Exemption Registration
          </span>
          <span className="font-sans text-[12px] text-[#5E6350]">
            Number:{' '}
            <strong className="text-[#1B1C16] font-medium font-mono text-[13px]">
              {user.taxExemptNumber}
            </strong>
          </span>

          <div className="flex items-center gap-[6px] bg-[#E7ECD2] border border-[#C9CDB4] px-[8px] py-[4px] rounded-[4px] self-start mt-1">
            <CheckCircle2 className="w-[14px] h-[14px] text-[#4A5A1E] stroke-[2.5]" />
            <span className="font-sans text-[11px] font-semibold text-[#3D4C11]">
              Official Law Enforcement Procurement Status: Active
            </span>
          </div>
        </div>
      </div>

      {/* 4. SEPARATE CARD: Agency Support Lines (Dropdown) */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col transition-all">
        <button
          type="button"
          onClick={() => setIsContactOpen(!isContactOpen)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
          aria-expanded={isContactOpen}
        >
          <div className="flex items-center gap-[10px] min-w-0">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <Phone className="w-[18px] h-[18px] stroke-[2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-[6px]">
                <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em] group-hover:text-[#4A5A1E] transition-colors truncate">
                  Agency Support Lines
                </h3>
                <span className="font-display text-[9.5px] uppercase font-bold text-[#3D4C11] bg-[#E7ECD2] px-[6px] py-[1px] rounded-[3px] border border-[#C9CDB4] shrink-0">
                  24/7 Desk
                </span>
              </div>
              <span className="font-sans text-[12px] text-[#5E6350] mt-[1px] truncate">
                Direct phone line &amp; official agency email desk
              </span>
            </div>
          </div>

          <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F4F3EA] border border-[#D9DCC8] flex items-center justify-center shrink-0 ml-[8px] group-hover:border-[#4A5A1E]/40 transition-colors">
            <ChevronDown
              className={cn(
                'w-[16px] h-[16px] text-[#4A5A1E] stroke-[2.5] transition-transform duration-200',
                isContactOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        {isContactOpen && (
          <div className="flex flex-col gap-[12px] pt-[14px] mt-[12px] border-t border-[#D9DCC8]/60">
            <div className="p-[10px] rounded-[8px] bg-[#F4F3EA]/70 border border-[#D9DCC8] flex flex-col gap-[3px]">
              <span className="font-display text-[10px] text-[#3D4C11] uppercase tracking-wider font-bold bg-[#E7ECD2] px-[7px] py-[1.5px] rounded-[4px] border border-[#C9CDB4] self-start">
                24/7 Operations Desk
              </span>
              <p className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
                Law enforcement operated support lines, instant answers, and fast agency dispatches.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[8px]">
              <a
                href="tel:4433243900"
                className="p-[12px] bg-white border border-[#D9DCC8] rounded-[8px] flex items-center gap-[10px] hover:border-[#4A5A1E]/50 transition-colors"
              >
                <div className="w-[34px] h-[34px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
                  <Phone className="w-[16px] h-[16px] stroke-[2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-[12.5px] uppercase font-semibold text-[#1B1C16]">
                    Call Direct
                  </span>
                  <span className="font-sans text-[11px] text-[#4A5A1E] font-semibold truncate">
                    (443) 324-3900
                  </span>
                </div>
              </a>

              <a
                href="mailto:info@frontlinecoinsusa.com"
                className="p-[12px] bg-white border border-[#D9DCC8] rounded-[8px] flex items-center gap-[10px] hover:border-[#4A5A1E]/50 transition-colors"
              >
                <div className="w-[34px] h-[34px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
                  <Mail className="w-[16px] h-[16px] stroke-[2]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-[12.5px] uppercase font-semibold text-[#1B1C16]">
                    Email Desk
                  </span>
                  <span className="font-sans text-[11px] text-[#4A5A1E] font-semibold truncate">
                    info@frontline...
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 5. SEPARATE CARD: Frequently Asked Questions (Dropdown) */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col transition-all">
        <button
          type="button"
          onClick={() => setIsFaqOpen(!isFaqOpen)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
          aria-expanded={isFaqOpen}
        >
          <div className="flex items-center gap-[10px] min-w-0">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <HelpCircle className="w-[18px] h-[18px] stroke-[2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-[6px]">
                <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em] group-hover:text-[#4A5A1E] transition-colors truncate">
                  Frequently Asked Questions
                </h3>
                <span className="font-display text-[9.5px] uppercase font-bold text-[#3D4C11] bg-[#E7ECD2] px-[6px] py-[1px] rounded-[3px] border border-[#C9CDB4] shrink-0">
                  {mockFaqs.length} Answers
                </span>
              </div>
              <span className="font-sans text-[12px] text-[#5E6350] mt-[1px] truncate">
                Instant answers for custom coins, mold fees &amp; shipping
              </span>
            </div>
          </div>

          <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F4F3EA] border border-[#D9DCC8] flex items-center justify-center shrink-0 ml-[8px] group-hover:border-[#4A5A1E]/40 transition-colors">
            <ChevronDown
              className={cn(
                'w-[16px] h-[16px] text-[#4A5A1E] stroke-[2.5] transition-transform duration-200',
                isFaqOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        {isFaqOpen && (
          <div className="flex flex-col gap-[8px] pt-[14px] mt-[12px] border-t border-[#D9DCC8]/60">
            {mockFaqs.map((faq, idx) => (
              <FaqItem key={faq.id} faq={faq} defaultOpen={idx === 0} />
            ))}
          </div>
        )}
      </div>

      {/* 6. SEPARATE CARD: Dispatch Support Request (Dropdown) */}
      <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col transition-all">
        <button
          type="button"
          onClick={() => setIsDispatchOpen(!isDispatchOpen)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
          aria-expanded={isDispatchOpen}
        >
          <div className="flex items-center gap-[10px] min-w-0">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <Send className="w-[18px] h-[18px] stroke-[2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-[6px]">
                <h3 className="font-display text-[15px] uppercase font-semibold text-[#1B1C16] tracking-[0.04em] group-hover:text-[#4A5A1E] transition-colors truncate">
                  Dispatch Support Request
                </h3>
                <span className="font-display text-[9.5px] uppercase font-bold text-[#3D4C11] bg-[#E7ECD2] px-[6px] py-[1px] rounded-[3px] border border-[#C9CDB4] shrink-0">
                  Fast Response
                </span>
              </div>
              <span className="font-sans text-[12px] text-[#5E6350] mt-[1px] truncate">
                State your question or custom request to operations
              </span>
            </div>
          </div>

          <div className="w-[30px] h-[30px] rounded-[6px] bg-[#F4F3EA] border border-[#D9DCC8] flex items-center justify-center shrink-0 ml-[8px] group-hover:border-[#4A5A1E]/40 transition-colors">
            <ChevronDown
              className={cn(
                'w-[16px] h-[16px] text-[#4A5A1E] stroke-[2.5] transition-transform duration-200',
                isDispatchOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        {isDispatchOpen && (
          <div className="flex flex-col gap-[12px] pt-[14px] mt-[12px] border-t border-[#D9DCC8]/60">
            {supportSubmitted ? (
              <div className="p-[14px] bg-[#E7ECD2] rounded-[8px] border border-[#C9CDB4] flex items-center gap-[10px] text-[13px] text-[#1B1C16]">
                <CheckCircle2 className="w-[20px] h-[20px] text-[#4A5A1E] shrink-0" />
                <span className="font-sans font-medium">
                  Support dispatch received. A law enforcement representative will contact your agency shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="flex flex-col gap-[10px]">
                <Input
                  label="Subject / Agency Order Number"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  placeholder="e.g. Order FC-1042 or Custom Inquiry"
                  required
                />
                <div className="flex flex-col gap-1 text-left">
                  <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                    Message / Details
                  </label>
                  <textarea
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="State your question or request..."
                    rows={3}
                    required
                    className="p-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans placeholder:text-[#5E6350] focus:outline-none focus:border-[#4A5A1E] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[42px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[13.5px] uppercase tracking-[0.08em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center cursor-pointer mt-1"
                >
                  Send Dispatch
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* 7. LOGOUT BUTTON */}
      <div className="pt-[4px] pb-[8px]">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full h-[46px] rounded-[10px] bg-white border border-[#E8C4C0] text-[#B92B27] hover:bg-[#FFF5F5] font-display font-bold text-[13px] uppercase tracking-[0.08em] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-sm active:translate-y-[1px]"
        >
          <LogOut className="w-[17px] h-[17px] stroke-[2.2]" />
          <span>Log Out of Agency Session</span>
        </button>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add Station Delivery Address"
      >
        <form onSubmit={handleAddAddress} className="flex flex-col gap-[12px]">
          <Input
            label="Street Address"
            value={newStreet}
            onChange={(e) => setNewStreet(e.target.value)}
            placeholder="e.g. 101 E 11th St, Precinct 4"
            required
          />
          <div className="grid grid-cols-2 gap-[8px]">
            <Input
              label="City"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Austin"
              required
            />
            <Input
              label="State"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              placeholder="TX"
              required
            />
          </div>
          <Input
            label="ZIP Code"
            value={newZip}
            onChange={(e) => setNewZip(e.target.value)}
            placeholder="78701"
            required
          />
          <button
            type="submit"
            className="w-full h-[44px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[14px] uppercase tracking-[0.08em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center mt-2 cursor-pointer"
          >
            Save Station Address
          </button>
        </form>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log Out Confirmation"
      >
        <div className="flex flex-col gap-[14px]">
          <p className="font-sans text-[13px] text-[#5E6350] leading-relaxed">
            Are you sure you want to end this procurement session for{' '}
            <strong className="text-[#1B1C16]">{user.name}</strong> ({user.agency})?
          </p>
          <div className="grid grid-cols-2 gap-[10px] mt-1">
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(false)}
              className="h-[42px] rounded-[6px] border border-[#D9DCC8] bg-white text-[#1B1C16] font-display text-[12.5px] uppercase font-bold tracking-[0.06em] hover:bg-[#F4F3EA] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="h-[42px] rounded-[6px] bg-[#B92B27] text-white font-display text-[12.5px] uppercase font-bold tracking-[0.06em] hover:bg-[#9E2420] transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
