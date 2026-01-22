import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  Palette,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Star,
  Award,
  Users,
  CheckCircle,
  Package,
  Clock,
  Flame
} from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import { StyleAssistant } from '../components/StyleAssistant';

type Lang = 'ar' | 'eg' | 'en';

type CounterProps = {
  value: number;
  suffix?: string;
};

const Counter: React.FC<CounterProps> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  badge: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Hoodie',
    price: 899,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    rating: 4.9,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Classic T-Shirt',
    price: 449,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    rating: 4.8,
    badge: 'New'
  },
  {
    id: 3,
    name: 'Graphic Tee',
    price: 499,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
    rating: 4.7,
    badge: 'Hot'
  },
  {
    id: 4,
    name: 'Sport Hoodie',
    price: 799,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    rating: 4.9,
    badge: 'Trending'
  },
  {
    id: 5,
    name: 'Urban Jacket',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    rating: 5.0,
    badge: 'Premium'
  },
  {
    id: 6,
    name: 'Cotton Blend',
    price: 599,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    rating: 4.6,
    badge: 'Sale'
  },
  {
    id: 7,
    name: 'Oversized Tee',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    rating: 4.8,
    badge: 'Popular'
  },
  {
    id: 8,
    name: 'Street Sweatshirt',
    price: 699,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500',
    rating: 4.7,
    badge: 'Limited'
  },
  {
    id: 9,
    name: 'Canvas Jacket',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=500',
    rating: 4.9,
    badge: 'Premium'
  },
  {
    id: 10,
    name: 'Daily Crewneck',
    price: 649,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500',
    rating: 4.6,
    badge: 'Best Value'
  },
  {
    id: 11,
    name: 'Printed Hoodie - Galaxy',
    price: 999,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
    rating: 4.9,
    badge: 'Printed'
  },
  {
    id: 12,
    name: 'Printed Hoodie - Neon',
    price: 949,
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500',
    rating: 4.8,
    badge: 'New Drop'
  },
  {
    id: 13,
    name: 'Printed Hoodie - Street Art',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    rating: 4.9,
    badge: 'Hot'
  },
];

type Testimonial = {
  name: string;
  text: string;
  rating: number;
  avatar: string;
};

export default function Home() {
  const { language, dir } = useLanguage();
  const lang = (language as Lang) || 'ar';
  const isAr = lang === 'ar' || lang === 'eg';

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-embroidery-machine-working-17712-full-hd.mp4';

  const content: Record<Lang, any> = {
    ar: {
      heroTitle: 'أناقة مطلقة',
      heroSubtitle: 'قطع مميزة تعكس شخصيتك بذوق فريد',
      shopNow: 'تسوق الآن',
      exploreMore: 'اكتشف المزيد',

      freeShipping: 'شحن مجاني',
      freeShippingDesc: 'توصيل سريع لكل المحافظات',
      customDesign: 'تصميم مخصص',
      customDesignDesc: 'اختار الألوان والطباعة والتفاصيل',
      highQuality: 'جودة عالية',
      highQualityDesc: 'خامة ممتازة وتشطيب نظيف',
      securePayment: 'دفع آمن',
      securePaymentDesc: 'حماية كاملة للمدفوعات',

      featuredTitle: 'القطع المختارة',
      viewAll: 'عرض الكل',

      whyUs: 'لماذا نمورا؟',
      testimonials: 'آراء العملاء',

      brandWord1: 'هوديز مطبوعة',
      brandWord2: 'طباعة وتطريز',

      journeyTitle: 'رحلة تصميمك',
      journeySubtitle: 'من الفكرة للتسليم في 4 خطوات',
      step1Title: 'اختار القطعة',
      step1Desc: 'هودي، تيشيرت، جاكيت',
      step2Title: 'خصّص تصميمك',
      step2Desc: 'ألوان وطباعة وتفاصيل',
      step3Title: 'فحص الجودة',
      step3Desc: 'تشطيب دقيق ومعايير عالية',
      step4Title: 'توصيل سريع',
      step4Desc: 'يوصل لحد بابك خلال 24–48 ساعة',

      premiumKicker: 'مجموعة نمورا المميزة',
      artWord: 'فن',

      stats: {
        clients: 'عميل واثق',
        designs: 'تصميم فريد',
        satisfaction: 'رضا العملاء',
        shipping: 'شحن سريع',
      },

      processLabel: 'العملية'
    },

    eg: {
      heroTitle: 'أناقة مظبوطة',
      heroSubtitle: 'قطع شيك تعكس شخصيتك بذوقك',
      shopNow: 'تسوق دلوقتي',
      exploreMore: 'اعرف أكتر',

      freeShipping: 'شحن ببلاش',
      freeShippingDesc: 'توصيل سريع لكل المحافظات',
      customDesign: 'تصميم على مزاجك',
      customDesignDesc: 'اختار اللون والطباعة والتفاصيل اللي تحبها',
      highQuality: 'جودة عالية',
      highQualityDesc: 'خامة محترمة وتشطيب نضيف',
      securePayment: 'دفع مضمون',
      securePaymentDesc: 'حماية كاملة للمدفوعات',

      featuredTitle: 'اختياراتنا ليك',
      viewAll: 'شوف الكل',

      whyUs: 'ليه Nemora؟',
      testimonials: 'ناس قالت إيه؟',

      brandWord1: 'هوديز مطبوعة',
      brandWord2: 'طباعة + تطريز',

      journeyTitle: 'رحلة تصميمك',
      journeySubtitle: 'من الفكرة للتسليم في 4 خطوات بسيطة',
      step1Title: 'اختار القطعة',
      step1Desc: 'هودي، تيشيرت، جاكيت',
      step2Title: 'ظبّط تصميمك',
      step2Desc: 'ألوان + طباعة + تفاصيل',
      step3Title: 'مراجعة الجودة',
      step3Desc: 'تشطيب مظبوط ومعايير عالية',
      step4Title: 'توصيل سريع',
      step4Desc: 'يوصل لحد بابك خلال 24–48 ساعة',

      premiumKicker: 'مجموعة Nemora المميزة',
      artWord: 'فن',

      stats: {
        clients: 'عميل واثق',
        designs: 'تصميم مختلف',
        satisfaction: 'رضا الناس',
        shipping: 'شحن سريع',
      },

      processLabel: 'الخطوات'
    },

    en: {
      heroTitle: 'Absolute Elegance',
      heroSubtitle: 'Unique pieces crafted to express your personality',
      shopNow: 'Shop Now',
      exploreMore: 'Explore More',

      freeShipping: 'Free Shipping',
      freeShippingDesc: 'Fast delivery nationwide',
      customDesign: 'Custom Design',
      customDesignDesc: 'Design your piece your way',
      highQuality: 'Premium Quality',
      highQualityDesc: 'Clean finish & top materials',
      securePayment: 'Secure Payment',
      securePaymentDesc: 'Full protection guaranteed',

      featuredTitle: 'Featured Collection',
      viewAll: 'View All',

      whyUs: 'Why Nemora?',
      testimonials: 'Customer Reviews',

      brandWord1: 'Printed Hoodies',
      brandWord2: 'Printing & Embroidery',

      journeyTitle: 'Your Design Journey',
      journeySubtitle: 'From idea to delivery in 4 steps',
      step1Title: 'Pick Your Base',
      step1Desc: 'Hoodie, tee, or jacket',
      step2Title: 'Customize Your Art',
      step2Desc: 'Colors, prints, and details',
      step3Title: 'Quality Check',
      step3Desc: 'Precision craftsmanship',
      step4Title: 'Fast Delivery',
      step4Desc: 'At your door in 24–48h',

      premiumKicker: 'Nemora Premium Collection',
      artWord: 'Art',

      stats: {
        clients: 'Trusted Clients',
        designs: 'Unique Designs',
        satisfaction: 'Satisfaction',
        shipping: 'Fast Shipping',
      },

      processLabel: 'PROCESS'
    }
  };

  const copy = content[lang] || content.ar;

  const journeySteps = useMemo(
    () => [
      { icon: <Package size={28} />, title: copy.step1Title, desc: copy.step1Desc },
      { icon: <Palette size={28} />, title: copy.step2Title, desc: copy.step2Desc },
      { icon: <CheckCircle size={28} />, title: copy.step3Title, desc: copy.step3Desc },
      { icon: <Clock size={28} />, title: copy.step4Title, desc: copy.step4Desc }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const testimonialsByLang: Record<Lang, Testimonial[]> = {
    ar: [
      { name: 'سارة محمد', text: 'الخامة ممتازة والتفاصيل دقيقة. التوصيل كان سريع جدًا.', rating: 5, avatar: 'س م' },
      { name: 'أحمد علاء', text: 'القطعة شكلها أحلى من الصور والتطريز متقن جدًا.', rating: 5, avatar: 'أ ع' },
      { name: 'نهى كريم', text: 'خدمة العملاء محترمة والتبديل كان سهل وسريع.', rating: 5, avatar: 'ن ك' }
    ],
    eg: [
      { name: 'سارة محمد', text: 'الخامة تحفة والتفاصيل مظبوطة… والتوصيل جه بسرعة.', rating: 5, avatar: 'س م' },
      { name: 'أحمد علاء', text: 'القطعة طلعت أحلى من الصور بكتير… والتطريز جامد.', rating: 5, avatar: 'أ ع' },
      { name: 'نهى كريم', text: 'الدعم رد بسرعة والتبديل اتعمل من غير وجع دماغ.', rating: 5, avatar: 'ن ك' }
    ],
    en: [
      { name: 'Sarah M.', text: 'Premium fabric and clean stitching. Delivered fast and neatly packed.', rating: 5, avatar: 'SM' },
      { name: 'Ahmed A.', text: 'Looks even better than the photos. Perfect fit and quality.', rating: 5, avatar: 'AA' },
      { name: 'Nora K.', text: 'Support was responsive and the exchange was super easy.', rating: 5, avatar: 'NK' }
    ]
  };

  const testimonials = testimonialsByLang[lang] || testimonialsByLang.ar;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    setActiveTestimonial(0);
  }, [lang]);

  // ✅ تثبيت الـ random shapes (عشان ما يتغيروش كل رندر)
  const floatingShapes = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      i,
      size: 200 + i * 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      x1: Math.random() * 100 - 50,
      y1: Math.random() * 100 - 50,
      duration: 10 + i * 2,
    }));
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', overflowX: 'hidden' }} dir={dir}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Cairo', sans-serif;
          background: var(--bg-main);
          color: var(--text-main);
        }

        .logo-intro {
          position: relative;
          padding: 80px 7% 30px;
          display: flex;
          justify-content: center;
        }

        .logo-shell {
          position: relative;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 30px 42px;
          border-radius: 36px;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: 0 20px 50px rgba(43, 32, 24, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .logo-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, var(--primary-soft), transparent 60%);
          opacity: 0.7;
          pointer-events: none;
        }

        .logo-badge {
          width: 100px;
          height: 100px;
          border-radius: 26px;
          background: var(--bg-secondary);
          display: grid;
          place-items: center;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          border: 2px solid var(--border);
        }

        .logo-badge img {
          width: 82px;
          height: 82px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.35));
        }

        .logo-words {
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1;
        }

        .logo-words span:first-child {
          font-weight: 900;
          font-size: 1.6rem;
          color: var(--text-main);
          letter-spacing: -0.5px;
        }

        .logo-words span:last-child {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-muted);
        }
          
        .home-section { padding: 100px 7%; }
        .home-section-alt { background: var(--bg-secondary); }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #000;
        }

        .video-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: url('/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png') center/cover no-repeat;
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.55;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6));
          z-index: 1;
        }

        .stitch-lines {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            repeating-linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.08) 0,
              rgba(255, 255, 255, 0.08) 8px,
              transparent 8px,
              transparent 18px
            );
          mask-image: radial-gradient(circle at 30% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%),
                      radial-gradient(circle at 70% 60%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%);
          animation: stitch-drift 18s linear infinite;
        }

        .needle-sweep {
          position: absolute;
          top: 15%;
          ${isAr ? 'right: -10%;' : 'left: -10%;'}
          width: 320px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          box-shadow: 0 0 18px rgba(255,255,255,0.5);
          transform: rotate(-12deg);
          z-index: 3;
          opacity: 0.7;
          animation: needle-sweep 6s ease-in-out infinite;
        }

        .fabric-swash {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(120% 60% at 10% 80%, rgba(249, 203, 40, 0.12), transparent 55%),
            radial-gradient(120% 60% at 90% 20%, rgba(255, 77, 77, 0.14), transparent 60%);
          filter: blur(4px);
          animation: swash-breathe 10s ease-in-out infinite;
        }

        .sparkle-field { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0));
          animation: sparkle-float 5s ease-in-out infinite;
        }

        @keyframes stitch-drift {
          0% { background-position: 0 0; opacity: 0.5; }
          50% { background-position: 120px 80px; opacity: 0.8; }
          100% { background-position: 0 0; opacity: 0.5; }
        }

        @keyframes needle-sweep {
          0%, 100% { transform: translateX(0) rotate(-12deg); opacity: 0.4; }
          50% { transform: translateX(140%) rotate(-6deg); opacity: 0.9; }
        }

        @keyframes swash-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.03); }
        }

        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.4; }
          50% { transform: translateY(-12px) scale(1.2); opacity: 0.9; }
        }

        .animated-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: radial-gradient(circle at 20% 50%, var(--primary-soft), transparent 50%),
                      radial-gradient(circle at 80% 50%, var(--primary-glow), transparent 50%);
        }

        .floating-shapes { position: absolute; width: 100%; height: 100%; overflow: hidden; z-index: 2; }
        .shape {
          position: absolute;
          background: linear-gradient(135deg, var(--primary-soft), var(--primary-soft));
          border-radius: 50%;
          filter: blur(60px);
        }

        .glass-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 30px;
          padding: 50px;
        }

        .hero-glass {
          background: rgba(10, 12, 20, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.55);
          padding: 36px;
          max-width: 520px;
        }

        .hero-media {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .hero-media-card {
          position: relative;
          width: min(420px, 90vw);
          padding: 12px;
          border-radius: 34px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 30px 70px rgba(43, 32, 24, 0.35);
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .hero-media-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent 45%);
          opacity: 0.6;
          pointer-events: none;
        }

        .hero-media-img { display: block; width: 100%; border-radius: 26px; }

        .hero-media-chip {
          position: absolute;
          top: -18px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 18px 35px rgba(43, 32, 24, 0.2);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .hero-media-chip:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 40px rgba(43, 32, 24, 0.25);
        }

        .hero-media-chip-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: var(--primary-soft);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hero-media-chip-title { font-weight: 800; font-size: 0.95rem; color: var(--text-main); }
        .hero-media-chip-subtitle { font-weight: 600; font-size: 0.8rem; color: var(--text-muted); }

        [data-theme='light'] .video-container video,
        body.light .video-container video { opacity: 0.45; }

        [data-theme='light'] .video-overlay,
        body.light .video-overlay {
          background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 248, 240, 0.75));
        }

        [data-theme='light'] .hero-glass,
        body.light .hero-glass {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(43, 32, 24, 0.08);
          box-shadow: 0 25px 50px -20px rgba(43, 32, 24, 0.18);
        }

        .btn-primary {
          background: var(--gradient-primary);
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          color: white;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: var(--shadow-primary);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px var(--primary-glow);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid var(--border);
          padding: 16px 35px;
          border-radius: 50px;
          color: var(--text-main);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .btn-secondary:hover { border-color: var(--primary); background: var(--primary-soft); }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin: -80px 7% 80px;
          position: relative;
          z-index: 10;
        }

        .stat-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 35px;
          text-align: center;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 25px;
          padding: 40px;
          text-align: center;
          transition: all 0.4s;
        }

        .feature-card:hover {
          background: var(--bg-hover);
          border-color: rgba(199, 119, 47, 0.5);
          transform: translateY(-5px);
        }

        .featured-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }

        .product-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 25px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(199, 119, 47, 0.5);
          box-shadow: 0 30px 60px rgba(199, 119, 47, 0.3);
        }

        .product-badge {
          position: absolute;
          top: 15px;
          ${isAr ? 'left: 15px;' : 'right: 15px;'}
          background: var(--gradient-primary);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 10;
          text-transform: uppercase;
        }

        .rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-hover);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .journey-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 30px;
          transition: all 0.4s;
        }

        .journey-card:hover {
          transform: translateY(-6px);
          border-color: rgba(199, 119, 47, 0.5);
          box-shadow: 0 20px 50px rgba(199, 119, 47, 0.2);
        }

        .testimonial-shell {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        .testimonial-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 45px;
          overflow: hidden;
        }

        .testimonial-quote {
          position: absolute;
          top: 15px;
          ${isAr ? 'right: 25px;' : 'left: 25px;'}
          font-size: 4rem;
          color: var(--border-light);
          font-weight: 800;
          opacity: 0.6;
        }

        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
        }

        .testimonial-dot.active {
          background: var(--gradient-primary);
          border-color: transparent;
          transform: scale(1.2);
        }

        .hoodie-card {
          background: linear-gradient(135deg, rgba(199, 119, 47, 0.16), rgba(12, 9, 7, 0.92));
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          box-shadow: var(--shadow-lg);
        }

        .hoodie-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }

        .hoodie-title {
          font-size: clamp(2rem, 4vw, 3.1rem);
          font-weight: 900;
          margin-bottom: 12px;
        }

        .hoodie-subtitle {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .hoodie-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        @media (max-width: 968px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            justify-items: center;
            text-align: center;
          }
          .hero-glass { margin: 0 auto; }
          .hero-kicker, .hero-actions { justify-content: center; }
          .glass-card { padding: 30px; }
          .testimonial-shell { grid-template-columns: 1fr; }
          .hoodie-card { flex-direction: column; text-align: center; }
          .hoodie-actions { justify-content: center; }
          .logo-shell { flex-direction: column; text-align: center; align-items: center; }
          .hero-media { flex-direction: column; }
          .hero-media-chip { position: static; margin: 16px auto 0; }
        }

        @media (max-width: 768px) {
          .home-section { padding: 70px 6% !important; }
          .logo-intro { padding: 60px 6% 10px; }
          .logo-shell { padding: 20px 24px; border-radius: 24px; }
          .logo-badge { width: 70px; height: 70px; }
          .logo-badge img { width: 58px; height: 58px; }

          .hero-grid { gap: 40px !important; padding: 0 6% !important; text-align: center; }
          .hero-glass { max-width: 100%; padding: 28px; margin: 0 auto; text-align: center; }
          .hero-glass h1 { font-size: clamp(2.1rem, 8vw, 3rem) !important; }
          .hero-glass p { font-size: 1.05rem !important; margin-bottom: 28px !important; }
          .hero-kicker, .hero-actions { justify-content: center; }
          .hero-actions { width: 100%; }
          .hero-grid .btn-primary, .hero-grid .btn-secondary { width: 100%; justify-content: center; }

          .hero-media-card { width: min(340px, 92vw); }
          .hero-media-chip { margin: 14px auto 0; }

          .stats-container {
            margin: -60px 6% 60px;
            gap: 16px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .stat-card { padding: 24px; }

          .feature-card { padding: 28px; }
          .feature-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 22px; }

          .featured-product-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 22px; }
          .product-card img { height: 260px !important; }

          .testimonial-card { padding: 30px; }
          .testimonial-quote { font-size: 3rem; }
        }

        @media (max-width: 520px) {
          .feature-grid, .featured-product-grid { grid-template-columns: 1fr; gap: 18px; }
          .product-card img { height: 220px !important; }
        }
      `}</style>

      {/* Logo intro */}
      <section className="logo-intro">
        <motion.div
          className="logo-shell"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="logo-badge"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src="/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png" alt="Nemora logo" />
          </motion.div>

          <motion.div
            className="logo-words"
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span>{copy.brandWord1}</span>
            <span>{copy.brandWord2}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero */}
      <section className="hero-section">
        <div className="video-container">
          <video autoPlay muted loop playsInline poster="/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png">
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </div>

        <div className="fabric-swash" />
        <div className="stitch-lines" />
        <div className="needle-sweep" />

        <div className="sparkle-field">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                top: `${10 + i * 8}%`,
                left: `${(i * 9) % 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + (i % 4)}s`
              }}
            />
          ))}
        </div>

        <motion.div className="animated-bg" style={{ scale: scaleProgress, opacity: opacityProgress }} />

        <div className="floating-shapes">
          {floatingShapes.map((s) => (
            <motion.div
              key={s.i}
              className="shape"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                top: `${s.top}%`,
                left: `${s.left}%`,
              }}
              animate={{ x: [0, s.x1, 0], y: [0, s.y1, 0] }}
              transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            padding: '0 7%',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '90px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: isAr ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="glass-card hero-glass">
              <motion.div
                className="hero-kicker"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  color: 'var(--primary)'
                }}
              >
                <Flame size={24} />
                <span style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>
                  {copy.premiumKicker}{' '}
                  <span style={{ color: 'var(--primary)' }}>{copy.artWord}</span>
                </span>
              </motion.div>

              <motion.h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '25px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {isAr ? 'فن' : 'THE ART OF '}
                <br />
                <span
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {copy.heroTitle}
                </span>
              </motion.h1>

              <motion.p
                style={{
                  fontSize: '1.3rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '40px',
                  lineHeight: 1.7
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {copy.heroSubtitle}
              </motion.p>

              <motion.div
                className="hero-actions"
                style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Link className="btn-primary" to="/products">
                  {copy.shopNow} <ShoppingBag size={20} />
                </Link>
                <Link className="btn-secondary" to="/about">
                  {copy.exploreMore} <ArrowRight size={20} style={{ transform: isAr ? 'rotate(180deg)' : 'none' }} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="hero-media"
            initial={{ opacity: 0, scale: 0.9, rotate: isAr ? 2 : -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ scale: 1.02, rotate: isAr ? -1.2 : 1.2 }}
            style={{ x: isAr ? -18 : 18 }}
          >
            <motion.div
              className="hero-media-card"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.img
                src="/assets/images/WhatsApp Image 2026-01-08 at 1.48.22 PM.jpeg"
                alt="Nemora Hoodie"
                className="hero-media-img"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            <motion.div
              className="hero-media-chip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ [isAr ? 'left' : 'right']: '-12px' }}
            >
              <div className="hero-media-chip-icon">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="hero-media-chip-title">{copy.brandWord1}</div>
                <div className="hero-media-chip-subtitle">{copy.brandWord2}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-container">
        {[
          { icon: <Users size={30} />, value: 15, suffix: 'K+', label: copy.stats.clients },
          { icon: <Award size={30} />, value: 450, suffix: '+', label: copy.stats.designs },
          { icon: <Star size={30} />, value: 100, suffix: '%', label: copy.stats.satisfaction },
          { icon: <Truck size={30} />, value: 24, suffix: 'H', label: copy.stats.shipping }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, borderColor: 'rgba(199, 119, 47, 0.5)' }}
          >
            <motion.div
              style={{
                color: 'var(--primary)',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.icon}
            </motion.div>

            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>

            <div
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why Us */}
      <section className="home-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '20px' }}>
            {copy.whyUs}
          </h2>
          <div
            style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary), var(--primary-hover))',
              margin: '0 auto'
            }}
          />
        </motion.div>

        <div className="feature-grid">
          {[
            { icon: <Truck size={40} />, title: copy.freeShipping, desc: copy.freeShippingDesc, color: 'var(--primary)', bg: 'var(--primary-soft)' },
            { icon: <Palette size={40} />, title: copy.customDesign, desc: copy.customDesignDesc, color: 'var(--primary-hover)', bg: 'var(--primary-soft)' },
            { icon: <Sparkles size={40} />, title: copy.highQuality, desc: copy.highQualityDesc, color: 'var(--primary)', bg: 'var(--primary-soft)' },
            { icon: <ShieldCheck size={40} />, title: copy.securePayment, desc: copy.securePaymentDesc, color: 'var(--primary-hover)', bg: 'var(--primary-soft)' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                style={{
                  width: '80px',
                  height: '80px',
                  background: feature.bg,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  color: feature.color
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="home-section home-section-alt">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <motion.h2
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '15px' }}
            >
              {copy.featuredTitle}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              viewport={{ once: true }}
              style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--primary-hover))' }}
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link className="btn-secondary" to="/products">
              {copy.viewAll} <ArrowRight size={20} style={{ transform: isAr ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </motion.div>
        </div>

        <div className="featured-product-grid">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="product-badge">{product.badge}</div>

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link className="btn-primary" to={`/products/${product.id}`} style={{ padding: '15px 30px' }}>
                      <ShoppingBag size={20} /> {copy.shopNow}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{product.name}</div>
                  <div className="rating-pill">
                    <Star size={14} />
                    {product.rating}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>EGP {product.price}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const filled = idx < Math.round(product.rating);
                      return (
                        <Star
                          key={idx}
                          size={14}
                          color={filled ? 'var(--primary-hover)' : 'var(--border)'}
                          fill={filled ? 'var(--primary-hover)' : 'transparent'}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="home-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary-hover)',
              marginBottom: '12px',
              letterSpacing: '2px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <Zap size={18} />
            {copy.processLabel}
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, marginBottom: '15px' }}>
            {copy.journeyTitle}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{copy.journeySubtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '25px' }}>
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              className="journey-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'var(--bg-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '18px'
                }}
              >
                {step.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section home-section-alt">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, marginBottom: '15px' }}>
            {copy.testimonials}
          </h2>
          <div style={{ width: '90px', height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--primary-hover))', margin: '0 auto' }} />
        </motion.div>

        <div className="testimonial-shell">
          <motion.div
            key={activeTestimonial}
            className="testimonial-card"
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="testimonial-quote">❝</div>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '25px' }}>
              {testimonials[activeTestimonial].text}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}
              >
                {testimonials[activeTestimonial].avatar}
              </div>

              <div>
                <div style={{ fontWeight: 800 }}>{testimonials[activeTestimonial].name}</div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, idx) => (
                    <Star key={idx} size={14} color="var(--primary-hover)" fill="var(--primary-hover)" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {testimonials.map((item, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveTestimonial(i)}
                whileHover={{ y: -4 }}
                style={{
                  textAlign: isAr ? 'right' : 'left',
                  background: i === activeTestimonial ? 'var(--bg-hover)' : 'var(--bg-card)',
                  border: i === activeTestimonial ? '1px solid rgba(199, 119, 47, 0.4)' : '1px solid var(--border)',
                  borderRadius: '18px',
                  padding: '18px',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: '6px' }}>{item.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, maxHeight: '2.7em', overflow: 'hidden' }}>
                  {item.text}
                </div>
              </motion.button>
            ))}

            <div style={{ display: 'flex', gap: '10px', justifyContent: isAr ? 'flex-start' : 'flex-end' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`testimonial-${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Hoodie */}
      <section className="home-section">
        <motion.div
          className="hoodie-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: isAr ? 'right' : 'left' }}
        >
          <div>
            <div className="hoodie-kicker">
              {copy.premiumKicker} <span style={{ color: 'var(--primary)' }}>{copy.artWord}</span>
            </div>
            <div className="hoodie-title">{copy.heroTitle}</div>
            <p className="hoodie-subtitle">{copy.heroSubtitle}</p>
          </div>

          <div className="hoodie-actions">
            <Link className="btn-primary" to="/products">
              {copy.shopNow}
            </Link>
            <Link className="btn-secondary" to="/about">
              {copy.exploreMore}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Style assistant */}
      <section className="home-section">
        <StyleAssistant />
      </section>
    </div>
  );
}
