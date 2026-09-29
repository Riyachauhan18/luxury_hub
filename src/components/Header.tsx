'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useEnquiryCart } from '../context/EnquiryCartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useEnquiryCart();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.collections'), path: '/collections' },
    { name: t('nav.brands'), path: '/brands' },
    { name: t('nav.showroom'), path: '/showroom' },
    { name: t('nav.inspiration'), path: '/inspiration' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 glass-premium border-b border-white/5 shadow-lg' 
            : 'py-6 bg-gradient-to-b from-[#050505] to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="relative h-11 sm:h-14 w-44 sm:w-56 md:w-60 ml-1 sm:ml-3 lg:ml-6 flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="THE LUXURY HUB"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[11px] xl:text-xs tracking-widest font-medium whitespace-nowrap transition-colors hover:text-[#C5A85C] ${
                  isActive(link.path) ? 'text-[#C5A85C] font-semibold' : 'text-neutral-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-neutral-300">
            
            {/* EN | हिन्दी Refined Capsule Language Switcher */}
            <div className="flex items-center bg-[#0C0C0C]/90 border border-white/15 rounded-full p-0.5 sm:p-1 text-[10px] sm:text-[11px] font-medium font-sans backdrop-blur-md shadow-sm shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#C5A85C] text-[#050505] font-semibold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-neutral-700 px-0.5 select-none">|</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  language === 'hi' 
                    ? 'bg-[#C5A85C] text-[#050505] font-semibold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Switch to Hindi"
              >
                हिन्दी
              </button>
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-[#D4AF37] transition-colors p-1.5 cursor-pointer shrink-0"
              aria-label="Toggle search panel"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Enquiry Cart Icon */}
            <Link 
              href="/enquiry" 
              className="relative hover:text-[#D4AF37] transition-colors p-1.5 shrink-0" 
              aria-label="View enquiry list"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 gold-gradient-bg text-[#050505] text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Trigger - Prominent Gold Accent */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#C5A85C]/40 bg-[#0C0C0C]/80 text-[#C5A85C] hover:bg-[#C5A85C]/10 transition-all cursor-pointer shrink-0 ml-1"
              aria-label="Toggle navigation drawer"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Full-Screen Overlay Drawer */}
        <div
          className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-xl z-50 transition-all duration-300 lg:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div>
            {/* Top Bar inside Mobile Drawer */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <Link href="/" onClick={() => setIsOpen(false)} className="relative h-10 w-44">
                <Image
                  src="/logo.png"
                  alt="THE LUXURY HUB"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full border border-white/20 text-white hover:text-[#C5A85C] hover:border-[#C5A85C] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links List */}
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg tracking-widest uppercase font-serif py-3 border-b border-white/5 flex items-center justify-between transition-colors ${
                    isActive(link.path) ? 'text-[#C5A85C] font-semibold pl-2 border-l-2 border-l-[#C5A85C]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-neutral-600 font-sans">→</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Footer Links inside Mobile Menu */}
          <div className="pt-8 border-t border-white/10 mt-8 space-y-4">
            <div className="flex items-center justify-between text-xs tracking-wider text-neutral-400">
              <span>SHOWROOM LOCATION</span>
              <span className="text-[#C5A85C]">Sector 9, Panchkula</span>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hello%20The%20Luxury%20Hub,%20I%20would%20like%20to%20enquire"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-gradient-bg text-[#050505] font-semibold text-center py-3 text-xs tracking-widest uppercase rounded flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>WHATSAPP ENQUIRY</span>
            </a>
          </div>
        </div>
      </header>

      {/* Global Search Overlay Panel */}
      {showSearch && (
        <div className="fixed inset-0 bg-[#050505]/95 z-50 flex items-center justify-center animate-fade-in p-6">
          <button 
            onClick={() => setShowSearch(false)}
            className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-8 h-8 stroke-[1.5]" />
          </button>
          <div className="max-w-2xl w-full">
            <h3 className="font-serif text-2xl tracking-wider text-center text-neutral-300 mb-8 font-light">
              SEARCH THE CATALOGUE
            </h3>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products by code, finish, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xl py-4 px-6 pr-12 bg-neutral-900/50 border border-[#D4AF37]/30 rounded-none text-warm-ivory placeholder-neutral-500 font-sans tracking-wide text-center"
                autoFocus
              />
              <button 
                type="submit" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Search className="w-6 h-6 stroke-[1.5]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
