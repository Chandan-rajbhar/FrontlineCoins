import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const isCompleted = order.status === 'Completed';

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-[8px] bg-surface-elevated border border-border-tactical flex flex-col gap-3 cursor-pointer hover:border-tactical-yellow/60 transition-all select-none shadow-sm min-w-0 overflow-hidden"
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between min-w-0 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="font-display text-sm font-bold text-text-crisp uppercase tracking-wider truncate">
            {order.orderNumber}
          </span>
          <Badge variant={isCompleted ? 'olive' : 'yellow'} size="sm" className="shrink-0">
            {order.currentStage}
          </Badge>
        </div>
        <span className="font-sans text-xs text-text-muted shrink-0">{order.date}</span>
      </div>

      {/* First item preview */}
      {order.items[0] && (
        <div className="flex items-center gap-3 bg-surface-charcoal p-2.5 rounded-[6px] border border-border-tactical/50 min-w-0 overflow-hidden">
          <div className="w-12 h-12 rounded bg-surface-container overflow-hidden shrink-0">
            <img
              src={order.items[0].image}
              alt={order.items[0].productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-display text-xs uppercase font-bold text-text-crisp line-clamp-1 break-words">
              {order.items[0].productName}
            </span>
            <span className="font-sans text-[11px] text-text-muted line-clamp-1 break-words">
              Qty: {order.items[0].quantity} • {order.items[0].specsSummary}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-border-tactical/40 text-xs min-w-0">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="font-sans text-text-muted shrink-0">Total:</span>
          <span className="font-display font-bold text-tactical-yellow truncate">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
        <span className="font-display text-xs text-tactical-yellow flex items-center gap-0.5 uppercase tracking-wider font-semibold shrink-0">
          View Timeline <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
