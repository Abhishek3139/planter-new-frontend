import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, Settings, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { Cart } from './Cart';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  currentView: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking';
  onViewChange: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ currentView, onViewChange, searchQuery, onSearchChange }: HeaderProps) {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground">🌱</span>
              </div>
              <span className="text-xl font-semibold hidden sm:block">Planter</span>
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onViewChange('home')}
              className={`text-sm transition-colors hover:text-primary ${
                currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('shop')}
              className={`text-sm transition-colors hover:text-primary ${
                currentView === 'shop' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => onViewChange('about')}
              className={`text-sm transition-colors hover:text-primary ${
                currentView === 'about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onViewChange('profile')}
              className={`text-sm transition-colors hover:text-primary ${
                currentView === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => onViewChange('admin')}
              className={`text-sm transition-colors hover:text-primary ${
                currentView === 'admin' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Admin
            </button>
          </nav>

          {/* Search - Desktop */}
          {currentView === 'shop' && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => onViewChange('home')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'home' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Package className="inline w-4 h-4 mr-2" />
                    Home
                  </button>
                  <button
                    onClick={() => onViewChange('shop')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'shop' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Package className="inline w-4 h-4 mr-2" />
                    Shop
                  </button>
                  <button
                    onClick={() => onViewChange('about')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'about' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Package className="inline w-4 h-4 mr-2" />
                    About
                  </button>
                  <button
                    onClick={() => onViewChange('cart')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'cart' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <ShoppingCart className="inline w-4 h-4 mr-2" />
                    Cart
                  </button>
                  <button
                    onClick={() => onViewChange('profile')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'profile' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <User className="inline w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => onViewChange('admin')}
                    className={`text-left p-2 rounded-md transition-colors ${
                      currentView === 'admin' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Settings className="inline w-4 h-4 mr-2" />
                    Admin
                  </button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96 sm:max-w-lg">
                <Cart onClose={() => setIsCartOpen(false)} onViewChange={onViewChange} />
              </SheetContent>
            </Sheet>

            {/* User */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewChange('profile')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewChange('login')}
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => onViewChange('signup')}
              >
                Sign Up
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="sm:hidden"
              onClick={() => onViewChange('profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {currentView === 'shop' && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}