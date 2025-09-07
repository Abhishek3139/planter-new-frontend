import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { Separator } from './ui/separator';
import { SheetHeader, SheetTitle } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  onClose: () => void;
  onViewChange?: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
}

export function Cart({ onClose, onViewChange }: CartProps) {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const handleCheckout = () => {
    if (onViewChange) {
      onViewChange('cart');
      onClose();
    } else {
      // Fallback for when no view change function is provided
      alert('Checkout functionality would be implemented here!');
      clearCart();
      onClose();
    }
  };

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">Add some beautiful plants to get started!</p>
          <Button onClick={onClose}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>Shopping Cart ({items.length} item{items.length !== 1 ? 's' : ''})</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.plant.id} className="flex gap-4 p-4 border border-border rounded-lg">
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={item.plant.image}
                  alt={item.plant.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="truncate mb-1">{item.plant.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">${item.plant.price.toFixed(2)}</p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.plant.id)}
                    className="h-8 w-8 p-0 ml-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${(item.plant.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">Total:</span>
          <span className="text-lg font-semibold">${total.toFixed(2)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button onClick={handleCheckout} className="bg-primary text-primary-foreground hover:bg-primary/90">
            View Cart & Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}