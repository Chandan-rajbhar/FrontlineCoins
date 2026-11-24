import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  RefreshCw,
  Settings,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { mockSavedDesigns } from '../../data/designs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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
    <div className="flex flex-col w-full px-4 pt-3 pb-2 gap-4 text-on-surface">
      {/* Officer / Commander Profile Badge */}
      <div className="p-4 rounded-[8px] bg-surface-elevated border border-border-tactical shadow-md flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-border-tactical ring-2 ring-tactical-yellow shrink-0">
          <img
            alt="Profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB83_uYc9qjE270vtbgZunF_2cjvcAX2IdaWewrXUUKsoVavUX5KsOBUKieMq0MG_m8Rfw9WiPwkdHIOzg4Z3tdpXfoGdp8g4f0CI7G_tYBQiR2XdA62E7IG-JGNEHgJFmgmyjTYEgdl7xcEMKKV6LfJlC6JNtFn4lG7-720d2rIUWMKLQEXomxo5sAG5X2-Fz5g1zLn9pATs2L0eJ_FlYYB2XxyDpxArSzY2pgKbc"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-[10px] text-tactical-yellow uppercase tracking-widest font-bold bg-background-deep px-1.5 py-0.5 rounded border border-border-tactical">
              {user.customerType}
            </span>
          </div>
          <h2 className="font-display text-base font-bold text-text-crisp uppercase truncate mt-0.5">
            {user.name}
          </h2>
          <p className="font-sans text-xs text-text-muted truncate">
            {user.agency} • {user.badgeNumber}
          </p>
        </div>
      </div>

      {/* 1. Saved Approved Designs (One-Tap Reorder) */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-tactical-yellow" />
            <h3 className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider">
              Saved Approved Dies (Reorder)
            </h3>
          </div>
          <span className="font-sans text-[11px] text-text-muted">
            {mockSavedDesigns.length} Active Dies
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {mockSavedDesigns.map((des) => (
            <div
              key={des.id}
              className="p-2.5 rounded-[6px] bg-surface-charcoal border border-border-tactical flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded bg-surface-container overflow-hidden shrink-0">
                  <img
                    src={des.image}
                    alt={des.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-xs uppercase font-bold text-text-crisp truncate">
                    {des.name}
                  </span>
                  <span className="font-sans text-[10px] text-text-muted truncate">
                    Approved: {des.approvedDate} • ${des.unitPrice.toFixed(2)}/ea
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/quote?product=prod-1&qty=${des.lastQuantity}`)
                }
                className="h-8 px-2.5 rounded bg-tactical-yellow text-surface-charcoal font-display text-[10px] uppercase font-bold tracking-wider hover:bg-tactical-yellow-hover shrink-0"
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Station Delivery Addresses */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-tactical-yellow" />
            <h3 className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider">
              Station Delivery Addresses
            </h3>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="text-tactical-yellow font-display text-xs uppercase font-bold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {user.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-2.5 bg-surface-charcoal rounded-[6px] border border-border-tactical text-xs flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-display uppercase font-bold text-text-crisp">
                  {addr.label}
                </span>
                <span className="font-sans text-text-muted text-[11px] mt-0.5">
                  {addr.street}, {addr.city}, {addr.state} {addr.zip}
                </span>
              </div>
              {addr.isDefault && (
                <span className="font-sans text-[9px] uppercase font-bold bg-primary-container text-tactical-yellow px-1 py-0.5 rounded">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Agency Settings & Tax Exemption */}
      <Card padding="md">
        <div className="flex items-center gap-1.5 mb-2">
          <Settings className="w-4 h-4 text-tactical-yellow" />
          <h3 className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider">
            Agency Account Settings
          </h3>
        </div>
        <div className="p-3 bg-surface-charcoal rounded-[6px] border border-border-tactical text-xs flex flex-col gap-1">
          <span className="font-display uppercase font-bold text-text-crisp">
            Tax Exemption Registration
          </span>
          <span className="font-sans text-text-muted">
            Number: <strong className="text-primary">{user.taxExemptNumber}</strong>
          </span>
          <span className="font-sans text-[11px] text-text-muted">
            Official Law Enforcement Procurement Status: Active
          </span>
        </div>
      </Card>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add Station Delivery Address"
      >
        <form onSubmit={handleAddAddress} className="flex flex-col gap-3">
          <Input
            label="Street Address"
            value={newStreet}
            onChange={(e) => setNewStreet(e.target.value)}
            placeholder="e.g. 101 E 11th St, Precinct 4"
            required
          />
          <div className="grid grid-cols-2 gap-2">
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
          <Button type="submit" variant="primary" fullWidth className="mt-2">
            Save Station Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};
