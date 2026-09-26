/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { AccountModal } from './components/AccountModal';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CollectionsView } from './views/CollectionsView';
import { AboutView } from './views/AboutView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';

const MainLayout: React.FC = () => {
  const { activeView } = useShop();

  const renderActiveView = () => {
    switch (activeView) {
      case 'shop':
        return <ShopView />;
      case 'collections':
        return <CollectionsView />;
      case 'about':
        return <AboutView />;
      case 'blog':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D2725] font-sans selection:bg-[#EBDCD3] selection:text-[#64293E]">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <AccountModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
