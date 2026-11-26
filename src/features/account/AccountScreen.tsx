import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  RefreshCw,
  Settings,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { mockSavedDesigns } from '../../data/designs';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, addAddress } = useAuthStore();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('TX');
  const [newZip, setNewZip] = useState('');

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

  return (
    <div className="px-[12px] pt-[16px] pb-[20px] flex flex-col gap-[16px] w-full bg-[#F4F3EA]">
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
    </div>
  );
};
