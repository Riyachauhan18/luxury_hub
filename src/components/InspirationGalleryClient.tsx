'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, Eye, Layers } from 'lucide-react';
import { GalleryImage, Product, WebsiteSettings } from '../lib/types';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUtility } from '../lib/whatsapp';

interface InspirationGalleryClientProps {
  initialImages: GalleryImage[];
  allProducts: Product[];
  settings: WebsiteSettings;
}

interface ThemeSection {
  id: string;
  name: string;
  name_hi: string;
  tagline: string;
  description: string;
  colorClass: string;
  bgGradient: string;
  mainImage: string;
  vibeBadge: string;
  productFilterKeys: string[];
}

const THEME_SECTIONS: ThemeSection[] = [
  {
    id: 'royal-gold',
    name: 'Royal Heritage & Gold Touch',
    name_hi: 'रॉयल हेरिटेज एवं गोल्ड टच',
    tagline: 'Opulent PVD Champagne Gold, detailed knurling & crystal accents',
    description: 'Designed for double-height foyers and master bathrooms. Combines high-density PVD gold faucets, thermostatic rain shower suites, and warm glowing ambient mirrors.',
    colorClass: 'text-[#C5A85C]',
    bgGradient: 'from-[#12100A] via-[#0C0C0C] to-[#050505]',
    mainImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    vibeBadge: '24K GOLD PVD • K9 CRYSTAL • IMPERIAL AMBIENCE',
    productFilterKeys: ['gold', 'faucet-1', 'shower-1', 'mirror-1', 'chandelier', 'faucet']
  },
  {
    id: 'vintage-brass',
    name: 'Vintage Classic & Antique Brass',
    name_hi: 'विंटेज क्लासिक एवं एंटीक ब्रास',
    tagline: 'Hand-burnished antique brass, classic mortise locksets & timber tones',
    description: 'Brings heritage estate elegance into contemporary residences. Features hand-finished brass handles, vessel ceramic basins, and warm vintage wall sconces.',
    colorClass: 'text-[#B87333]',
    bgGradient: 'from-[#140D08] via-[#0C0C0C] to-[#050505]',
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    vibeBadge: 'HAND-BURNISHED PATINA • KNURLED BRASS • HERITAGE CRAFT',
    productFilterKeys: ['brass', 'hardware', 'handle', 'antique', 'vessel']
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel & Serene Sanctuary',
    name_hi: 'सॉफ्ट पेस्टल एवं शांत सेन्चुरी',
    tagline: 'Muted organic ceramics, soft curved lines & serene lighting',
    description: 'A soothing palette inspired by calm spa sanctuaries. Combines soft-edge countertop basins, brushed nickel mixers, and subtle indirect LED mirror lighting.',
    colorClass: 'text-emerald-400',
    bgGradient: 'from-[#08120E] via-[#0C0C0C] to-[#050505]',
    mainImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
    vibeBadge: 'SOFT SPA AMBIENCE • VITRIFIED CERAMIC • BRUSHED NICKEL',
    productFilterKeys: ['basin', 'ceramic', 'white', 'mirror', 'soft']
  },
  {
    id: 'minimalist-black',
    name: 'Modern Minimalist Velvet Black',
    name_hi: 'मॉडर्न मिनिमलिस्ट मखमली ब्लैक',
    tagline: 'Fingerprint-proof velvet black, architectural lines & concealed valves',
    description: 'Sleek obsidian aesthetics tailored for modern penthouses. Features rimless wall-hung water closets, matte black concealed shower systems, and linear bath fittings.',
    colorClass: 'text-neutral-300',
    bgGradient: 'from-[#141414] via-[#0C0C0C] to-[#050505]',
    mainImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
    vibeBadge: 'FINGERPRINT-PROOF BLACK • CONCEALED VALVES • RIMLESS FLUSH',
    productFilterKeys: ['black', 'wallhung', 'matte', 'shower']
  },
  {
    id: 'crystal-lighting',
    name: 'Grand Crystal & Architectural Lighting',
    name_hi: 'ग्रैंड क्रिस्टल एवं आर्किटेक्चरल लाइटिंग',
    tagline: 'Statement K9 optical glass, multi-tiered drops & warm sconces',
    description: 'Transforming light into living art. Features multi-tier optical glass chandeliers, cascading stairwell pendant drops, and precision architectural wall sconces.',
    colorClass: 'text-amber-300',
    bgGradient: 'from-[#12110A] via-[#0C0C0C] to-[#050505]',
    mainImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200',
    vibeBadge: 'HIGH-TRANSPARENCY REFRACTION • AMBIENT FOYER GLOW',
    productFilterKeys: ['chandelier', 'pendant', 'light', 'glass']
  }
];

export default function InspirationGalleryClient({
  initialImages,
  allProducts,
  settings
}: InspirationGalleryClientProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('all');
  const { language, t } = useLanguage();
  const whatsappNumber = settings.whatsapp.number;

  // Filter themes according to active selection tab
  const activeThemes = useMemo(() => {
    if (selectedThemeId === 'all') return THEME_SECTIONS;
    return THEME_SECTIONS.filter(t => t.id === selectedThemeId);
  }, [selectedThemeId]);

  // Helper to match products for each theme
  const getProductsForTheme = (theme: ThemeSection) => {
    const matched = allProducts.filter(p => {
      const fullText = `${p.name} ${p.category_name || ''} ${p.finish || ''} ${p.material || ''} ${p.slug} ${p.description || ''}`.toLowerCase();
      return theme.productFilterKeys.some(key => fullText.includes(key.toLowerCase()));
    });

    if (matched.length > 0) return matched.slice(0, 3);
    return allProducts.slice(0, 3); // Fallback so card is never empty
  };

  // WhatsApp enquiry link for a complete theme suite
  const getThemeWhatsAppLink = (theme: ThemeSection) => {
    const msg = `Hello Vikram Ji, I am looking at the "${theme.name}" theme on the website. Please share details and complete package price for products matching this room look.`;
    return whatsappUtility.getGeneralLink(whatsappNumber, language, msg);
  };

  return (
    <div className="bg-[#050505] text-[#FDFBF7] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] font-medium text-[#C5A85C] uppercase bg-[#C5A85C]/10 px-3 py-1 border border-[#C5A85C]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERIOR THEME & STYLE GUIDE</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-white leading-tight">
            Design Inspiration by Theme
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
            Explore curated room concepts matched with our showroom fittings. See how colors, PVD finishes, and architectural lighting harmonize to create your dream space.
          </p>
          <div className="w-16 h-[1px] bg-[#C5A85C] mx-auto mt-4"></div>
        </div>

        {/* Theme Selector Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/10 pb-8">
          <button
            onClick={() => setSelectedThemeId('all')}
            className={`px-5 py-2.5 border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
              selectedThemeId === 'all'
                ? 'border-[#C5A85C] text-[#C5A85C] bg-[#C5A85C]/10 font-semibold shadow-lg'
                : 'border-white/10 bg-[#0C0C0C] text-neutral-400 hover:border-white/20 hover:text-white'
            }`}
          >
            ✨ ALL INTERIOR THEMES
          </button>

          {THEME_SECTIONS.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className={`px-4 py-2.5 border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                selectedThemeId === theme.id
                  ? 'border-[#C5A85C] text-[#C5A85C] bg-[#C5A85C]/10 font-semibold shadow-lg'
                  : 'border-white/10 bg-[#0C0C0C] text-neutral-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {language === 'hi' ? theme.name_hi : theme.name}
            </button>
          ))}
        </div>

        {/* Theme Sections List */}
        <div className="space-y-20">
          {activeThemes.map((theme) => {
            const themeProducts = getProductsForTheme(theme);
            const waUrl = getThemeWhatsAppLink(theme);

            return (
              <div 
                key={theme.id}
                className={`border border-white/10 bg-gradient-to-b ${theme.bgGradient} p-6 md:p-10 space-y-8 rounded-none shadow-2xl relative overflow-hidden`}
              >
                {/* Theme Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
                  <div className="space-y-2">
                    <span className="text-[9px] tracking-[0.25em] font-semibold text-[#C5A85C] uppercase bg-black/60 px-3 py-1 border border-white/10 inline-block">
                      {theme.vibeBadge}
                    </span>
                    <h2 className="font-serif text-2xl md:text-4xl font-light text-white tracking-wide">
                      {language === 'hi' ? theme.name_hi : theme.name}
                    </h2>
                    <p className="text-xs text-neutral-400 font-light max-w-2xl">
                      {theme.description}
                    </p>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shrink-0 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> ENQUIRE THIS THEME ON WHATSAPP
                  </a>
                </div>

                {/* Main Content Layout: Room Photo (Left) + Matching Products (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Inspiration Room Lifestyle Photo */}
                  <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[460px] border border-white/10 group overflow-hidden bg-black">
                    <Image
                      src={theme.mainImage}
                      alt={theme.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 space-y-1">
                      <span className="text-[9px] tracking-widest text-[#C5A85C] uppercase font-semibold">
                        ROOM CONCEPT PHOTO
                      </span>
                      <h4 className="font-serif text-lg text-white font-light">
                        {theme.tagline}
                      </h4>
                    </div>
                  </div>

                  {/* Right Column: Matching Products from Our Showroom */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
                        <span className="flex items-center text-[#C5A85C]">
                          <Layers className="w-3.5 h-3.5 mr-1.5" /> FITTINGS THAT BUILD THIS LOOK
                        </span>
                        <span>{themeProducts.length} MATCHING ITEMS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {themeProducts.map((p) => {
                          const pImg = p.images && p.images.length > 0 ? p.images[0] : '/placeholder_product.jpg';
                          return (
                            <div 
                              key={p.id}
                              className="group/card border border-white/10 bg-[#080808] flex flex-col justify-between p-4 hover:border-[#C5A85C]/40 transition-all duration-300"
                            >
                              <Link href={`/products/${p.slug}`} className="relative h-44 w-full block overflow-hidden mb-3 bg-black">
                                <Image
                                  src={pImg}
                                  alt={p.name}
                                  fill
                                  className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                                />
                              </Link>

                              <div className="space-y-1.5 flex-grow">
                                <span className="text-[8px] text-neutral-500 uppercase tracking-widest block">
                                  {p.category_name || 'Showroom Fitting'}
                                </span>
                                <h5 className="font-serif text-xs text-neutral-200 group-hover/card:text-[#C5A85C] transition-colors line-clamp-1 font-medium">
                                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                                </h5>
                                {p.finish && (
                                  <p className="text-[9px] text-neutral-400 font-light italic truncate">
                                    {p.finish}
                                  </p>
                                )}
                              </div>

                              <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between">
                                <span className="text-[11px] text-[#C5A85C] font-semibold">
                                  {p.contact_for_price ? 'Contact' : `₹${p.price?.toLocaleString('en-IN')}`}
                                </span>
                                <Link 
                                  href={`/products/${p.slug}`}
                                  className="text-[9px] text-neutral-300 group-hover/card:text-[#C5A85C] font-semibold uppercase tracking-widest flex items-center"
                                >
                                  VIEW <ArrowRight className="w-2.5 h-2.5 ml-1" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Feature Assurance */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 font-light">
                      <span className="flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A85C] mr-1.5" /> Complete Suite Customization Available
                      </span>
                      <span className="flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A85C] mr-1.5" /> PVD Finish Warranty Included
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
