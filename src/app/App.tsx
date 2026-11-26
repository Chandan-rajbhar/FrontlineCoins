import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

// Direct static imports to ensure instant loading & prevent Vite chunk splitting
import { HomeScreen } from '../features/home/HomeScreen';
import { ShopScreen } from '../features/shop/ShopScreen';
import { ProductDetailScreen } from '../features/product/ProductDetailScreen';
import { QuoteBuilderScreen } from '../features/quote/QuoteBuilderScreen';
import { DesignApprovalScreen } from '../features/design/DesignApprovalScreen';
import { OrdersScreen } from '../features/orders/OrdersScreen';
import { AccountScreen } from '../features/account/AccountScreen';
import { SupportScreen } from '../features/support/SupportScreen';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/shop" element={<ShopScreen />} />
    <Route path="/product/:id" element={<ProductDetailScreen />} />
    <Route path="/quote" element={<QuoteBuilderScreen />} />
    <Route path="/design" element={<DesignApprovalScreen />} />
    <Route path="/orders" element={<OrdersScreen />} />
    <Route path="/account" element={<AccountScreen />} />
    <Route path="/support" element={<SupportScreen />} />
    <Route path="/notifications" element={<SupportScreen />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
