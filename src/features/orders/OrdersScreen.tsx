import React, { useState } from 'react';
import { Segmented } from '../../components/ui/Segmented';
import { OrderTimeline } from '../../components/domain/OrderTimeline';

export const OrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const tabOptions = [
    { value: 'active' as const, label: 'Active' },
    { value: 'completed' as const, label: 'Completed' },
  ];

  return (
    <div className="px-[12px] pt-[16px] pb-[24px] flex flex-col gap-[14px] w-full bg-[#F4F3EA]">
      {/* Title */}
      <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
        Orders
      </h1>

      {/* Segmented Control (Active / Completed) */}
      <Segmented
        options={tabOptions}
        value={activeTab}
        onChange={(val) => setActiveTab(val as 'active' | 'completed')}
      />

      {activeTab === 'active' ? (
        <>
          {/* Order card 1: Active Expanded */}
          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex flex-col gap-[12px]">
            {/* Header: Order FC-1042 12px #5E6350 above 100 challenge coins 16px weight 700 (2px gap) */}
            <div className="flex flex-col">
              <span className="font-sans text-[12px] text-[#5E6350]">
                Order FC-1042
              </span>
              <h3 className="font-sans font-bold text-[16px] leading-[20px] text-[#1B1C16] mt-[2px]">
                100 challenge coins
              </h3>
            </div>

            {/* Timeline */}
            <OrderTimeline />
          </div>

          {/* Second card (collapsed): same style, padding 14px, flex space-between */}
          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[12px] text-[#5E6350]">
                Order FC-1038
              </span>
              <h3 className="font-sans font-bold text-[15px] leading-[20px] text-[#1B1C16] mt-[2px]">
                250 lapel pins
              </h3>
            </div>
            {/* Status tag "Shipped": padding 4px 10px, radius 4, bg #E7ECD2, 12px weight 700, color #3D4C11 */}
            <span className="px-[10px] py-[4px] rounded-[4px] bg-[#E7ECD2] font-sans text-[12px] font-bold text-[#3D4C11]">
              Shipped
            </span>
          </div>
        </>
      ) : (
        /* Completed tab */
        <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[14px] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-[12px] text-[#5E6350]">
              Order FC-0984
            </span>
            <h3 className="font-sans font-bold text-[15px] leading-[20px] text-[#1B1C16] mt-[2px]">
              500 challenge coins
            </h3>
          </div>
          <span className="px-[10px] py-[4px] rounded-[4px] bg-[#E7ECD2] font-sans text-[12px] font-bold text-[#3D4C11]">
            Delivered
          </span>
        </div>
      )}
    </div>
  );
};
