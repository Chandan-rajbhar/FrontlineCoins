import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Clock,
  Package,
  Sparkles,
  Truck,
  ShieldCheck,
  Archive,
  CheckCheck,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface AlertMessage {
  id: string;
  title: string;
  category: 'Production' | 'Artwork' | 'Logistics' | 'Account' | 'Tooling';
  desc: string;
  time: string;
  isUnread: boolean;
  actionText?: string;
  actionRoute?: string;
  iconType: 'production' | 'artwork' | 'logistics' | 'account' | 'tooling';
}

const initialAlerts: AlertMessage[] = [
  {
    id: 'alert-1',
    title: 'Order FC-1042 in Production',
    category: 'Production',
    desc: 'Step 4 of 7 completed. Die stamping finished, antique bronze plating underway for 100 challenge coins.',
    time: '2 hours ago',
    isUnread: true,
    actionText: 'Track Order',
    actionRoute: '/orders',
    iconType: 'production',
  },
  {
    id: 'alert-2',
    title: 'Digital Artwork Proof Ready',
    category: 'Artwork',
    desc: '3D Digital Proof for Sheriff Star Badge Crest is ready for commanding officer review and sign-off.',
    time: '5 hours ago',
    isUnread: true,
    actionText: 'Review Proof',
    actionRoute: '/design',
    iconType: 'artwork',
  },
  {
    id: 'alert-3',
    title: 'Station Armory Delivery Tracking',
    category: 'Logistics',
    desc: 'Tracking USPS Priority Express #9405-5112 assigned for Austin Station Armory delivery.',
    time: '1 day ago',
    isUnread: false,
    actionText: 'View Shipment',
    actionRoute: '/orders',
    iconType: 'logistics',
  },
  {
    id: 'alert-4',
    title: 'Tax Exemption Status Verified',
    category: 'Account',
    desc: 'Official Law Enforcement Procurement tax exemption (#TX-940219-LE) verified for active fiscal year.',
    time: '3 days ago',
    isUnread: false,
    iconType: 'account',
  },
  {
    id: 'alert-5',
    title: 'Master Die Tooling Archived in Vault',
    category: 'Tooling',
    desc: 'Custom master die for K9 Explosive Detection Coin archived in armory vault for instant reorders.',
    time: '1 week ago',
    isUnread: false,
    actionText: 'View Saved Dies',
    actionRoute: '/account',
    iconType: 'tooling',
  },
  {
    id: 'alert-6',
    title: 'Batch Reorder Queued for Minting',
    category: 'Production',
    desc: 'Reorder batch of 250 DHS Air Marshal Service Coins received and queued for fabrication.',
    time: '2 weeks ago',
    isUnread: false,
    iconType: 'production',
  },
];

export const SupportScreen: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<AlertMessage[]>(initialAlerts);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread' | 'Production' | 'Artwork' | 'Logistics'>('All');

  const unreadCount = alerts.filter((a) => a.isUnread).length;

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isUnread: false })));
  };

  const handleCardClick = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isUnread: false } : a))
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === 'Unread') return alert.isUnread;
    if (activeFilter === 'Production') return alert.category === 'Production';
    if (activeFilter === 'Artwork') return alert.category === 'Artwork';
    if (activeFilter === 'Logistics') return alert.category === 'Logistics';
    return true;
  });

  const getAlertIcon = (iconType: AlertMessage['iconType']) => {
    switch (iconType) {
      case 'production':
        return <Package className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />;
      case 'artwork':
        return <Sparkles className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />;
      case 'logistics':
        return <Truck className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />;
      case 'account':
        return <ShieldCheck className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />;
      case 'tooling':
        return <Archive className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[2]" />;
    }
  };

  return (
    <div className="px-[12px] pt-[16px] pb-[20px] flex flex-col gap-[16px] w-full bg-[#F4F3EA]">
      {/* Header Section */}
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[10px] text-[#3D4C11] uppercase tracking-wider font-bold bg-[#E7ECD2] px-[8px] py-[2px] rounded-[4px] border border-[#C9CDB4]">
            Agency Alerts
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="flex items-center gap-[4px] font-sans text-[11.5px] text-[#4A5A1E] font-medium hover:underline cursor-pointer"
            >
              <CheckCheck className="w-[14px] h-[14px] stroke-[2]" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16] mt-[2px]">
          Notifications
        </h1>
        <p className="font-sans text-[13px] leading-[18px] text-[#5E6350]">
          Official order dispatches, production milestones, and agency alerts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-[6px] overflow-x-auto pb-[2px] no-scrollbar">
        {(['All', 'Unread', 'Production', 'Artwork', 'Logistics'] as const).map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`h-[30px] px-[12px] rounded-full font-display text-[11.5px] uppercase font-semibold tracking-[0.03em] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#4A5A1E] text-white border border-[#4A5A1E]'
                  : 'bg-white text-[#5E6350] border border-[#D9DCC8] hover:border-[#4A5A1E]/40'
              }`}
            >
              {tab}
              {tab === 'Unread' && unreadCount > 0 && (
                <span className="ml-[5px] px-[5px] py-[0.5px] rounded-full text-[9px] bg-[#FFCC00] text-[#1B1C16] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Alert Messages List */}
      <div className="flex flex-col gap-[10px]">
        {filteredAlerts.length === 0 ? (
          <div className="p-[24px] bg-white rounded-[10px] border border-[#D9DCC8] text-center flex flex-col items-center gap-[8px]">
            <Bell className="w-[32px] h-[32px] text-[#5E6350]/40 stroke-[1.5]" />
            <span className="font-display uppercase font-semibold text-[14px] text-[#1B1C16]">
              No Alerts Found
            </span>
            <p className="font-sans text-[12px] text-[#5E6350]">
              There are no notifications matching your selected filter.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isExpanded = expandedId === alert.id;
            return (
              <div
                key={alert.id}
                onClick={() => handleCardClick(alert.id)}
                className={`rounded-[10px] bg-white border transition-all cursor-pointer overflow-hidden ${
                  alert.isUnread
                    ? 'border-[#C9CDB4] shadow-[0_2px_8px_rgba(74,90,30,0.06)]'
                    : 'border-[#D9DCC8] opacity-95 hover:opacity-100 hover:border-[#4A5A1E]/30'
                }`}
              >
                {/* Minimal Card Header Row */}
                <div className="p-[12px] flex items-center gap-[10px]">
                  {/* Left Icon Badge */}
                  <div
                    className={`w-[36px] h-[36px] rounded-[8px] flex items-center justify-center shrink-0 border ${
                      alert.isUnread
                        ? 'bg-[#E7ECD2] border-[#C9CDB4]'
                        : 'bg-[#F4F3EA] border-[#D9DCC8]'
                    }`}
                  >
                    {getAlertIcon(alert.iconType)}
                  </div>

                  {/* Minimal Content: Category Tag, Title & Timestamp */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-[6px] min-w-0">
                      <span className="font-display text-[9px] uppercase font-bold text-[#3D4C11] bg-[#E7ECD2] px-[5px] py-[0.5px] rounded-[3px] border border-[#C9CDB4] shrink-0">
                        {alert.category}
                      </span>
                      <h2 className="font-display font-semibold text-[13.5px] leading-[17px] uppercase text-[#1B1C16] truncate">
                        {alert.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-[4px] text-[11px] text-[#5E6350] mt-[2px]">
                      <Clock className="w-[11px] h-[11px] stroke-[1.8]" />
                      <span>{alert.time}</span>
                    </div>
                  </div>

                  {/* Right: New Badge & Dropdown Chevron */}
                  <div className="flex items-center gap-[6px] shrink-0">
                    {alert.isUnread && (
                      <span className="font-display text-[9px] font-bold uppercase tracking-wider bg-[#FFF3BF] text-[#1B1C16] px-[5px] py-[1px] rounded-[3px] border border-[#B38F00]/25">
                        New
                      </span>
                    )}
                    <ChevronDown
                      className={`w-[16px] h-[16px] text-[#5E6350] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#4A5A1E]' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-[12px] pb-[12px] pt-[4px] border-t border-[#D9DCC8]/50 flex flex-col gap-[8px] bg-[#FAF9F5]">
                    <p className="font-sans text-[12.5px] leading-[18px] text-[#5E6350]">
                      {alert.desc}
                    </p>

                    {alert.actionText && alert.actionRoute && (
                      <div className="flex justify-end pt-[2px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(alert.actionRoute!);
                          }}
                          className="inline-flex items-center gap-[4px] font-display text-[11px] uppercase font-bold text-[#4A5A1E] hover:underline cursor-pointer bg-[#E7ECD2]/70 px-[9px] py-[3.5px] rounded-[4px] border border-[#C9CDB4]"
                        >
                          <span>{alert.actionText}</span>
                          <ArrowRight className="w-[12px] h-[12px] stroke-[2.5]" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
