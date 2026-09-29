'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageSquare, Download, Check, AlertCircle, ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Heart } from 'lucide-react';
import { Product, ProductVariant, WebsiteSettings } from '../lib/types';
import { useEnquiryCart } from '../context/EnquiryCartContext';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUtility } from '../lib/whatsapp';
import TechnicalSpecBadges from './TechnicalSpecBadges';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  settings: WebsiteSettings;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  settings
}: ProductDetailClientProps) {
  const { addToCart, cartItems } = useEnquiryCart();
  const { language, t } = useLanguage();
  const whatsappNumber = settings.whatsapp.number;

  // Localized title & description fallback
  const displayName = (language === 'hi' && product.name_hi) ? product.name_hi : product.name;
  const displayDesc = (language === 'hi' && product.description_hi) ? product.description_hi : product.description;

  // Variant & Quantity States
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants![0] : null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Zoom Effect State
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const containerRef = useRef<HTMLDivElement>(null);

  // Set body data attributes for the global floating WhatsApp button
  useEffect(() => {
    document.body.setAttribute('data-product-name', displayName);
    document.body.setAttribute('data-product-code', product.product_code || '');
    return () => {
      document.body.removeAttribute('data-product-name');
      document.body.removeAttribute('data-product-code');
    };
  }, [displayName, product]);

  // Image assets list
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/placeholder_product.jpg'];

  // Current display details based on selected variant
  const currentPrice = selectedVariant && selectedVariant.price !== null
    ? selectedVariant.price
    : product.price;

  const currentContactForPrice = selectedVariant 
    ? selectedVariant.price === null 
    : product.contact_for_price;

  const currentAvailability = selectedVariant
    ? selectedVariant.is_available
    : product.is_available;

  const currentFinish = selectedVariant && selectedVariant.finish
    ? selectedVariant.finish
    : product.finish;

  // Zoom magnifier calculation on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${images[activeImageIdx]})`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Add item to Enquiry Cart
  const handleAddToEnquiry = () => {
    addToCart({
      product_id: product.id,
      product_name: displayName,
      product_code: product.product_code,
      quantity,
      variant_finish: currentFinish ? currentFinish.split(',')[0].trim() : null,
      price: currentPrice,
      image_url: images[0]
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // WhatsApp Enquiry Link matching active language
  const enquiryWhatsAppLink = whatsappUtility.getProductLink(
    whatsappNumber,
    displayName,
    product.product_code,
    currentFinish,
    language
  );

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[10px] tracking-widest text-neutral-500 uppercase mb-12 flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">PRODUCTS</Link>
          <span>/</span>
          <span className="text-neutral-300 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          
          {/* LEFT COLUMN: MULTIPLE IMAGE GALLERY WITH ZOOM */}
          <div className="space-y-4">
            
            {/* Active Display Image Panel */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-[450px] md:h-[600px] w-full border border-white/5 bg-[#0C0C0C] overflow-hidden group cursor-zoom-in"
            >
              <Image
                src={images[activeImageIdx]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                priority
              />

              {/* Magnifier zoom background */}
              <div 
                style={zoomStyle}
                className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none"
              />

              {/* Fullscreen Button */}
              <button 
                onClick={() => setShowLightbox(true)}
                className="absolute bottom-4 right-4 p-3 bg-[#050505]/80 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer hover:scale-105"
                title="Open fullscreen view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails Navigation Row */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto py-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-20 h-20 border shrink-0 cursor-pointer transition-all ${
                      activeImageIdx === i 
                        ? 'border-[#C5A85C]' 
                        : 'border-white/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DETAILED INFO PANEL */}
          <div className="space-y-8">
            
            {/* Title, Code, and Categories */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] tracking-[0.2em] font-medium text-neutral-500 uppercase">
                <span>{product.category_name || 'Premium fitting'}</span>
                {product.product_code && (
                  <span className="font-semibold text-neutral-400">CODE: {product.product_code}</span>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-white leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-6 pt-4 border-b border-white/5 pb-6">
                {/* Dynamic Price */}
                <span className="text-2xl font-serif text-[#C5A85C] font-light">
                  {currentContactForPrice 
                    ? 'Contact for Price' 
                    : `₹${currentPrice?.toLocaleString('en-IN')}`}
                </span>

                {/* Stock Indicator */}
                <span className="flex items-center text-[10px] tracking-wider uppercase font-semibold">
                  <span className={`w-2 h-2 rounded-full mr-2 ${currentAvailability ? 'bg-[#25D366]' : 'bg-red-500'}`} />
                  {currentAvailability ? 'IN STOCK' : 'OUT OF STOCK'}
                </span>
              </div>
            </div>

            {/* Short description */}
            {product.short_description && (
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                {product.short_description}
              </p>
            )}

            {/* 1. SELECT FINISH (PRODUCT VARIANTS SELECTOR) */}
            {hasVariants && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <span className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                  SELECT FINISH
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variants!.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? 'border-[#C5A85C] text-[#C5A85C] bg-[#C5A85C]/5 font-semibold'
                          : 'border-white/5 bg-[#0C0C0C] text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      {v.finish || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
              <span className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                QUANTITY
              </span>
              <div className="flex items-center border border-white/5 bg-[#0C0C0C] text-sm">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 hover:text-[#C5A85C] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-white font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 hover:text-[#C5A85C] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Quality & Specification Badges */}
            <TechnicalSpecBadges />

            {/* PRIMARY CALL-TO-ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={enquiryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> {t('btn.enquire_whatsapp')}
              </a>
              
              <button
                onClick={handleAddToEnquiry}
                className={`flex-grow py-4 border transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer ${
                  isAdded 
                    ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                    : 'bg-transparent border-white/20 text-white hover:border-[#C5A85C] hover:text-[#C5A85C]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> {t('btn.added_to_enquiry')}
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" /> {t('btn.add_to_enquiry')}
                  </>
                )}
              </button>
            </div>

            {/* 2. DOWNLOAD CATALOGUE (CONDITIONAL UPLOAD) */}
            {product.pdf_url && (
              <div className="pt-4">
                <a
                  href={product.pdf_url}
                  download
                  className="inline-flex items-center text-xs tracking-widest font-semibold text-[#C5A85C] hover:text-white transition-colors uppercase cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" /> DOWNLOAD CATALOGUE PDF
                </a>
              </div>
            )}

            {/* specifications Accordion */}
            <div className="border-t border-white/5 pt-8 space-y-6">
              {product.description && (
                <div className="space-y-2">
                  <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Details & Story</h4>
                  <p className="text-xs leading-relaxed text-neutral-400 font-light">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Technical Specifications Grid */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Technical Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-neutral-500 font-light">{spec.key}</span>
                        <span className="text-neutral-300 font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions, Material, Finish details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs border-b border-white/5 pb-6">
                {product.material && (
                  <div className="space-y-1">
                    <h5 className="font-semibold text-neutral-400">MATERIAL</h5>
                    <p className="text-neutral-500 font-light">{product.material}</p>
                  </div>
                )}
                {currentFinish && (
                  <div className="space-y-1">
                    <h5 className="font-semibold text-neutral-400">FINISH</h5>
                    <p className="text-neutral-500 font-light">{currentFinish}</p>
                  </div>
                )}
                {product.dimensions && (
                  <div className="space-y-1">
                    <h5 className="font-semibold text-neutral-400">DIMENSIONS</h5>
                    <p className="text-neutral-500 font-light">{product.dimensions}</p>
                  </div>
                )}
              </div>

              {/* Features bullets */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Key Features</h4>
                  <ul className="list-disc pl-5 text-xs text-neutral-400 space-y-1.5 font-light">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/5 pt-16 space-y-10">
            <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-center">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => {
                const img = p.images && p.images.length > 0 ? p.images[0] : '/placeholder_product.jpg';
                return (
                  <div 
                    key={p.id} 
                    className="group border border-white/5 bg-[#0C0C0C] flex flex-col h-full hover:border-[#C5A85C]/20 transition-all duration-500"
                  >
                    <Link href={`/products/${p.slug}`} className="relative h-64 w-full overflow-hidden block">
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-750 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                    </Link>

                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div className="space-y-1">
                        <span className="text-[8px] tracking-wider text-neutral-500 uppercase">{p.category_name}</span>
                        <h3 className="font-serif text-base text-neutral-200 line-clamp-1 group-hover:text-[#C5A85C] transition-colors tracking-wide">
                          <Link href={`/products/${p.slug}`}>{p.name}</Link>
                        </h3>
                      </div>
                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-[#C5A85C] font-semibold">
                          {p.contact_for_price ? 'Contact for Price' : `₹${p.price?.toLocaleString('en-IN')}`}
                        </span>
                        <Link 
                          href={`/products/${p.slug}`}
                          className="text-[9px] tracking-widest font-semibold hover:text-[#C5A85C] transition-colors uppercase"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <Maximize2 className="w-8 h-8 rotate-45" />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={images[activeImageIdx]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              {/* Prev */}
              <button
                onClick={() => setActiveImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-900 border border-white/10 text-white hover:border-[#C5A85C] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              {/* Next */}
              <button
                onClick={() => setActiveImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-900 border border-white/10 text-white hover:border-[#C5A85C] transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
