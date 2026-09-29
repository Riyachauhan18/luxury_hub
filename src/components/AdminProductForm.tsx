'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft, Save, Upload, Check } from 'lucide-react';
import { Product, Category, Collection, Brand, ProductVariant, ProductSpecification } from '../lib/types';
import { createProductAction, updateProductAction } from '../app/actions';
import { generateSlug } from '../lib/db';

interface AdminProductFormProps {
  initialProduct?: Product;
  categories: Category[];
  collections: Collection[];
  brands: Brand[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-sanitaryware', name: 'Sanitaryware', slug: 'sanitaryware', description: null, image_url: null, display_order: 1, is_active: true },
  { id: 'cat-faucets', name: 'Faucets & Mixers', slug: 'faucets-mixers', description: null, image_url: null, display_order: 2, is_active: true },
  { id: 'cat-rainshowers', name: 'Rain Showers & Systems', slug: 'rain-showers-systems', description: null, image_url: null, display_order: 3, is_active: true },
  { id: 'cat-chandeliers', name: 'Chandeliers & Lighting', slug: 'chandeliers-lighting', description: null, image_url: null, display_order: 4, is_active: true },
  { id: 'cat-wellness', name: 'Wellness & Saunas', slug: 'wellness-saunas', description: null, image_url: null, display_order: 5, is_active: true },
  { id: 'cat-mirrors', name: 'Luxury Mirrors', slug: 'luxury-mirrors', description: null, image_url: null, display_order: 6, is_active: true },
  { id: 'cat-hardware', name: 'Hardware & Handles', slug: 'hardware-handles', description: null, image_url: null, display_order: 7, is_active: true },
  { id: 'cat-accessories', name: 'Bath Accessories', slug: 'bath-accessories', description: null, image_url: null, display_order: 8, is_active: true }
];

const DEFAULT_BRANDS: Brand[] = [
  { id: 'brand-gessi', name: 'Gessi', slug: 'gessi', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-kohler', name: 'Kohler', slug: 'kohler', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-toto', name: 'Toto', slug: 'toto', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-grohe', name: 'Grohe', slug: 'grohe', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-axor', name: 'Axor', slug: 'axor', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-hansgrohe', name: 'Hansgrohe', slug: 'hansgrohe', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-dornbracht', name: 'Dornbracht', slug: 'dornbracht', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true },
  { id: 'brand-villeroy', name: 'Villeroy & Boch', slug: 'villeroy-boch', description: null, logo_url: null, banner_url: null, website_url: null, is_active: true }
];

const DEFAULT_COLLECTIONS: Collection[] = [
  { id: 'col-heritage', name: 'Royal Heritage & Gold', slug: 'royal-heritage-gold', description: null, image_url: null, is_featured: false, is_active: true },
  { id: 'col-minimalist', name: 'Minimalist Obsidian', slug: 'minimalist-obsidian', description: null, image_url: null, is_featured: false, is_active: true },
  { id: 'col-crystal', name: 'Crystal Masterpiece', slug: 'crystal-masterpiece', description: null, image_url: null, is_featured: false, is_active: true },
  { id: 'col-vintage', name: 'Vintage Classic', slug: 'vintage-classic', description: null, image_url: null, is_featured: false, is_active: true }
];

export default function AdminProductForm({
  initialProduct,
  categories,
  collections,
  brands
}: AdminProductFormProps) {
  const isEditing = !!initialProduct;
  const router = useRouter();

  const activeCategories = (categories && categories.length > 0) ? categories : DEFAULT_CATEGORIES;
  const activeBrands = (brands && brands.length > 0) ? brands : DEFAULT_BRANDS;
  const activeCollections = (collections && collections.length > 0) ? collections : DEFAULT_COLLECTIONS;

  // Basic Info State
  const [name, setName] = useState(initialProduct?.name || '');
  const [productCode, setProductCode] = useState(initialProduct?.product_code || '');
  const [slug, setSlug] = useState(initialProduct?.slug || '');
  
  const [categoryId, setCategoryId] = useState(initialProduct?.category_id || (activeCategories[0]?.id || ''));
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const [collectionId, setCollectionId] = useState(initialProduct?.collection_id || '');
  const [useCustomCollection, setUseCustomCollection] = useState(false);
  const [customCollection, setCustomCollection] = useState('');

  const [brandId, setBrandId] = useState(initialProduct?.brand_id || '');
  const [useCustomBrand, setUseCustomBrand] = useState(false);
  const [customBrand, setCustomBrand] = useState('');

  const [price, setPrice] = useState<string>(initialProduct?.price !== null && initialProduct?.price !== undefined ? String(initialProduct.price) : '');
  const [contactForPrice, setContactForPrice] = useState(initialProduct?.contact_for_price ?? true);
  const [shortDescription, setShortDescription] = useState(initialProduct?.short_description || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [material, setMaterial] = useState(initialProduct?.material || '');
  const [finish, setFinish] = useState(initialProduct?.finish || '');
  const [dimensions, setDimensions] = useState(initialProduct?.dimensions || '');
  const [pdfUrl, setPdfUrl] = useState(initialProduct?.pdf_url || '');
  const [isFeatured, setIsFeatured] = useState(initialProduct?.is_featured || false);
  const [isAvailable, setIsAvailable] = useState(initialProduct?.is_available ?? true);
  const [status, setStatus] = useState<'published' | 'draft'>(initialProduct?.status || 'published');

  // Dynamic Lists State
  const [images, setImages] = useState<string[]>(initialProduct?.images || ['']);
  const [features, setFeatures] = useState<string[]>(initialProduct?.features || ['']);
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(
    initialProduct?.specifications || [{ key: '', value: '' }]
  );
  const [variants, setVariants] = useState<Omit<ProductVariant, 'id' | 'product_id'>[]>(
    initialProduct?.variants ? initialProduct.variants.map(v => ({
      name: v.name,
      sku: v.sku,
      finish: v.finish,
      price: v.price,
      is_available: v.is_available,
      display_order: v.display_order
    })) : []
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto generate slug if name changes
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing || !slug) {
      setSlug(generateSlug(val));
    }
  };

  // PDF File Upload Handler
  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setPdfUrl(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Device File Upload Handler (Phone Gallery / Downloads / PC Explorer)
  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        updateImageInput(index, base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Image handlers
  const addImageInput = () => setImages(prev => [...prev, '']);
  const updateImageInput = (index: number, val: string) => {
    const updated = [...images];
    updated[index] = val;
    setImages(updated);
  };
  const removeImageInput = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Feature handlers
  const addFeatureInput = () => setFeatures(prev => [...prev, '']);
  const updateFeatureInput = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };
  const removeFeatureInput = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  // Spec handlers
  const addSpecInput = () => setSpecifications(prev => [...prev, { key: '', value: '' }]);
  const updateSpecInput = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specifications];
    updated[index][field] = val;
    setSpecifications(updated);
  };
  const removeSpecInput = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  // Variant handlers
  const addVariantInput = () => {
    setVariants(prev => [...prev, {
      name: '',
      sku: '',
      finish: '',
      price: price ? Number(price) : null,
      is_available: true,
      display_order: prev.length + 1
    }]);
  };
  const updateVariantInput = (index: number, field: string, val: any) => {
    const updated = [...variants];
    (updated[index] as any)[field] = val;
    setVariants(updated);
  };
  const removeVariantInput = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent, targetStatus?: 'published' | 'draft') => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Product Name is required.');
      return;
    }

    setSaving(true);
    const chosenStatus = targetStatus || status;

    const productPayload: Omit<Product, 'id' | 'images' | 'variants'> = {
      name: name.trim(),
      product_code: productCode.trim() || null,
      slug: slug.trim() || generateSlug(name),
      category_id: categoryId || null,
      brand_id: brandId || null,
      collection_id: collectionId || null,
      price: price ? Number(price) : null,
      contact_for_price: contactForPrice,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      material: material.trim() || null,
      finish: finish.trim() || null,
      dimensions: dimensions.trim() || null,
      specifications: specifications.filter(s => s.key.trim() !== ''),
      features: features.filter(f => f.trim() !== ''),
      pdf_url: pdfUrl.trim() || null,
      is_featured: isFeatured,
      is_available: isAvailable,
      status: chosenStatus
    };

    const cleanImages = images.filter(img => img.trim() !== '');

    try {
      let res;
      if (isEditing && initialProduct) {
        res = await updateProductAction(initialProduct.id, productPayload, cleanImages, variants);
      } else {
        res = await createProductAction(productPayload, cleanImages, variants);
      }

      if (res.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(res.error || 'Failed to save product.');
      }
    } catch (err: any) {
      console.error('Product save error:', err);
      setError('Failed to save product. Check required fields or authorization.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-12 max-w-5xl font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <Link href="/admin/products" className="text-xs text-neutral-400 hover:text-[#C5A85C] transition-colors flex items-center font-semibold mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO PRODUCTS
          </Link>
          <h1 className="font-serif text-3xl font-light tracking-wide text-white">
            {isEditing ? `Edit Product: ${initialProduct.name}` : 'Add New Product'}
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={saving}
            className="px-6 py-3 bg-neutral-900 border border-white/10 text-neutral-300 hover:border-white/30 transition-all font-semibold text-xs tracking-widest uppercase cursor-pointer"
          >
            SAVE DRAFT
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all font-semibold text-xs tracking-widest uppercase cursor-pointer shadow-lg disabled:opacity-50"
          >
            {saving ? 'SAVING...' : 'PUBLISH PRODUCT'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs">
          {error}
        </div>
      )}

      {/* SECTION 1: BASIC INFORMATION */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4">
          1. Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              PRODUCT NAME *
            </label>
            <input
              type="text"
              required
              placeholder="E.g. Luxury Gold Basin Mixer"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              PRODUCT CODE
            </label>
            <input
              type="text"
              placeholder="E.g. TLH-BSN-001"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              SEO URL SLUG
            </label>
            <input
              type="text"
              required
              placeholder="luxury-gold-basin-mixer"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                CATEGORY *
              </label>
              <button
                type="button"
                onClick={() => setUseCustomCategory(!useCustomCategory)}
                className="text-[10px] text-[#C5A85C] hover:text-white underline uppercase cursor-pointer"
              >
                {useCustomCategory ? '📋 Select from List' : '✏️ Type Custom Category'}
              </button>
            </div>
            {useCustomCategory ? (
              <input
                type="text"
                placeholder="Type custom category (e.g. Jacuzzi, Sensor Taps...)"
                value={customCategory}
                onChange={(e) => {
                  setCustomCategory(e.target.value);
                  setCategoryId(e.target.value ? `custom-${generateSlug(e.target.value)}` : '');
                }}
                className="w-full text-xs p-3.5 bg-[#050505] border border-[#C5A85C]/40 text-warm-ivory rounded-none"
              />
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none cursor-pointer"
              >
                {activeCategories.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#0C0C0C]">{c.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                COLLECTION
              </label>
              <button
                type="button"
                onClick={() => setUseCustomCollection(!useCustomCollection)}
                className="text-[10px] text-[#C5A85C] hover:text-white underline uppercase cursor-pointer"
              >
                {useCustomCollection ? '📋 Select from List' : '✏️ Type Custom Collection'}
              </button>
            </div>
            {useCustomCollection ? (
              <input
                type="text"
                placeholder="Type custom collection name..."
                value={customCollection}
                onChange={(e) => {
                  setCustomCollection(e.target.value);
                  setCollectionId(e.target.value ? `col-${generateSlug(e.target.value)}` : '');
                }}
                className="w-full text-xs p-3.5 bg-[#050505] border border-[#C5A85C]/40 text-warm-ivory rounded-none"
              />
            ) : (
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none cursor-pointer"
              >
                <option value="" className="bg-[#0C0C0C]">None (General Catalog)</option>
                {activeCollections.map(col => (
                  <option key={col.id} value={col.id} className="bg-[#0C0C0C]">{col.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                BRAND
              </label>
              <button
                type="button"
                onClick={() => setUseCustomBrand(!useCustomBrand)}
                className="text-[10px] text-[#C5A85C] hover:text-white underline uppercase cursor-pointer"
              >
                {useCustomBrand ? '📋 Select from List' : '✏️ Type Custom Brand'}
              </button>
            </div>
            {useCustomBrand ? (
              <input
                type="text"
                placeholder="Type custom brand name (e.g. Kohler, Dornbracht...)"
                value={customBrand}
                onChange={(e) => {
                  setCustomBrand(e.target.value);
                  setBrandId(e.target.value ? `brand-${generateSlug(e.target.value)}` : '');
                }}
                className="w-full text-xs p-3.5 bg-[#050505] border border-[#C5A85C]/40 text-warm-ivory rounded-none"
              />
            ) : (
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none cursor-pointer"
              >
                <option value="" className="bg-[#0C0C0C]">None (THE LUXURY HUB Direct)</option>
                {activeBrands.map(b => (
                  <option key={b.id} value={b.id} className="bg-[#0C0C0C]">{b.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
            SHORT DESCRIPTION
          </label>
          <input
            type="text"
            placeholder="A single line executive summary of the product..."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
            FULL DESCRIPTION
          </label>
          <textarea
            rows={4}
            placeholder="Detailed architectural story and craftsmanship features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
          />
        </div>
      </div>

      {/* SECTION 2: PRICING & STATUS */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4">
          2. Pricing & Availability Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              PRICE (₹)
            </label>
            <input
              type="number"
              placeholder="18500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory rounded-none"
            />
          </div>

          <div className="space-y-4 pt-4">
            <label className="flex items-center space-x-3 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={contactForPrice}
                onChange={(e) => setContactForPrice(e.target.checked)}
                className="w-4 h-4 accent-[#C5A85C]"
              />
              <span className="text-neutral-300 font-medium">Display &quot;Contact for Price&quot; instead of numerical price</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#C5A85C]"
              />
              <span className="text-neutral-300 font-medium">Mark as Featured Product on Homepage</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 accent-[#C5A85C]"
              />
              <span className="text-neutral-300 font-medium">In Stock & Available</span>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 3: PRODUCT VARIANTS (SELECT FINISH) */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div>
            <h3 className="font-serif text-xl font-light text-white">
              3. Finish Variants
            </h3>
            <p className="text-xs text-neutral-500 font-light">E.g. Chrome, Matte Black, Brushed Gold.</p>
          </div>
          <button
            type="button"
            onClick={addVariantInput}
            className="text-xs text-[#C5A85C] hover:text-white flex items-center font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" /> ADD VARIANT
          </button>
        </div>

        {variants.length === 0 ? (
          <p className="text-xs text-neutral-500 italic">No custom variants added. The default finish will be used.</p>
        ) : (
          <div className="space-y-4">
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-white/5 bg-[#050505] items-center">
                <input
                  type="text"
                  placeholder="Finish Name (e.g. Matte Black)"
                  value={v.finish || v.name}
                  onChange={(e) => updateVariantInput(i, 'finish', e.target.value)}
                  className="text-xs p-2.5 bg-[#0C0C0C] border border-white/10 text-warm-ivory"
                />
                <input
                  type="text"
                  placeholder="Variant SKU (optional)"
                  value={v.sku || ''}
                  onChange={(e) => updateVariantInput(i, 'sku', e.target.value)}
                  className="text-xs p-2.5 bg-[#0C0C0C] border border-white/10 text-warm-ivory font-mono"
                />
                <input
                  type="number"
                  placeholder="Override Price (optional)"
                  value={v.price !== null && v.price !== undefined ? v.price : ''}
                  onChange={(e) => updateVariantInput(i, 'price', e.target.value ? Number(e.target.value) : null)}
                  className="text-xs p-2.5 bg-[#0C0C0C] border border-white/10 text-warm-ivory"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={v.is_available}
                      onChange={(e) => updateVariantInput(i, 'is_available', e.target.checked)}
                      className="accent-[#C5A85C]"
                    />
                    <span className="text-neutral-400">Available</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeVariantInput(i)}
                    className="text-neutral-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4: SPECIFICATIONS & FEATURES */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4">
          4. Technical Specs & Dimensions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              MATERIAL
            </label>
            <input
              type="text"
              placeholder="E.g. Solid Forged Brass"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              MAIN FINISH
            </label>
            <input
              type="text"
              placeholder="E.g. Brushed Champagne Gold PVD"
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              DIMENSIONS
            </label>
            <input
              type="text"
              placeholder="E.g. 480mm x 370mm x 130mm"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              className="w-full text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory"
            />
          </div>
        </div>

        {/* Technical Specs Key-Values */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              KEY-VALUE SPECIFICATIONS
            </span>
            <button
              type="button"
              onClick={addSpecInput}
              className="text-xs text-[#C5A85C] hover:text-white flex items-center font-semibold uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1" /> ADD SPEC
            </button>
          </div>

          <div className="space-y-3">
            {specifications.map((s, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Property (e.g. Cartridge)"
                  value={s.key}
                  onChange={(e) => updateSpecInput(i, 'key', e.target.value)}
                  className="w-1/2 text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. German Ceramic Disc)"
                  value={s.value}
                  onChange={(e) => updateSpecInput(i, 'value', e.target.value)}
                  className="w-1/2 text-xs p-3 bg-[#050505] border border-white/10 text-warm-ivory"
                />
                <button
                  type="button"
                  onClick={() => removeSpecInput(i)}
                  className="text-neutral-500 hover:text-red-400 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5: PRODUCT IMAGES & PDF CATALOGUE */}
      <div className="bg-[#0C0C0C] border border-white/5 p-8 space-y-6">
        <h3 className="font-serif text-xl font-light text-white border-b border-white/5 pb-4">
          5. Media & PDF Catalogue
        </h3>

        {/* PDF Catalogue File or URL */}
        <div className="space-y-2">
          <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
            PDF CATALOGUE (DEVICE UPLOAD OR URL)
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              type="text"
              placeholder="Paste PDF link (https://...) or upload PDF file"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="flex-grow text-xs p-3.5 bg-[#050505] border border-white/10 text-warm-ivory w-full"
            />
            <label className="px-4 py-3 bg-[#C5A85C]/10 hover:bg-[#C5A85C] border border-[#C5A85C]/30 text-[#C5A85C] hover:text-[#050505] transition-all font-semibold text-xs tracking-wider uppercase flex items-center cursor-pointer shrink-0">
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              <span>Upload PDF File</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-[10px] text-neutral-500 italic">
            A &quot;Download Catalogue&quot; button will automatically appear on the product detail page if this field contains a file or URL.
          </p>
        </div>

        {/* Image URLs & Device File Upload list */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              PRODUCT IMAGES (DEVICE UPLOAD OR URL)
            </span>
            <button
              type="button"
              onClick={addImageInput}
              className="text-xs text-[#C5A85C] hover:text-white flex items-center font-semibold uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1" /> ADD MORE IMAGES
            </button>
          </div>

          <div className="space-y-3">
            {images.map((img, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 border border-white/10 bg-[#050505]">
                <input
                  type="text"
                  placeholder="Paste Image URL (https://...) or click Upload File"
                  value={img}
                  onChange={(e) => updateImageInput(i, e.target.value)}
                  className="flex-grow text-xs p-3 bg-[#0C0C0C] border border-white/10 text-warm-ivory w-full"
                />
                
                <div className="flex items-center gap-2 shrink-0">
                  <label className="px-3.5 py-2.5 bg-[#C5A85C]/10 hover:bg-[#C5A85C] border border-[#C5A85C]/30 text-[#C5A85C] hover:text-[#050505] transition-all font-semibold text-xs tracking-wider uppercase flex items-center cursor-pointer shadow-sm">
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    <span>Upload Device File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(i, e)}
                      className="hidden"
                    />
                  </label>

                  {img && (
                    <div className="relative w-10 h-10 border border-[#C5A85C]/40 shrink-0 bg-black overflow-hidden">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImageInput(i)}
                    className="text-neutral-500 hover:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </form>
  );
}
