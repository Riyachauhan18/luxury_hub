'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SlidersHorizontal, Search, X, Check, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { Product, Category, Collection, Brand, WebsiteSettings } from '../lib/types';
import { useEnquiryCart } from '../context/EnquiryCartContext';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUtility } from '../lib/whatsapp';

interface ProductCatalogProps {
  initialProducts: Product[];
  categories: Category[];
  collections: Collection[];
  brands: Brand[];
  settings: WebsiteSettings;
  initialCategorySlug?: string;
  initialCollectionSlug?: string;
  initialBrandSlug?: string;
  initialSearchQuery?: string;
}

export default function ProductCatalog({
  initialProducts,
  categories,
  collections,
  brands,
  settings,
  initialCategorySlug,
  initialCollectionSlug,
  initialBrandSlug,
  initialSearchQuery
}: ProductCatalogProps) {
  const { addToCart, cartItems } = useEnquiryCart();
  const { language, t } = useLanguage();
  const whatsappNumber = settings.whatsapp.number;

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollectionSlug || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrandSlug || 'all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    if (initialCategorySlug) setSelectedCategory(initialCategorySlug);
    if (initialCollectionSlug) setSelectedCollection(initialCollectionSlug);
    if (initialBrandSlug) setSelectedBrand(initialBrandSlug);
    if (initialSearchQuery) setSearchQuery(initialSearchQuery);
  }, [initialCategorySlug, initialCollectionSlug, initialBrandSlug, initialSearchQuery]);

  // 1. DYNAMIC FILTER DATA EXTRACTOR
  // Extract only finishes that actually exist in current products list
  const availableFinishes = useMemo(() => {
    const finishes = new Set<string>();
    initialProducts.forEach(p => {
      if (p.finish) {
        p.finish.split(',').forEach(f => {
          const trimmed = f.trim();
          if (trimmed) finishes.add(trimmed);
        });
      }
      if (p.variants) {
        p.variants.forEach(v => {
          if (v.finish) finishes.add(v.finish.trim());
        });
      }
    });
    return Array.from(finishes).sort();
  }, [initialProducts]);

  // Check if any product actually has a price
  const hasPrices = useMemo(() => {
    return initialProducts.some(p => p.price !== null && !p.contact_for_price);
  }, [initialProducts]);

  // Price range boundaries
  const priceLimits = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    initialProducts.forEach(p => {
      if (p.price !== null && !p.contact_for_price) {
        if (p.price < min) min = p.price;
        if (p.price > max) max = p.price;
      }
    });
    return min === Infinity ? { min: 0, max: 0 } : { min, max };
  }, [initialProducts]);

  const [priceRange, setPriceRange] = useState<number>(priceLimits.max);
  useEffect(() => {
    setPriceRange(priceLimits.max);
  }, [priceLimits]);

  // 2. FILTER & SORT LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.product_code && p.product_code.toLowerCase().includes(q)) ||
        (p.short_description && p.short_description.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q)) ||
        (p.finish && p.finish.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      result = result.filter(p => p.category_id === cat?.id);
    }

    // Collection filter
    if (selectedCollection !== 'all') {
      const col = collections.find(c => c.slug === selectedCollection);
      result = result.filter(p => p.collection_id === col?.id);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      const br = brands.find(b => b.slug === selectedBrand);
      result = result.filter(p => p.brand_id === br?.id);
    }

    // Finish filter
    if (selectedFinish !== 'all') {
      const fLower = selectedFinish.toLowerCase();
      result = result.filter(p => {
        const hasMainFinish = p.finish ? p.finish.toLowerCase().includes(fLower) : false;
        const hasVariantFinish = p.variants ? p.variants.some(v => v.finish && v.finish.toLowerCase() === fLower) : false;
        return hasMainFinish || hasVariantFinish;
      });
    }

    // Price slider filter
    if (hasPrices && priceRange < priceLimits.max) {
      result = result.filter(p => {
        if (p.contact_for_price || p.price === null) return true; // Show contact for price products
        return p.price <= priceRange;
      });
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      });
    } else if (sortBy === 'code_asc') {
      result.sort((a, b) => (a.product_code || '').localeCompare(b.product_code || ''));
    }

    return result;
  }, [
    initialProducts, searchQuery, selectedCategory, selectedCollection,
    selectedBrand, selectedFinish, priceRange, hasPrices, priceLimits, sortBy,
    categories, collections, brands
  ]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedBrand('all');
    setSelectedFinish('all');
    setPriceRange(priceLimits.max);
    setSortBy('default');
  };

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: p.id,
      product_name: p.name,
      product_code: p.product_code,
      quantity: 1,
      variant_finish: p.finish ? p.finish.split(',')[0].trim() : null,
      price: p.price,
      image_url: p.images && p.images.length > 0 ? p.images[0] : null
    });
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some(i => i.product_id === productId);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedCollection !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    if (selectedFinish !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    if (hasPrices && priceRange < priceLimits.max) count++;
    return count;
  }, [selectedCategory, selectedCollection, selectedBrand, selectedFinish, searchQuery, priceRange, hasPrices, priceLimits]);

  return (
    <div className="bg-[#050505] text-[#FDFBF7] min-h-screen py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Title and Top Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 mb-12 gap-6">
          <div className="space-y-2">
            <div className="text-[10px] tracking-[0.2em] font-medium text-[#C5A85C] uppercase">
              THE LUXURY HUB CATALOGUE
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide">
              Our Products
            </h1>
          </div>
          
          {/* Top Row Search */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by code, finish, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0C0C0C] border border-white/5 py-3 pl-4 pr-12 text-sm text-warm-ivory placeholder-neutral-500 rounded-none focus:border-[#C5A85C]/50"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-500 stroke-[1.5]" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-28 bg-[#0C0C0C] border border-white/5 p-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs tracking-widest font-semibold flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-2 text-[#C5A85C]" /> FILTERS
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] tracking-wider text-[#C5A85C] hover:text-white transition-colors cursor-pointer"
                >
                  CLEAR ALL ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-serif text-xs text-neutral-400 tracking-wider uppercase">Categories</h4>
              <div className="flex flex-col space-y-2 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                    selectedCategory === 'all' ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                      selectedCategory === cat.slug ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div className="space-y-3">
              <h4 className="font-serif text-xs text-neutral-400 tracking-wider uppercase">Collections</h4>
              <div className="flex flex-col space-y-2 text-xs">
                <button
                  onClick={() => setSelectedCollection('all')}
                  className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                    selectedCollection === 'all' ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                  }`}
                >
                  All Collections
                </button>
                {collections.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.slug)}
                    className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                      selectedCollection === col.slug ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands (Conditional Rendering) */}
            {brands.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif text-xs text-neutral-400 tracking-wider uppercase">Brands</h4>
                <div className="flex flex-col space-y-2 text-xs">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                      selectedBrand === 'all' ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBrand(b.slug)}
                      className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                        selectedBrand === b.slug ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Finishes (Conditional Rendering) */}
            {availableFinishes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif text-xs text-neutral-400 tracking-wider uppercase">Finishes</h4>
                <div className="flex flex-col space-y-2 text-xs">
                  <button
                    onClick={() => setSelectedFinish('all')}
                    className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                      selectedFinish === 'all' ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    All Finishes
                  </button>
                  {availableFinishes.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`text-left hover:text-[#C5A85C] transition-colors cursor-pointer ${
                        selectedFinish === f ? 'text-[#C5A85C] font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prices (Conditional Rendering) */}
            {hasPrices && priceLimits.max > priceLimits.min && (
              <div className="space-y-4">
                <h4 className="font-serif text-xs text-neutral-400 tracking-wider uppercase">Max Price</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#C5A85C]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 tracking-wider font-semibold">
                    <span>₹{priceLimits.min.toLocaleString('en-IN')}</span>
                    <span>₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* MAIN CATALOG CATALOGUE GRID */}
          <div className="flex-grow w-full space-y-6">
            
            {/* Catalog Info Bar (Result Count & Mobile Filter Trigger) */}
            <div className="flex items-center justify-between border border-white/5 bg-[#0C0C0C] p-4 text-xs">
              <span className="text-neutral-400 font-light">
                Showing <span className="text-white font-semibold">{filteredProducts.length}</span> Products
              </span>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center hover:text-[#C5A85C] transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </button>

                {/* Sorting Select */}
                <div className="flex items-center space-x-2 text-neutral-400">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A85C]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-0 text-xs text-white focus:ring-0 pr-8 py-1 cursor-pointer font-medium tracking-wider"
                  >
                    <option value="default" className="bg-[#0C0C0C]">DEFAULT SORT</option>
                    <option value="price_asc" className="bg-[#0C0C0C]">PRICE: LOW TO HIGH</option>
                    <option value="price_desc" className="bg-[#0C0C0C]">PRICE: HIGH TO LOW</option>
                    <option value="code_asc" className="bg-[#0C0C0C]">PRODUCT CODE</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT CARD GRID */}
            {filteredProducts.length === 0 ? (
              <div className="border border-white/5 bg-[#0C0C0C] py-24 text-center space-y-6">
                <p className="text-neutral-500 text-sm italic">No products found matching your active filter criteria.</p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-transparent border border-[#C5A85C] text-[#C5A85C] hover:bg-[#C5A85C] hover:text-[#050505] transition-all duration-300 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const image = p.images && p.images.length > 0 ? p.images[0] : '/placeholder_product.jpg';
                  const inCart = isProductInCart(p.id);

                  return (
                    <div 
                      key={p.id} 
                      className="group border border-white/5 bg-[#0C0C0C] flex flex-col h-full hover:border-[#C5A85C]/20 transition-all duration-500"
                    >
                      {/* Image block */}
                      <Link href={`/products/${p.slug}`} className="relative h-80 w-full overflow-hidden block">
                        <Image
                          src={image}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                        
                        {/* Overlay Cart Button */}
                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          className={`absolute top-4 right-4 p-3 rounded-none shadow-xl border cursor-pointer transition-all duration-300 ${
                            inCart 
                              ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                              : 'bg-[#050505]/80 border-white/10 text-white hover:bg-[#C5A85C] hover:border-[#C5A85C] hover:text-[#050505]'
                          }`}
                          title="Add to enquiry list"
                        >
                          <ShoppingBag className="w-4 h-4 stroke-[2]" />
                        </button>
                      </Link>

                      {/* Info details */}
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[9px] tracking-wider text-neutral-500 uppercase">
                            <span>{p.category_name}</span>
                            {p.product_code && <span className="font-semibold text-neutral-400">{p.product_code}</span>}
                          </div>
                          <h3 className="font-serif text-lg text-neutral-200 line-clamp-1 group-hover:text-[#C5A85C] transition-colors tracking-wide">
                            <Link href={`/products/${p.slug}`}>
                              {(language === 'hi' && p.name_hi) ? p.name_hi : p.name}
                            </Link>
                          </h3>
                          {p.short_description && (
                            <p className="text-[11px] leading-relaxed text-neutral-500 font-light line-clamp-2">
                              {p.short_description}
                            </p>
                          )}
                        </div>

                        {/* CTAs */}
                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-[#C5A85C] font-semibold tracking-wider">
                            {p.contact_for_price 
                              ? 'Contact for Price' 
                              : `₹${p.price?.toLocaleString('en-IN')}`}
                          </span>
                          
                          <div className="flex items-center space-x-4">
                            <Link 
                              href={`/products/${p.slug}`} 
                              className="text-[10px] tracking-widest font-semibold hover:text-[#C5A85C] transition-colors uppercase"
                            >
                              VIEW DETAILS
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTERS OVERLAY DRAWSER */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-[#050505]/95 z-50 overflow-y-auto p-6 animate-fade-in lg:hidden">
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
            <span className="text-sm font-semibold tracking-widest flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-[#C5A85C]" /> Filters ({activeFiltersCount})
            </span>
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="space-y-8 pb-12">
            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Categories</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 border text-xs tracking-wider ${
                    selectedCategory === 'all' 
                      ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                      : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 border text-xs tracking-wider ${
                      selectedCategory === cat.slug 
                        ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                        : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Collections</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCollection('all')}
                  className={`px-3 py-1.5 border text-xs tracking-wider ${
                    selectedCollection === 'all' 
                      ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                      : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                  }`}
                >
                  All Collections
                </button>
                {collections.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.slug)}
                    className={`px-3 py-1.5 border text-xs tracking-wider ${
                      selectedCollection === col.slug 
                        ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                        : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Finishes */}
            {availableFinishes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Finishes</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFinish('all')}
                    className={`px-3 py-1.5 border text-xs tracking-wider ${
                      selectedFinish === 'all' 
                        ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                        : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                    }`}
                  >
                    All Finishes
                  </button>
                  {availableFinishes.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`px-3 py-1.5 border text-xs tracking-wider ${
                        selectedFinish === f 
                          ? 'bg-[#C5A85C] border-[#C5A85C] text-[#050505]' 
                          : 'border-white/5 bg-[#0C0C0C] text-neutral-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prices */}
            {hasPrices && priceLimits.max > priceLimits.min && (
              <div className="space-y-4">
                <h4 className="font-serif text-sm text-[#C5A85C] tracking-wide uppercase">Max Price</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#C5A85C]"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 font-semibold tracking-wider">
                    <span>₹{priceLimits.min.toLocaleString('en-IN')}</span>
                    <span>₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Apply & Close */}
            <div className="pt-8 flex gap-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-4 bg-[#C5A85C] text-[#050505] font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] cursor-pointer"
              >
                APPLY FILTERS
              </button>
              <button
                onClick={() => {
                  handleClearFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full py-4 bg-transparent border border-white/10 text-white font-medium text-xs tracking-widest uppercase"
              >
                CLEAR ALL
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
