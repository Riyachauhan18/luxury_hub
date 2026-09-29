import { EnquiryItem } from './types';
import { Language } from './i18n/translations';

/**
 * Standardizes phone numbers to WhatsApp API format (numbers only, with country code)
 */
export function formatPhoneNumberForWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('00')) {
    return cleaned.substring(2);
  }
  if (cleaned.length === 10 && /^[6789]/.test(cleaned)) {
    return '91' + cleaned;
  }
  return cleaned;
}

/**
 * Reusable utility to generate standard WhatsApp click-to-chat URLs (NO AI, NO CHATBOT).
 */
export const whatsappUtility = {
  /**
   * Generates a link for a general enquiry
   */
  getGeneralLink(number: string, langOrCustomMessage?: Language | string, customMessage?: string): string {
    if (customMessage) {
      const text = encodeURIComponent(customMessage);
      return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${text}`;
    }

    if (langOrCustomMessage && langOrCustomMessage !== 'en' && langOrCustomMessage !== 'hi') {
      const text = encodeURIComponent(langOrCustomMessage);
      return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${text}`;
    }

    const lang = (langOrCustomMessage === 'hi') ? 'hi' : 'en';
    const defaultMsg = lang === 'hi'
      ? "नमस्ते The Luxury Hub, मुझे आपके उत्पादों के बारे में अधिक जानकारी चाहिए।"
      : "Hello The Luxury Hub, I would like to know more about your products.";

    const text = encodeURIComponent(defaultMsg);
    return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${text}`;
  },

  /**
   * Generates a link for a specific product
   */
  getProductLink(
    number: string, 
    productName: string, 
    productCode: string | null, 
    finish: string | null = null,
    lang: Language = 'en'
  ): string {
    const codeStr = productCode || 'N/A';
    const finishStr = finish || 'Default';

    let message = '';
    if (lang === 'hi') {
      message = `नमस्ते The Luxury Hub,

मुझे निम्न उत्पाद में रुचि है:

उत्पाद: ${productName}
प्रोडक्ट कोड: ${codeStr}
फिनिश: ${finishStr}

कृपया इसकी कीमत और उपलब्धता साझा करें।

धन्यवाद।`;
    } else {
      message = `Hello The Luxury Hub,

I am interested in the following product:

Product: ${productName}
Product Code: ${codeStr}
Finish: ${finishStr}

Please share the price and availability.

Thank you.`;
    }
    
    const text = encodeURIComponent(message);
    return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${text}`;
  },

  /**
   * Generates a link for the complete enquiry cart list
   */
  getEnquiryCartLink(number: string, items: EnquiryItem[], lang: Language = 'en'): string {
    if (items.length === 0) {
      return this.getGeneralLink(number, lang);
    }

    let itemsText = '';

    if (lang === 'hi') {
      items.forEach((item, index) => {
        const codeStr = item.product_code ? `\n   प्रोडक्ट कोड: ${item.product_code}` : '';
        const finishStr = item.variant_finish ? `\n   फिनिश: ${item.variant_finish}` : '';
        itemsText += `${index + 1}. ${item.product_name}${codeStr}${finishStr}\n   मात्रा: ${item.quantity}\n\n`;
      });

      const message = `नमस्ते The Luxury Hub,

मुझे निम्नलिखित उत्पादों में रुचि है:

${itemsText}कृपया इसकी कीमत और उपलब्धता साझा करें।

धन्यवाद।`;

      return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${encodeURIComponent(message)}`;
    } else {
      items.forEach((item, index) => {
        const codeStr = item.product_code ? `\n   Product Code: ${item.product_code}` : '';
        const finishStr = item.variant_finish ? `\n   Finish: ${item.variant_finish}` : '';
        itemsText += `${index + 1}. ${item.product_name}${codeStr}${finishStr}\n   Quantity: ${item.quantity}\n\n`;
      });

      const message = `Hello The Luxury Hub,

I am interested in the following products:

${itemsText}Please share the price and availability.

Thank you.`;

      return `https://wa.me/${formatPhoneNumberForWhatsApp(number)}?text=${encodeURIComponent(message)}`;
    }
  }
};
