import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CategoryType, Order, ShippingAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface Coupon {
  code: string;
  percentage: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  GLOW10: { code: 'GLOW10', percentage: 10, description: '10% Off Your Entire Order' },
  VELVET20: { code: 'VELVET20', percentage: 20, description: '20% Off Velvetique Club' },
  WELCOME15: { code: 'WELCOME15', percentage: 15, description: '15% Off First Order' }
};

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  discountCode: string;
  discountAmount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  activeView: 'home' | 'shop' | 'collections' | 'about' | 'blog' | 'contact' | 'checkout' | 'order-success';
  setActiveView: (view: 'home' | 'shop' | 'collections' | 'about' | 'blog' | 'contact' | 'checkout' | 'order-success') => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (category: CategoryType | 'All') => void;
  
  addToCart: (product: Product, quantity?: number, selectedVolume?: string) => void;
  removeFromCart: (productId: string, selectedVolume?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVolume?: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  openProductDetails: (product: Product) => void;
  navigateToCategory: (category: CategoryType) => void;
  
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (shippingAddress: ShippingAddress, shippingMethod: 'standard' | 'express', paymentMethod: string) => Order;
  
  user: { name: string; email: string; isLoggedIn: boolean };
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        product: PRODUCTS[0], // 10% Niacinamide Serum
        quantity: 1,
        selectedVolume: PRODUCTS[0].selectedVolume || '30ml / 1.0 fl oz'
      },
      {
        product: PRODUCTS[1], // Dew Boost Moisturizer
        quantity: 1,
        selectedVolume: PRODUCTS[1].selectedVolume || '50ml / 1.7 fl oz'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>([PRODUCTS[0].id, PRODUCTS[6].id]); // Serum & Velvet Lipstick
  const [discountCode, setDiscountCode] = useState<string>('GLOW10');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS['GLOW10']);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Navigation & Views
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'collections' | 'about' | 'blog' | 'contact' | 'checkout' | 'order-success'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Orders and user account
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-84920',
      date: 'Sep 18, 2026',
      items: [
        {
          product: PRODUCTS[0],
          quantity: 1,
          selectedVolume: '30ml / 1.0 fl oz'
        }
      ],
      subtotal: 42,
      discount: 4.2,
      shipping: 0,
      total: 37.8,
      shippingAddress: {
        firstName: 'Rafia',
        lastName: 'Manzoor',
        email: 'manzoorrafia42@gmail.com',
        phone: '+1 (555) 234-8901',
        address: '742 Evergreen Terrace',
        city: 'Beverly Hills',
        state: 'CA',
        postalCode: '90210',
        country: 'United States'
      },
      shippingMethod: 'standard',
      paymentMethod: 'Apple Pay',
      status: 'Delivered',
      trackingNumber: 'VEL-US-9920148'
    }
  ]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const [user, setUser] = useState({
    name: 'Rafia Manzoor',
    email: 'manzoorrafia42@gmail.com',
    isLoggedIn: true
  });

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const baseShippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.95;

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.percentage) / 100 * 100) / 100 : 0;
  const shipping = baseShippingCost;
  const total = Math.max(0, Math.round((subtotal - discountAmount + shipping) * 100) / 100);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedVolume?: string) => {
    const volumeToUse = selectedVolume || product.selectedVolume || (product.volumeOptions ? product.volumeOptions[0] : undefined);
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedVolume === volumeToUse
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVolume: volumeToUse }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedVolume?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedVolume === selectedVolume)));
  };

  const updateQuantity = (productId: string, quantity: number, selectedVolume?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVolume);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedVolume === selectedVolume) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupons
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (AVAILABLE_COUPONS[clean]) {
      setAppliedCoupon(AVAILABLE_COUPONS[clean]);
      setDiscountCode(clean);
      return { success: true, message: `Coupon applied: ${AVAILABLE_COUPONS[clean].description}!` };
    }
    return { success: false, message: 'Invalid coupon code. Try GLOW10 or VELVET20' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountCode('');
  };

  // Navigation helpers
  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Checkout & Orders
  const placeOrder = (
    shippingAddress: ShippingAddress,
    shippingMethod: 'standard' | 'express',
    paymentMethod: string
  ): Order => {
    const shippingPrice = shippingMethod === 'express' ? 9.95 : shipping;
    const finalTotal = Math.round((subtotal - discountAmount + shippingPrice) * 100) / 100;
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingPrice,
      total: finalTotal,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      status: 'Processing',
      trackingNumber: `VEL-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setActiveView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newOrder;
  };

  const loginUser = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
    setIsAccountModalOpen(false);
  };

  const logoutUser = () => {
    setUser({ name: '', email: '', isLoggedIn: false });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        subtotal,
        discountCode,
        discountAmount,
        shipping,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedProduct,
        setSelectedProduct,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        openProductDetails,
        navigateToCategory,
        orders,
        latestOrder,
        placeOrder,
        user,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
