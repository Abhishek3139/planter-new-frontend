import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ShopView } from './components/ShopView';
import { PlantPage } from './components/PlantPage';
import { AboutUs } from './components/AboutUs';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { UserProfile } from './components/UserProfile';
import { CartPage } from './components/CartPage';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentFailed } from './components/PaymentFailed';
import { OrderTracking } from './components/OrderTracking';
import { AdminView } from './components/AdminView';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import { Plant } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const handleViewPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setCurrentView('plant');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main className="flex-1">
          {currentView === 'home' && (
            <HomePage onViewChange={setCurrentView} onViewPlant={handleViewPlant} />
          )}
          
          {currentView === 'shop' && (
            <ShopView searchQuery={searchQuery} onViewPlant={handleViewPlant} />
          )}

          {currentView === 'plant' && selectedPlant && (
            <PlantPage plant={selectedPlant} onBack={() => setCurrentView('shop')} />
          )}

          {currentView === 'about' && (
            <AboutUs />
          )}

          {currentView === 'login' && (
            <Login onViewChange={setCurrentView} />
          )}

          {currentView === 'signup' && (
            <SignUp onViewChange={setCurrentView} />
          )}

          {currentView === 'profile' && (
            <UserProfile onViewChange={setCurrentView} />
          )}

          {currentView === 'cart' && (
            <CartPage onViewChange={setCurrentView} />
          )}

          {currentView === 'payment-success' && (
            <PaymentSuccess onViewChange={setCurrentView} />
          )}

          {currentView === 'payment-failed' && (
            <PaymentFailed onViewChange={setCurrentView} />
          )}

          {currentView === 'order-tracking' && (
            <OrderTracking onViewChange={setCurrentView} />
          )}
          
          {currentView === 'admin' && (
            <AdminView />
          )}
        </main>

        {!['admin', 'payment-success', 'payment-failed', 'order-tracking'].includes(currentView) && <Footer onViewChange={setCurrentView} />}
        
        <Toaster />
      </div>
    </CartProvider>
  );
}