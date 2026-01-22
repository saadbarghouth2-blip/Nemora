import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'ar' | 'eg' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Navigation labels.
    home: 'الرئيسية',
    productsNav: 'المنتجات',
    cart: 'السلة',
    checkout: 'الدفع',
    // Home page labels.
    heroTitle: 'ملابس مطبوعة حسب الطلب',
    heroSubtitle: 'صمم واطبع ذوقك الفريد على تيشيرتات وهوديز والمزيد بجودة عالية. عبر عن نفسك بتصاميمك الخاصة!',
    shopNow: 'تسوق الآن',
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'للطلبات فوق 500 جنيه',
    customDesign: 'تصميم مخصص',
    customDesignDesc: 'اطبع تصميمك الفريد',
    highQuality: 'جودة عالية',
    highQualityDesc: 'خامات وطباعة ممتازة',
    securePayment: 'دفع آمن',
    securePaymentDesc: 'دفع آمن ومشفر',
    featuredProducts: 'منتجات مميزة',
    viewAll: 'عرض الكل',
    // Products page labels.
    ourProducts: 'منتجاتنا',
    browseProducts: 'تصفح مجموعتنا من الملابس القابلة للتخصيص',
    searchProducts: 'ابحث عن المنتجات...',
    categories: 'التصنيفات',
    allProducts: 'كل المنتجات',
    tshirts: 'تيشيرتات',
    hoodies: 'هوديز',
    tankTops: 'تانك توب',
    polos: 'بولو',
    sweatshirts: 'سويت شيرت',
    jackets: 'جاكيتات',
    showing: 'عرض',
    products: 'منتج',
    noProductsFound: 'لا توجد منتجات مطابقة. جرب تعديل البحث او الفلاتر.',
    // Miscellaneous page labels.
    about: 'لماذا نحن',
    contact: 'تواصل معنا',
    gallery: 'المعرض',
    services: 'الخدمات',
    aboutUs: 'من نحن',
    ourStory: 'قصتنا',
    mission: 'رسالتنا',
    vision: 'رؤيتنا',
    getInTouch: 'تواصل معنا',
    sendMessage: 'ارسل رسالة',
    name: 'الاسم',
    message: 'الرسالة',
    send: 'ارسال',
    viewGallery: 'عرض المعرض',
    ourServices: 'خدماتنا',
    // Product detail labels.
    size: 'المقاس',
    color: 'اللون',
    customText: 'نص مخصص (اختياري)',
    customTextPlaceholder: 'اضف نصا للطباعة...',
    customTextDesc: 'اضف نصك ليتم طباعته على القطعة',
    quantity: 'الكمية',
    addToCart: 'اضف للسلة',
    outOfStock: 'هذا المنتج غير متوفر حاليا.',
    productNotFound: 'المنتج غير موجود',
    backToProducts: 'الرجوع للمنتجات',
    pleaseSelectSize: 'يرجى اختيار المقاس واللون',
    addedToCart: 'تمت الاضافة الى السلة!',
    // Cart labels.
    shoppingCart: 'سلة التسوق',
    clearCart: 'تفريغ السلة',
    yourCartIsEmpty: 'سلتك فارغة',
    emptyCartDesc: 'ابدأ باضافة منتجات الى السلة لتظهر هنا.',
    browseProductsCart: 'تصفح المنتجات',
    orderSummary: 'ملخص الطلب',
    subtotal: 'الاجمالي الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الاجمالي',
    proceedToCheckout: 'المتابعة للدفع',
    // Checkout labels.
    shippingInformation: 'معلومات الشحن',
    fullName: 'الاسم الكامل',
    email: 'البريد الالكتروني',
    address: 'العنوان',
    city: 'المدينة',
    state: 'المحافظة',
    zipCode: 'الرمز البريدي',
    country: 'الدولة',
    paymentInformation: 'معلومات الدفع',
    paymentNote: 'هذه تجربة. استخدم رقم البطاقة 4242 4242 4242 4242 مع اي تاريخ صلاحية مستقبلي و CVC.',
    processing: 'جار المعالجة',
    paymentSuccessful: 'تم الدفع بنجاح! تم تنفيذ الطلب.',
    paymentFailed: 'فشل الدفع. حاول مرة اخرى.',
    // Footer labels.
    footerDesc: 'نمورا تقدم طباعة وتطريزا ممتازين لقطع مميزة.',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    contactUs: 'تواصل معنا',
    shippingInfo: 'معلومات الشحن',
    returns: 'الارجاع',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    // Miscellaneous labels.
    sizeLabel: 'المقاس',
    colorLabel: 'اللون',
    customLabel: 'تخصيص',
    qtyLabel: 'الكمية',
    // Extra products page labels.
    discoverCollection: 'اكتشف المجموعة',
    shop: 'تسوق',
    searchPlaceholder: 'ابحث عن المنتجات...',
    filterByCategory: 'تصفية حسب التصنيف',
    resultsFound: 'نتيجة',
    changeLanguage: 'تغيير اللغة',
  },
  en: {
    // Navigation labels.
    home: 'Home',
    productsNav: 'Products',
    cart: 'Cart',
    checkout: 'Checkout',
    // Home page labels.
    heroTitle: 'Custom Printed Apparel',
    heroSubtitle: 'Design and print your unique style on high-quality t-shirts, hoodies, and more. Express yourself with custom designs!',
    shopNow: 'Shop Now',
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'On orders over 500 EGP',
    customDesign: 'Custom Design',
    customDesignDesc: 'Print your unique designs',
    highQuality: 'High Quality',
    highQualityDesc: 'Premium materials & printing',
    securePayment: 'Secure Payment',
    securePaymentDesc: 'Safe & encrypted checkout',
    featuredProducts: 'Featured Products',
    viewAll: 'View All',
    // Products page labels.
    ourProducts: 'Our Products',
    browseProducts: 'Browse our collection of customizable apparel',
    searchProducts: 'Search products...',
    categories: 'Categories',
    allProducts: 'All Products',
    tshirts: 'T-Shirts',
    hoodies: 'Hoodies',
    tankTops: 'Tank Tops',
    polos: 'Polo Shirts',
    sweatshirts: 'Sweatshirts',
    jackets: 'Jackets',
    showing: 'Showing',
    products: 'product',
    noProductsFound: 'No products found. Try adjusting your search or filters.',
    // Product detail labels.
    size: 'Size',
    color: 'Color',
    customText: 'Custom Text (Optional)',
    customTextPlaceholder: 'Add custom text to print...',
    customTextDesc: 'Add your own text to be printed on the item',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    outOfStock: 'This product is currently out of stock.',
    productNotFound: 'Product not found',
    backToProducts: 'Back to Products',
    pleaseSelectSize: 'Please select size and color',
    addedToCart: 'Added to cart!',
    // Cart labels.
    shoppingCart: 'Shopping Cart',
    clearCart: 'Clear Cart',
    yourCartIsEmpty: 'Your cart is empty',
    emptyCartDesc: 'Start adding items to your cart to see them here.',
    browseProductsCart: 'Browse Products',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    // Checkout labels.
    shippingInformation: 'Shipping Information',
    fullName: 'Full Name',
    email: 'Email',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    country: 'Country',
    paymentInformation: 'Payment Information',
    paymentNote: 'This is a demo. Use card number 4242 4242 4242 4242 with any future expiry date and CVC.',
    processing: 'Processing',
    paymentSuccessful: 'Payment successful! Order placed.',
    paymentFailed: 'Payment failed. Please try again.',
    // Footer labels.
    footerDesc: 'Nemora delivers premium printing and embroidery for standout pieces.',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    contactUs: 'Contact Us',
    shippingInfo: 'Shipping Info',
    returns: 'Returns',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved',
    // Miscellaneous labels.
    sizeLabel: 'Size',
    colorLabel: 'Color',
    customLabel: 'Custom',
    qtyLabel: 'Qty',
    // Miscellaneous page labels.
    about: 'Why Us',
    contact: 'Contact',
    gallery: 'Gallery',
    services: 'Services',
    aboutUs: 'Why Us',
    ourStory: 'Our Story',
    mission: 'Mission',
    vision: 'Vision',
    getInTouch: 'Get In Touch',
    sendMessage: 'Send Message',
    name: 'Name',
    message: 'Message',
    send: 'Send',
    viewGallery: 'View Gallery',
    ourServices: 'Our Services',
    // Extra products page labels.
    discoverCollection: 'Discover Collection',
    shop: 'Shop',
    searchPlaceholder: 'Search products...',
    filterByCategory: 'Filter by Category',
    resultsFound: 'results',
    changeLanguage: 'Change Language',
  },
  eg: {
    // Navigation labels.
    home: 'الرئيسية',
    productsNav: 'المنتجات',
    cart: 'السلة',
    checkout: 'الدفع',
    // Home page labels.
    heroTitle: 'ملابس مطبوعة حسب الطلب',
    heroSubtitle: 'صمم واطبع ذوقك الفريد على تيشيرتات وهوديز والمزيد بجودة عالية. عبر عن نفسك بتصاميمك الخاصة!',
    shopNow: 'تسوق الآن',
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'للطلبات فوق 500 جنيه',
    customDesign: 'تصميم مخصص',
    customDesignDesc: 'اطبع تصميمك الفريد',
    highQuality: 'جودة عالية',
    highQualityDesc: 'خامات وطباعة ممتازة',
    securePayment: 'دفع آمن',
    securePaymentDesc: 'دفع آمن ومشفر',
    featuredProducts: 'منتجات مميزة',
    viewAll: 'عرض الكل',
    // Products page labels.
    ourProducts: 'منتجاتنا',
    browseProducts: 'تصفح مجموعتنا من الملابس القابلة للتخصيص',
    searchProducts: 'ابحث عن المنتجات...',
    categories: 'التصنيفات',
    allProducts: 'كل المنتجات',
    tshirts: 'تيشيرتات',
    hoodies: 'هوديز',
    tankTops: 'تانك توب',
    polos: 'بولو',
    sweatshirts: 'سويت شيرت',
    jackets: 'جاكيتات',
    showing: 'عرض',
    products: 'منتج',
    noProductsFound: 'لا توجد منتجات مطابقة. جرب تعديل البحث او الفلاتر.',
    // Miscellaneous page labels.
    about: 'لماذا نحن',
    contact: 'تواصل معنا',
    gallery: 'المعرض',
    services: 'الخدمات',
    aboutUs: 'من نحن',
    ourStory: 'قصتنا',
    mission: 'رسالتنا',
    vision: 'رؤيتنا',
    getInTouch: 'تواصل معنا',
    sendMessage: 'ارسل رسالة',
    name: 'الاسم',
    message: 'الرسالة',
    send: 'ارسال',
    viewGallery: 'عرض المعرض',
    ourServices: 'خدماتنا',
    // Product detail labels.
    size: 'المقاس',
    color: 'اللون',
    customText: 'نص مخصص (اختياري)',
    customTextPlaceholder: 'اضف نصا للطباعة...',
    customTextDesc: 'اضف نصك ليتم طباعته على القطعة',
    quantity: 'الكمية',
    addToCart: 'اضف للسلة',
    outOfStock: 'هذا المنتج غير متوفر حاليا.',
    productNotFound: 'المنتج غير موجود',
    backToProducts: 'الرجوع للمنتجات',
    pleaseSelectSize: 'يرجى اختيار المقاس واللون',
    addedToCart: 'تمت الاضافة الى السلة!',
    // Cart labels.
    shoppingCart: 'سلة التسوق',
    clearCart: 'تفريغ السلة',
    yourCartIsEmpty: 'سلتك فارغة',
    emptyCartDesc: 'ابدأ باضافة منتجات الى السلة لتظهر هنا.',
    browseProductsCart: 'تصفح المنتجات',
    orderSummary: 'ملخص الطلب',
    subtotal: 'الاجمالي الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الاجمالي',
    proceedToCheckout: 'المتابعة للدفع',
    // Checkout labels.
    shippingInformation: 'معلومات الشحن',
    fullName: 'الاسم الكامل',
    email: 'البريد الالكتروني',
    address: 'العنوان',
    city: 'المدينة',
    state: 'المحافظة',
    zipCode: 'الرمز البريدي',
    country: 'الدولة',
    paymentInformation: 'معلومات الدفع',
    paymentNote: 'هذه تجربة. استخدم رقم البطاقة 4242 4242 4242 4242 مع اي تاريخ صلاحية مستقبلي و CVC.',
    processing: 'جار المعالجة',
    paymentSuccessful: 'تم الدفع بنجاح! تم تنفيذ الطلب.',
    paymentFailed: 'فشل الدفع. حاول مرة اخرى.',
    // Footer labels.
    footerDesc: 'نمورا تقدم طباعة وتطريزا ممتازين لقطع مميزة.',
    quickLinks: 'روابط سريعة',
    customerService: 'خدمة العملاء',
    contactUs: 'تواصل معنا',
    shippingInfo: 'معلومات الشحن',
    returns: 'الارجاع',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة',
    // Miscellaneous labels.
    sizeLabel: 'المقاس',
    colorLabel: 'اللون',
    customLabel: 'تخصيص',
    qtyLabel: 'الكمية',
    // Extra products page labels.
    discoverCollection: 'اكتشف المجموعة',
    shop: 'تسوق',
    searchPlaceholder: 'ابحث عن المنتجات...',
    filterByCategory: 'تصفية حسب التصنيف',
    resultsFound: 'نتيجة',
    changeLanguage: 'تغيير اللغة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.dir = (lang === 'ar' || lang === 'eg') ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations.ar;
    return langTranslations[key as keyof typeof translations.ar] || key;
  };

  const dir = (language === 'ar' || language === 'eg') ? 'rtl' : 'ltr';

  // Sync document language and direction with state.
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
