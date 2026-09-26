import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Sparkles,
  Share2,
  ChevronDown,
  Info,
  Layers,
  Sparkle
} from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setActiveView
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState<string>(
    product.selectedVolume || (product.volumeOptions ? product.volumeOptions[0] : '')
  );
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('benefits');

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Keep state synchronized whenever product prop changes
  useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    setSelectedVolume(product.selectedVolume || (product.volumeOptions ? product.volumeOptions[0] : ''));
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const currentImageIndex = galleryImages.indexOf(selectedImage);

  const handleNextImage = () => {
    if (galleryImages.length <= 1) return;
    const nextIdx = (currentImageIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIdx]);
  };

  const handlePrevImage = () => {
    if (galleryImages.length <= 1) return;
    const prevIdx = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIdx]);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVolume);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVolume);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(prev => (prev === name ? null : name));
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#7A6B69] mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => {
              setSelectedProduct(null);
              setActiveView('home');
            }}
            className="hover:text-[#8B3A57] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA5]" />
          <button
            onClick={() => setSelectedProduct(null)}
            className="hover:text-[#8B3A57] transition-colors"
          >
            Shop All
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA5]" />
          <span className="text-[#8B3A57] font-medium">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA5]" />
          <span className="text-[#2B2324] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Back to Catalog button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#665452] hover:text-[#8B3A57] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        {/* Main Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DFD7] shadow-sm">
          
          {/* Left Gallery Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image */}
            <div className="group relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F4F0] border border-[#EAE1D8] flex items-center justify-center p-6">
              {product.discountPercentage && (
                <span className="absolute top-4 left-4 z-10 bg-[#8B3A57] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  {product.discountPercentage}% OFF
                </span>
              )}

              {/* View type badge */}
              <div className="absolute top-4 left-4 sm:left-auto sm:right-16 z-10 bg-white/90 backdrop-blur-xs text-[#524544] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#E2D8CF] shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A57]" />
                <span>
                  {currentImageIndex === 0
                    ? 'Packshot & Packaging'
                    : currentImageIndex === 1
                    ? 'Formula & Texture Swatch'
                    : `Detail View ${currentImageIndex + 1}`}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                  isFavorited
                    ? 'bg-[#8B3A57] text-white'
                    : 'bg-white text-[#524544] hover:text-[#8B3A57]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              {/* Main Image */}
              <img
                src={selectedImage}
                alt={`${product.name} - view ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-xl transition-all duration-300 drop-shadow-md select-none"
                referrerPolicy="no-referrer"
              />

              {/* Gallery Arrow Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#382C2E] hover:text-[#8B3A57] flex items-center justify-center shadow-md transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#382C2E] hover:text-[#8B3A57] flex items-center justify-center shadow-md transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image pagination dots */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(galleryImages[i])}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentImageIndex === i ? 'w-6 bg-[#8B3A57]' : 'w-2 bg-[#D1C4BC] hover:bg-[#8B3A57]/60'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Carousel with Labels */}
            {galleryImages.length > 1 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#695856] block">
                  Product Gallery & Swatches ({galleryImages.length} views):
                </span>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`flex items-center gap-2.5 p-1.5 rounded-xl bg-[#FAF8F5] border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImage === img
                          ? 'border-[#8B3A57] bg-white ring-2 ring-[#8B3A57]/15 shadow-xs'
                          : 'border-[#EAE1D8] hover:border-[#8B3A57] hover:bg-white'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0 border border-[#EBE2DA]">
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left pr-2">
                        <span className="text-[11px] font-bold text-[#2E2426] block">
                          {idx === 0 ? 'Product Packshot' : idx === 1 ? 'Formula Swatch' : `View ${idx + 1}`}
                        </span>
                        <span className="text-[10px] text-[#8A7976]">
                          {idx === 0 ? 'Studio presentation' : idx === 1 ? 'Texture & active finish' : 'Angle view'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clean Beauty Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 text-center text-xs text-[#736361]">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE7E0]">
                <Sparkles className="w-4 h-4 text-[#8B3A57] mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-[#291F21]">100% Clean</span>
                <span className="text-[10px]">Toxin-Free</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE7E0]">
                <ShieldCheck className="w-4 h-4 text-[#8B3A57] mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-[#291F21]">Clinically Tested</span>
                <span className="text-[10px]">By Estheticians</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE7E0]">
                <RotateCcw className="w-4 h-4 text-[#8B3A57] mx-auto mb-1" />
                <span className="font-semibold block text-[11px] text-[#291F21]">Glass Bottle</span>
                <span className="text-[10px]">Eco-Certified</span>
              </div>
            </div>
          </div>

          {/* Right Purchase Module (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header / Titles */}
            <div className="space-y-2 border-b border-[#F0E6DE] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8B3A57]">
                  {product.category}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock & Ready to Ship
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#261E20] font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#736361] font-light">
                {product.tagline}
              </p>

              {/* Rating & reviews counter */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex text-[#E5A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#291F21]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#8C7A77]">
                  · based on {product.reviewCount} customer reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-3xl font-semibold text-[#291F21]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9E8E8B] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-[#8B3A57] bg-[#F7EDF0] px-2.5 py-1 rounded-full">
                    Save ${product.originalPrice ? product.originalPrice - product.price : 10} ({product.discountPercentage}%)
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#574846] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Volume / Size Selector */}
            {product.volumeOptions && product.volumeOptions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#4A3E3D]">
                    Size / Volume:
                  </span>
                  <span className="text-[#8B3A57] font-medium">{selectedVolume}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.volumeOptions.map(vol => (
                    <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-4 py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                        selectedVolume === vol
                          ? 'border-[#8B3A57] bg-[#F7EDF0] text-[#8B3A57] shadow-xs'
                          : 'border-[#D9CBC2] bg-white text-[#524544] hover:border-[#8B3A57]'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#D9CBC2] rounded-xl overflow-hidden bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-[#524544] hover:bg-[#EBE2DA] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-semibold text-[#291F21]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-[#524544] hover:bg-[#EBE2DA] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#8B3A57] hover:bg-[#722A42] text-white'
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
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-[0.2em] bg-[#2D1620] hover:bg-[#472635] text-white shadow-sm transition-all cursor-pointer active:scale-98"
              >
                Instant Buy with 1-Click Checkout
              </button>
            </div>

            {/* Accordions for Ingredients, Benefits, How to Use, Shipping */}
            <div className="pt-4 border-t border-[#F0E6DE] divide-y divide-[#F0E6DE]">
              
              {/* Clinical Benefits */}
              <div>
                <button
                  onClick={() => toggleAccordion('benefits')}
                  className="w-full py-3 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#2E2426] hover:text-[#8B3A57]"
                >
                  <span>Clinically Proven Benefits</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'benefits' ? 'rotate-180 text-[#8B3A57]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'benefits' && (
                  <div className="pb-4 space-y-2 text-xs text-[#574846] leading-relaxed">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#8B3A57] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Ingredients */}
              <div>
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full py-3 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#2E2426] hover:text-[#8B3A57]"
                >
                  <span>Full Ingredients List & Actives</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'ingredients' ? 'rotate-180 text-[#8B3A57]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="pb-4 space-y-2 text-xs text-[#574846] leading-relaxed">
                    <p className="font-medium text-[#291F21]">Key Botanical Extracts:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-[#8C7A77] pt-2">
                      Formulated without parabens, sulfates (SLS/SLES), phthalates, synthetic fragrances, or mineral oil.
                    </p>
                  </div>
                )}
              </div>

              {/* How To Use */}
              <div>
                <button
                  onClick={() => toggleAccordion('usage')}
                  className="w-full py-3 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#2E2426] hover:text-[#8B3A57]"
                >
                  <span>Ritual Instructions / How To Use</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'usage' ? 'rotate-180 text-[#8B3A57]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'usage' && (
                  <div className="pb-4 text-xs text-[#574846] leading-relaxed">
                    <p>{product.howToUse}</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#2E2426] hover:text-[#8B3A57]"
                >
                  <span>Complimentary Shipping & Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180 text-[#8B3A57]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 space-y-2 text-xs text-[#574846] leading-relaxed">
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8B3A57]" />
                      <span>Complimentary standard shipping on all orders over $50 (2–4 business days).</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#8B3A57]" />
                      <span>30-day risk-free return guarantee. If your skin doesn't love it, we refund your order.</span>
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Customer Reviews for this Product */}
        <div className="mt-16 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DFD7] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F0E6DE] gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3A57]">
                Customer Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#261E20] mt-1">
                Verified Reviews & Results ({product.reviewCount})
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-serif text-2xl font-bold text-[#291F21]">
                {product.rating}
              </span>
              <span className="text-xs text-[#8A7976]">
                / 5.0 overall satisfaction
              </span>
            </div>
          </div>

          {/* Testimonial Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE7E0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#291F21]">Sophia L.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#574846] leading-relaxed italic">
                "Exceeded every expectation. The texture is breathtaking, absorbs so cleanly, and my skin felt transformed within days."
              </p>
              <span className="text-[10px] text-[#8C7A77] block">Skin type: Sensitive / Combination</span>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE7E0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#291F21]">Claire M.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#574846] leading-relaxed italic">
                "Pure luxury without the harsh synthetic chemicals. The aesthetic of the bottle on my vanity is gorgeous too!"
              </p>
              <span className="text-[10px] text-[#8C7A77] block">Skin type: Dry / Mature</span>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE7E0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#291F21]">Elena R.</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Verified Buyer
                </span>
              </div>
              <div className="flex text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#574846] leading-relaxed italic">
                "Will continue repurchasing. It pairs so effortlessly under makeup and never pills or feels heavy throughout the day."
              </p>
              <span className="text-[10px] text-[#8C7A77] block">Skin type: Normal / Dehydrated</span>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B3A57]">
                Complete The Regimen
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#261E20] mt-1">
                Complementary Formulas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
