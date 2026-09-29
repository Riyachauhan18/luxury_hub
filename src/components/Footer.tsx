'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { WebsiteSettings } from '../lib/types';

import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  settings: WebsiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { business } = settings;
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0C0C0C] border-t border-white/5 text-neutral-400 pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="relative h-12 w-48 block">
            <Image
              src="/logo.png"
              alt="THE LUXURY HUB"
              fill
              className="object-contain filter brightness-110"
            />
          </Link>
          <p className="text-xs leading-relaxed text-neutral-500 max-w-sm font-light">
            THE LUXURY HUB is a premier showroom offering curated sanitaryware, bathroom fittings, lighting, and designer architectural hardware. We elevate your interiors with products of exceptional design and timeless quality.
          </p>

          {settings.social?.instagram && (
            <div className="pt-2">
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-[#C5A85C] hover:text-white transition-colors font-medium tracking-wider"
              >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                FOLLOW ON INSTAGRAM (@the_luxury_hub1) &rarr;
              </a>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] font-medium mb-6 uppercase">
            QUICK LINKS
          </h4>
          <ul className="space-y-3 text-xs tracking-wider">
            <li>
              <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">{t('nav.products')}</Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-white transition-colors">{t('nav.collections')}</Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-white transition-colors">{t('nav.brands')}</Link>
            </li>
            <li>
              <Link href="/showroom" className="hover:text-white transition-colors">{t('nav.showroom')}</Link>
            </li>
            <li>
              <Link href="/inspiration" className="hover:text-white transition-colors">{t('nav.inspiration')}</Link>
            </li>
          </ul>
        </div>

        {/* Customer Directory */}
        <div>
          <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] font-medium mb-6 uppercase">
            CUSTOMER
          </h4>
          <ul className="space-y-3 text-xs tracking-wider">
            <li>
              <Link href="/enquiry" className="hover:text-white transition-colors">PRODUCT ENQUIRY</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">CONTACT US</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">TERMS & CONDITIONS</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] font-medium mb-6 uppercase">
            SHOWROOM INFO
          </h4>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 stroke-[1.5]" />
              <span className="leading-relaxed">{business.address}</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 stroke-[1.5] mt-0.5" />
              <div className="flex flex-col space-y-0.5 font-mono text-[11px]">
                <a href="tel:+919667431239" className="hover:text-white transition-colors">+91 96674 31239</a>
                <a href="tel:+918619193954" className="hover:text-white transition-colors">+91 86191 93954</a>
                <a href="tel:+917230056518" className="hover:text-white transition-colors">+91 72300 56518</a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 stroke-[1.5]" />
              <span className="break-all">{business.email}</span>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 stroke-[1.5]" />
              <span className="leading-relaxed">{business.opening_hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-widest text-neutral-600 space-y-4 md:space-y-0">
        <div>
          &copy; {currentYear} THE LUXURY HUB. ALL RIGHTS RESERVED.
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy-policy" className="hover:text-neutral-400 transition-colors">PRIVACY POLICY</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-neutral-400 transition-colors">TERMS OF USE</Link>
        </div>
      </div>
    </footer>
  );
}
