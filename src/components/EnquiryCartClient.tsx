'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageSquare, Trash2, ArrowLeft, RefreshCw, X } from 'lucide-react';
import { useEnquiryCart } from '../context/EnquiryCartContext';
import { useLanguage } from '../context/LanguageContext';
import { whatsappUtility } from '../lib/whatsapp';
import { WebsiteSettings } from '../lib/types';

interface EnquiryCartClientProps {
  settings: WebsiteSettings;
}

export default function EnquiryCartClient({ settings }: EnquiryCartClientProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useEnquiryCart();
  const { language, t } = useLanguage();
  const [customerMessage, setCustomerMessage] = useState('');
  const whatsappNumber = settings.whatsapp.number;
  // Generate dynamic WhatsApp cart links matching active language
  const whatsappLink = whatsappUtility.getEnquiryCartLink(whatsappNumber, cartItems, language);
  const whatsappSecondaryLink = settings.whatsapp.secondary_number
    ? whatsappUtility.getEnquiryCartLink(settings.whatsapp.secondary_number, cartItems, language)
    : null;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-neutral-900 border border-white/5 flex items-center justify-center mx-auto rounded-none">
          <ShoppingBag className="w-6 h-6 text-[#C5A85C] stroke-[1.2]" />
        </div>
        <h1 className="font-serif text-3xl font-light tracking-wide text-white">
          {t('enquiry.empty_title')}
        </h1>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed font-light">
          {t('enquiry.empty_desc')}
        </p>
        <div className="pt-4">
          <Link 
            href="/products" 
            className="inline-block px-8 py-4 bg-[#C5A85C] text-[#050505] hover:bg-[#D4AF37] transition-all duration-300 font-semibold text-xs tracking-widest uppercase"
          >
            {t('btn.view_all_products')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 font-sans">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEFT COLUMN: LIST OF ADDED ITEMS */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div className="border-b border-white/5 pb-4 flex justify-between items-end">
            <h1 className="font-serif text-3xl font-light tracking-wide text-white">
              Enquiry List
            </h1>
            <span className="text-xs text-neutral-400 font-light">
              Total <span className="text-white font-semibold">{cartCount}</span> Items
            </span>
          </div>

          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div 
                key={`${item.product_id}-${item.variant_finish || idx}`} 
                className="flex items-center gap-6 border border-white/5 bg-[#0C0C0C] p-6 relative group"
              >
                {/* Thumbnail Image */}
                <div className="relative w-20 h-20 shrink-0 border border-white/5 bg-neutral-900">
                  <Image
                    src={item.image_url || '/placeholder_product.jpg'}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow space-y-1 pr-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-base text-neutral-200 tracking-wide font-medium leading-tight">
                      {item.product_name}
                    </h3>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-light tracking-wider flex flex-wrap gap-x-4">
                    {item.product_code && (
                      <span>CODE: <span className="font-semibold text-neutral-400">{item.product_code}</span></span>
                    )}
                    {item.variant_finish && (
                      <span>FINISH: <span className="font-semibold text-[#C5A85C]">{item.variant_finish}</span></span>
                    )}
                  </div>
                  <div className="text-xs text-[#C5A85C] font-semibold pt-1">
                    {item.price === null || item.price === undefined 
                      ? 'Contact for Price' 
                      : `₹${(item.price * item.quantity).toLocaleString('en-IN')}`}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-white/5 bg-[#050505] text-xs">
                  <button 
                    onClick={() => updateQuantity(item.product_id!, item.variant_finish, item.quantity - 1)}
                    className="px-3 py-1.5 hover:text-[#C5A85C] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-white font-medium min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.product_id!, item.variant_finish, item.quantity + 1)}
                    className="px-3 py-1.5 hover:text-[#C5A85C] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product_id!, item.variant_finish)}
                  className="p-2 border border-white/5 bg-transparent text-neutral-500 hover:text-red-400 hover:border-red-400/20 transition-all cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link 
              href="/products" 
              className="text-xs text-neutral-400 hover:text-[#C5A85C] transition-colors flex items-center font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> CONTINUE SHOPPING
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-red-500 hover:text-red-400 transition-colors flex items-center font-semibold cursor-pointer"
            >
              CLEAR ENQUIRY LIST
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION & SUMMARY */}
        <div className="w-full lg:w-2/5 border border-white/5 bg-[#0C0C0C] p-8 space-y-6">
          <h2 className="font-serif text-xl font-light tracking-wide border-b border-white/5 pb-4 text-white">
            Send Enquiry
          </h2>

          <div className="space-y-4 text-xs text-neutral-400">
            <p className="leading-relaxed font-light">
              This list will be dynamically formatted into a clean, structured inquiry and opened directly with THE LUXURY HUB sales team on WhatsApp.
            </p>
            <p className="leading-relaxed font-light">
              Our specialists will verify warehouse stock levels, provide price quotations, coordinate customized finishes, and schedule showroom consultations.
            </p>
          </div>

          {/* Customer project note input */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase">
              ADD A NOTE (OPTIONAL)
            </label>
            <textarea
              placeholder="E.g. I need brushed gold finish handles, please quote for project delivery..."
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              rows={4}
              className="w-full text-xs p-4 bg-[#050505] border border-white/5 text-warm-ivory placeholder-neutral-600 rounded-none focus:border-[#C5A85C]/50"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> SEND ON WHATSAPP (LINE 1: +91 86191 93954)
            </a>

            {whatsappSecondaryLink && (
              <a
                href={whatsappSecondaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#1EBE57] text-white hover:bg-[#18a249] transition-all duration-300 font-semibold text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> SEND ON WHATSAPP (LINE 2: +91 83067 69710)
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
