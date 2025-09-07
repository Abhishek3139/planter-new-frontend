import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Plant, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; plant: Plant; quantity: number }
  | { type: 'REMOVE_FROM_CART'; plantId: string }
  | { type: 'UPDATE_QUANTITY'; plantId: string; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.plant.id === action.plant.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.plant.id === action.plant.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [...state.items, { plant: action.plant, quantity: action.quantity }],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.plant.id !== action.plantId),
      };
    
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.plant.id !== action.plantId),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.plant.id === action.plantId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { items: [] };
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (plant: Plant, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', plant, quantity });
  };

  const removeFromCart = (plantId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', plantId });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', plantId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce((sum, item) => sum + (item.plant.price * item.quantity), 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}