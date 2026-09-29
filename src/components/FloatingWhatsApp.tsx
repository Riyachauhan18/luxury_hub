'use client';

import React, { useState, useEffect } from 'react';
import { whatsappUtility } from '../lib/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import { WebsiteSettings } from '../lib/types';

interface FloatingWhatsAppProps {
  settings: WebsiteSettings;
}

export default function FloatingWhatsApp({ settings }: FloatingWhatsAppProps) {
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const whatsappNumber = settings.whatsapp.number;
  const { language, t } = useLanguage();

  useEffect(() => {
    // Dynamically calculate the WhatsApp URL based on the current page context and language
    const updateUrl = () => {
      const productName = document.body.getAttribute('data-product-name');
      const productCode = document.body.getAttribute('data-product-code');

      if (productName) {
        setWhatsappUrl(
          whatsappUtility.getProductLink(whatsappNumber, productName, productCode, null, language)
        );
      } else {
        setWhatsappUrl(
          whatsappUtility.getGeneralLink(whatsappNumber, language)
        );
      }
    };

    // Initialize
    updateUrl();

    // Create an observer to watch for DOM modifications to data attributes on document.body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'data-product-name' || mutation.attributeName === 'data-product-code')
        ) {
          updateUrl();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, [whatsappNumber, language]);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 hover:bg-[#20ba59] transition-all duration-300 group cursor-pointer"
      aria-label="Contact THE LUXURY HUB on WhatsApp"
    >
      {/* Official WhatsApp SVG Icon */}
      <svg
        className="w-8 h-8 md:w-9 md:h-9 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.838 0-3.639-.496-5.215-1.436l-.373-.222-3.875 1.016 1.034-3.778-.244-.388a10.029 10.029 0 01-1.536-5.326c0-5.545 4.512-10.058 10.057-10.058 2.685 0 5.207 1.047 7.106 2.947a10.016 10.016 0 012.946 7.112c0 5.546-4.512 10.057-10.057 10.057m0-21.849c-6.49 0-11.77 5.28-11.77 11.77 0 2.07.538 4.092 1.562 5.867l-1.658 6.052 6.195-1.625c1.711.933 3.649 1.425 5.671 1.425 6.49 0 11.77-5.28 11.77-11.77 0-3.144-1.224-6.1-3.447-8.324A11.684 11.684 0 0012.051 0z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-18 bg-[#0C0C0C] border border-[#D4AF37]/20 text-[#FDFBF7] text-[10px] tracking-widest font-sans font-medium py-2 px-3 rounded-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg uppercase">
        {t('btn.enquire_whatsapp')}
      </span>
    </a>
  );
}
