import React from 'react';

export interface TimelineStep {
  name: string;
  status: 'done' | 'current' | 'pending';
}

interface OrderTimelineProps {
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  { name: 'Quote', status: 'done' },
  { name: 'Design', status: 'done' },
  { name: 'Approved', status: 'done' },
  { name: 'Production', status: 'current' },
  { name: 'Quality check', status: 'pending' },
  { name: 'Shipped', status: 'pending' },
  { name: 'Delivered', status: 'pending' },
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ steps = defaultSteps }) => {
  return (
    <div className="flex flex-col select-none">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isDone = step.status === 'done';
        const isCurrent = step.status === 'current';

        return (
          <div
            key={step.name}
            className="relative h-[34px] flex items-center gap-[12px]"
          >
            {/* Marker Circle 18px */}
            <div className="relative z-10 w-[18px] h-[18px] flex items-center justify-center shrink-0">
              {isDone && (
                <div className="w-[18px] h-[18px] rounded-full bg-[#4A5A1E]" />
              )}
              {isCurrent && (
                <div className="w-[18px] h-[18px] rounded-full bg-[#FFCC00] border-2 border-[#1B1C16]" />
              )}
              {!isDone && !isCurrent && (
                <div className="w-[18px] h-[18px] rounded-full bg-white border-2 border-[#C9CDB4]" />
              )}
            </div>

            {/* Connector Line: 2px x 16px starting 18px below circle top, left-aligned to circle center */}
            {!isLast && (
              <div
                className={`absolute left-[8px] top-[18px] w-[2px] h-[16px] z-0 ${
                  isDone ? 'bg-[#4A5A1E]' : 'bg-[#C9CDB4]'
                }`}
              />
            )}

            {/* Label & In Progress Tag */}
            <div className="flex items-center">
              <span
                className={`font-sans text-[14px] leading-none ${
                  isDone
                    ? 'font-medium text-[#1B1C16]'
                    : isCurrent
                    ? 'font-bold text-[#1B1C16]'
                    : 'font-normal text-[#5E6350]'
                }`}
              >
                {step.name}
              </span>

              {isCurrent && (
                <span className="ml-[8px] px-[8px] py-[2px] rounded-[4px] bg-[#FFF3BF] font-sans text-[11px] font-bold text-[#1B1C16] leading-none">
                  In progress
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
