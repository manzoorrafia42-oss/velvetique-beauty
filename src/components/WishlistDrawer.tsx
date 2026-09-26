import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    openProductDetails,
    setActiveView
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8DFD7]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8DFD7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8B3A57] fill-[#8B3A57]" />
              <h3 className="font-serif text-xl font-medium text-[#291F21]">
                My Saved Wishlist ({wishlistProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-[#736361] hover:text-[#291F21] hover:bg-[#F2ECE5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F2ECE5] text-[#8B3A57] flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2E2426]">
                  No items in your wishlist yet
                </h4>
                <p className="text-xs text-[#7A6B69] max-w-xs mx-auto">
                  Click the heart icon on any product card or details page to curate your private favorites.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#8B3A57] hover:bg-[#6E2A3F] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE1D8] flex gap-3.5 shadow-2xs items-center"
                >
                  <div
                    onClick={() => {
                      openProductDetails(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 bg-[#F7F4F0] rounded-xl overflow-hidden shrink-0 cursor-pointer border border-[#EFE7E0]"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        openProductDetails(product);
                        setIsWishlistOpen(false);
                      }}
                      className="font-serif text-sm font-medium text-[#291F21] truncate hover:text-[#8B3A57] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#8C7A77] truncate mt-0.5">
                      {product.category}
                    </p>
                    <p className="font-serif text-sm font-bold text-[#291F21] mt-1">
                      ${product.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product.id);
                      }}
                      className="p-2 bg-[#8B3A57] hover:bg-[#722A42] text-white rounded-lg transition-colors"
                      title="Move to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-[#9C8C89] hover:text-rose-600 rounded-lg hover:bg-[#F5EFE9] transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8DFD7] space-y-3">
              <button
                onClick={() => {
                  wishlistProducts.forEach(prod => addToCart(prod, 1));
                  wishlistProducts.forEach(prod => toggleWishlist(prod.id));
                }}
                className="w-full py-3 bg-[#4A2432] hover:bg-[#63293E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Move All to Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
