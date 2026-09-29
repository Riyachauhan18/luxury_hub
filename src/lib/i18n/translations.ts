export type Language = 'en' | 'hi';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Header
    'nav.home': 'HOME',
    'nav.about': 'ABOUT US',
    'nav.products': 'PRODUCTS',
    'nav.collections': 'COLLECTIONS',
    'nav.brands': 'BRANDS',
    'nav.showroom': 'SHOWROOM',
    'nav.inspiration': 'INSPIRATION',
    'nav.enquiry': 'ENQUIRY LIST',
    'nav.contact': 'CONTACT US',
    'nav.faq': 'FAQ',
    'nav.search_placeholder': 'Search luxury faucets, basins, lighting...',

    // Buttons & CTAs
    'btn.explore_catalog': 'EXPLORE CATALOGUE',
    'btn.explore_collection': 'EXPLORE COLLECTION',
    'btn.enquire_whatsapp': 'ENQUIRE ON WHATSAPP',
    'btn.add_to_enquiry': 'ADD TO ENQUIRY LIST',
    'btn.added_to_enquiry': 'ADDED TO ENQUIRY LIST',
    'btn.visit_showroom': 'VISIT SHOWROOM',
    'btn.book_appointment': 'BOOK SHOWROOM APPOINTMENT',
    'btn.view_all_products': 'VIEW ALL PRODUCTS',
    'btn.download_catalogue': 'DOWNLOAD PDF CATALOGUE',
    'btn.send_enquiry_whatsapp': 'SEND ENQUIRY ON WHATSAPP',
    'btn.submit_form': 'SUBMIT ENQUIRY TO WEBSITE',
    'btn.contact_us': 'CONTACT US',
    'btn.clear_cart': 'CLEAR ENQUIRY LIST',
    'btn.get_directions': 'GET DIRECTIONS',

    // Section Titles & Subheadings
    'home.hero_overline': 'ELEVATE YOUR SPACE',
    'home.hero_title': 'THE LUXURY HUB',
    'home.hero_desc': 'Curated Sanitaryware, Bathroom Fittings, Lighting & Interior Hardware',
    'home.departments_title': 'Architectural Departments',
    'home.departments_sub': 'Explore our range of premium sanitaryware, gold mixers, rain showers, and designer hardware.',
    'home.collections_title': 'Curated Style Lines',
    'home.featured_title': 'Most Loved Fixtures',
    'home.gallery_title': 'Inspiration & Architecture',
    'home.showroom_title': 'Visit Our Jaipur Showroom',

    // Product Catalogue & Detail
    'catalog.title': 'Digital Product Catalogue',
    'catalog.search': 'Search by keyword or product code...',
    'catalog.filter_category': 'Category',
    'catalog.filter_collection': 'Collection',
    'catalog.filter_brand': 'Brand',
    'catalog.sort_by': 'Sort By',
    'catalog.contact_for_price': 'Contact for Price',
    'catalog.in_stock': 'In Stock',
    'catalog.code': 'Code',
    'catalog.material': 'Material',
    'catalog.finish': 'Finish',
    'catalog.dimensions': 'Dimensions',
    'catalog.specifications': 'Technical Specifications',
    'catalog.features': 'Key Craftsmanship Features',
    'catalog.select_finish': 'Select Finish Variant:',

    // Enquiry Cart
    'enquiry.title': 'My Product Enquiry List',
    'enquiry.empty_title': 'Your Enquiry List is Empty',
    'enquiry.empty_desc': 'Browse our catalogue and click "Add to Enquiry" on fixtures to build your requirement checklist.',
    'enquiry.items_count': 'Selected Items',
    'enquiry.qty': 'Quantity',

    // Showroom & Contact
    'showroom.title': 'Experience Luxury in Person',
    'showroom.address': 'Kalwar Rd, Manglam City, Govindpura, Jaipur, Rajasthan 302012',
    'showroom.phones': 'Showroom Phone Lines',
    'contact.title': 'Contact Showroom',
    'contact.send_query': 'Send an Enquiry',

    // Tooltips & Floating Buttons
    'whatsapp.tooltip': 'Need assistance? Chat directly on WhatsApp'
  },
  hi: {
    // Navigation & Header
    'nav.home': 'मुख्य पृष्ठ',
    'nav.about': 'हमारे बारे में',
    'nav.products': 'उत्पाद (Products)',
    'nav.collections': 'कलेक्शन (Collections)',
    'nav.brands': 'ब्रांड्स (Brands)',
    'nav.showroom': 'शोरूम (Showroom)',
    'nav.inspiration': 'गैलरी (Inspiration)',
    'nav.enquiry': 'पूछताछ सूची (Enquiry List)',
    'nav.contact': 'संपर्क करें (Contact)',
    'nav.faq': 'सामान्य प्रश्न (FAQ)',
    'nav.search_placeholder': 'लक्जरी नल, बेसिन, लाइटिंग खोजें...',

    // Buttons & CTAs
    'btn.explore_catalog': 'कैटलॉग देखें',
    'btn.explore_collection': 'कलेक्शन देखें',
    'btn.enquire_whatsapp': 'WhatsApp पर पूछताछ करें',
    'btn.add_to_enquiry': 'पूछताछ सूची में जोड़ें',
    'btn.added_to_enquiry': 'सूची में जोड़ा गया',
    'btn.visit_showroom': 'शोरूम आएँ',
    'btn.book_appointment': 'शोरूम विजिट बुक करें',
    'btn.view_all_products': 'सभी उत्पाद देखें',
    'btn.download_catalogue': 'PDF कैटलॉग डाउनलोड करें',
    'btn.send_enquiry_whatsapp': 'WhatsApp पर पूछताछ भेजें',
    'btn.submit_form': 'वेबसाइट पर जमा करें',
    'btn.contact_us': 'संपर्क करें',
    'btn.clear_cart': 'सूची खाली करें',
    'btn.get_directions': 'रास्ता (Google Maps) देखें',

    // Section Titles & Subheadings
    'home.hero_overline': 'अपने स्थान को प्रीमियम बनाएं',
    'home.hero_title': 'THE LUXURY HUB',
    'home.hero_desc': 'प्रीमियम सेनेटरीवेयर, बाथरूम फिटिंग्स, लाइटिंग एवं इंटीरियर हार्डवेयर',
    'home.departments_title': 'आर्किटेक्चरल श्रेणियाँ',
    'home.departments_sub': 'हमारे प्रीमियम सेनेटरीवेयर, गोल्ड मिक्सर, रेन शावर और डिजाइनर हार्डवेयर का अन्वेषण करें।',
    'home.collections_title': 'विशेष स्टाइल कलेक्शंस',
    'home.featured_title': 'लोकप्रिय उत्पाद',
    'home.gallery_title': 'इंटीरियर प्रेरणा एवं गैलरी',
    'home.showroom_title': 'हमारे जयपुर शोरूम में पधारें',

    // Product Catalogue & Detail
    'catalog.title': 'डिजिटल उत्पाद कैटलॉग',
    'catalog.search': 'कीवर्ड या प्रोडक्ट कोड द्वारा खोजें...',
    'catalog.filter_category': 'श्रेणी (Category)',
    'catalog.filter_collection': 'कलेक्शन',
    'catalog.filter_brand': 'ब्रांड',
    'catalog.sort_by': 'क्रमबद्ध करें',
    'catalog.contact_for_price': 'कीमत के लिए संपर्क करें',
    'catalog.in_stock': 'उपलब्ध (In Stock)',
    'catalog.code': 'कोड',
    'catalog.material': 'सामग्री (Material)',
    'catalog.finish': 'फिनिश (Finish)',
    'catalog.dimensions': 'आकार (Dimensions)',
    'catalog.specifications': 'तकनीकी विवरण (Specifications)',
    'catalog.features': 'मुख्य विशेषताएं',
    'catalog.select_finish': 'फिनिश विकल्प चुनें:',

    // Enquiry Cart
    'enquiry.title': 'मेरी उत्पाद पूछताछ सूची',
    'enquiry.empty_title': 'आपकी पूछताछ सूची खाली है',
    'enquiry.empty_desc': 'हमारे कैटलॉग को देखें और अपनी आवश्यकताओं की सूची बनाने के लिए "सूची में जोड़ें" पर क्लिक करें।',
    'enquiry.items_count': 'चयनित उत्पाद',
    'enquiry.qty': 'मात्रा',

    // Showroom & Contact
    'showroom.title': 'प्रीमियम उत्पादों का प्रत्यक्ष अनुभव करें',
    'showroom.address': 'कालवाड़ रोड, मंगलम सिटी, गोविंदपुरा, जयपुर, राजस्थान 302012',
    'showroom.phones': 'शोरूम फोन नंबर',
    'contact.title': 'शोरूम संपर्क',
    'contact.send_query': 'अपनी पूछताछ भेजें',

    // Tooltips & Floating Buttons
    'whatsapp.tooltip': 'सहायता चाहिए? सीधे WhatsApp पर चैट करें'
  }
};
