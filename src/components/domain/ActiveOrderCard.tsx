import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOrders } from '../../data/orders';

export const ActiveOrderCard: React.FC = () => {
  const navigate = useNavigate();

  // Find the first active order
  const activeOrder = mockOrders.find((o) => o.status === 'Active');

  // If there is no active order, hide the card (show nothing)
  if (!activeOrder) return null;

  const currentStep = 4;
  const totalSteps = 7;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border border-[#D9DCC8] rounded-[10px] p-[14px] flex flex-col gap-[12px] select-none">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <span className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
            Order FC-1042
          </span>
          <h3 className="font-sans font-bold text-[16px] leading-[20px] text-[#1B1C16] mt-[2px]">
            100 challenge coins
          </h3>
        </div>
        <span className="px-[8px] py-[3px] rounded-[4px] bg-[#FFF3BF] font-sans text-[11px] font-bold text-[#1B1C16] shrink-0">
          In progress
        </span>
      </div>

      {/* 6px progress track */}
      <div className="w-full h-[6px] bg-[#D9DCC8] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4A5A1E] rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Bottom info row */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
          Production · step {currentStep} of {totalSteps}
        </span>
        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="font-sans font-bold text-[12px] leading-[16px] text-[#4A5A1E] hover:underline cursor-pointer"
        >
          Track order
        </button>
      </div>
    </div>
  );
};
