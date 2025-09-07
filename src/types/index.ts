export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  description: string;
  image: string;
  category: 'houseplant' | 'succulent' | 'outdoor' | 'flowering';
  careLevel: 'easy' | 'medium' | 'hard';
  light: 'low' | 'medium' | 'bright';
  water: 'low' | 'medium' | 'high';
  humidity: 'low' | 'medium' | 'high';
  petFriendly: boolean;
  inStock: number;
  featured: boolean;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderDate: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  joinDate: Date;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant, quantity?: number) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}