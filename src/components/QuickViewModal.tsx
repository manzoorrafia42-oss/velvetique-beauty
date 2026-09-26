import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ArrowRight, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetails,
    setActiveView
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setSelectedVolume(
        quickViewProduct.selectedVolume || (quickViewProduct.volumeOptions ? quickViewProduct.volumeOptions[0] : '')
      );
      setActiveImage(quickViewProduct.image);
      setAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const currentVolume = selectedVolume || (product.volumeOptions ? product.volumeOptions[0] : '');
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVolume);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentVolume);
    setQuickViewProduct(null);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewFull = () => {
    setQuickViewProduct(null);
    openProductDetails(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD7] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#4A3E3D] hover:text-[#8B3A57] flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Image Showcase */}
          <div className="relative bg-[#F2ECE5] p-6 sm:p-8 flex flex-col items-center justify-between">
            <div className="relative aspect-square w-full flex items-center justify-center">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="max-h-[300px] w-full object-contain rounded-2xl drop-shadow-md transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.discountPercentage && (
                <span className="absolute top-2 left-2 bg-[#8B3A57] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Gallery thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 pt-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer p-0.5 bg-white ${
                      activeImage === img ? 'border-[#8B3A57] ring-1 ring-[#8B3A57]' : 'border-[#DFD5CD] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Category */}
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8B3A57] mb-1">
                {product.category}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-normal text-[#291F21] leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-[#7A6B69] mt-1 font-light">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-[#E5A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#291F21]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#8C7A77]">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-2.5">
                <span className="font-serif text-2xl font-semibold text-[#291F21]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9E8E8B] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-[11px] font-bold text-[#8B3A57] bg-[#F7EDF0] px-2 py-0.5 rounded-full">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="text-xs text-[#5E4E4C] mt-2.5 line-clamp-3 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Volume Options */}
              {product.volumeOptions && product.volumeOptions.length > 1 && (
                <div className="mt-3.5 space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#594948] block">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.volumeOptions.map(vol => (
                      <button
                        key={vol}
                        onClick={() => setSelectedVolume(vol)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                          currentVolume === vol
                            ? 'border-[#8B3A57] bg-[#F7EDF0] text-[#8B3A57] font-semibold'
                            : 'border-[#D9CBC2] bg-white text-[#524544] hover:border-[#8B3A57]'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#EAE1D8] space-y-2.5">
              <div className="flex items-center gap-2">
                {/* Quantity */}
                <div className="flex items-center border border-[#D9CBC2] rounded-xl overflow-hidden bg-white shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#524544] hover:bg-[#F2ECE5] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#2E2426]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#524544] hover:bg-[#F2ECE5] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#8B3A57] hover:bg-[#722A42] text-white shadow-xs'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-xl border border-[#D9CBC2] hover:border-[#8B3A57] transition-colors cursor-pointer shrink-0 ${
                    isFavorited ? 'text-[#8B3A57] bg-[#F7EDF0]' : 'text-[#736361] bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now in Quick View */}
              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 bg-[#2B1B22] hover:bg-[#42212F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Buy Now · 1-Click Checkout</span>
              </button>

              <button
                onClick={handleViewFull}
                className="w-full text-center text-xs text-[#8B3A57] hover:text-[#5B1F32] font-semibold tracking-wider uppercase flex items-center justify-center gap-1 group py-1 cursor-pointer"
              >
                <span>View Full Product Experience & Ingredients</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
