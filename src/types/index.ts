export interface Category {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  image: string;
  tag?: string;
}

export interface QuantityTier {
  quantity: number;
  pricePerUnit: number;
  savingsPercent?: number;
  badge?: string;
}

export interface ProductSpecs {
  size: string;
  metal: string;
  plating: string;
  edge: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  headline: string;
  description: string;
  startingPrice: number;
  images: string[];
  specs: ProductSpecs;
  quantityTiers: QuantityTier[];
}

export interface OrderItem {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  specsSummary: string;
}

export interface OrderTimelineStage {
  stage: 'Quote' | 'Design' | 'Approved' | 'Production' | 'Quality Check' | 'Shipped' | 'Delivered';
  date?: string;
  completed: boolean;
  current: boolean;
  notes: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Active' | 'Completed';
  currentStage: 'Quote' | 'Design' | 'Approved' | 'Production' | 'Quality Check' | 'Shipped' | 'Delivered';
  totalAmount: number;
  trackingNumber: string;
  carrier: string;
  shippingAddress: string;
  items: OrderItem[];
  timeline: OrderTimelineStage[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface ProofComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  x?: number;
  y?: number;
}
