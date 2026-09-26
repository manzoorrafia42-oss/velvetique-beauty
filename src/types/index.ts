export type CategoryType = 'Skincare' | 'Makeup' | 'Haircare' | 'Bodycare' | 'Sun Care' | 'Gift Sets';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  volumeOptions?: string[];
  selectedVolume?: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  comment: string;
  date: string;
  productName?: string;
  skinType?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
}
