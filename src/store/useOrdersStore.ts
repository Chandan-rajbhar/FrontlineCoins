import { create } from 'zustand';
import { Order } from '../types';
import { mockOrders } from '../data/orders';

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: mockOrders,
  addOrder: (newOrder) =>
    set((state) => ({ orders: [newOrder, ...state.orders] })),
}));
