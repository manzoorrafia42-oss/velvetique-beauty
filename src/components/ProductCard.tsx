import React from 'react';
import { Heart, Eye, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    openProductDetails
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={() => openProductDetails(product)}
      className="group bg-white rounded-2xl border border-[#EBE4DC] overflow-hidden hover:shadow-xl hover:border-[#DCCFC4] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#F7F4F0] overflow-hidden flex items-center justify-center p-4">
        {/* Discount / Category Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 z-10 bg-[#8B3A57] text-[#FAF4F0] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
            {product.discountPercentage}% OFF
          </div>
        )}
        {!product.discountPercentage && product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#423637] text-[#FAF4F0] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            isFavorited
              ? 'bg-[#8B3A57] text-white'
              : 'bg-white/90 text-[#594B49] hover:text-[#8B3A57] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 group-hover:scale-106"
          referrerPolicy="no-referrer"
        />

        {/* Quick View Button (desktop hover) */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleQuickView}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#3D3130] hover:text-[#8B3A57] text-xs font-semibold tracking-wider uppercase rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Tagline */}
          <div className="flex items-center justify-between text-[11px] text-[#8C7A77] tracking-wider uppercase mb-1">
            <span>{product.category}</span>
            {product.selectedVolume && (
              <span className="text-[10px] lowercase text-[#A3928F]">
                {product.selectedVolume.split('/')[0]}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#2E2426] line-clamp-1 group-hover:text-[#8B3A57] transition-colors">
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-[#736361] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-[#E5A83B]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-current"
              />
            ))}
          </div>
          <span className="font-semibold text-[#3D3130] text-[11px] ml-0.5">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-[#8A7976]">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[#F2ECE5] flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-semibold text-[#291F21]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E8E8B] line-through font-normal">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart button matching reference */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#8B3A57] hover:bg-[#722A42] text-white shadow-xs active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
