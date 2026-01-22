import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Printer, Palette, Truck, Headphones, Shield, Zap } from 'lucide-react';

export const Services = () => {
  const { language, t, dir } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      const elements = ref.current.querySelectorAll('.service-card');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Printer,
      title: {
        en: 'Custom Printing',
        ar: 'الطباعة المخصصة',
        eg: 'الطباعة المخصصة',
      },
      description: {
        en: 'High-quality custom printing on all types of apparel using the latest printing techniques.',
        ar: 'طباعة مخصصة عالية الجودة على جميع أنواع الملابس باستخدام أحدث تقنيات الطباعة.',
        eg: 'طباعة مخصصة عالية الجودة على كل أنواع الملابس باستخدام أحدث تقنيات الطباعة.',
      },
    },
    {
      icon: Palette,
      title: {
        en: 'Design Services',
        ar: 'خدمات التصميم',
        eg: 'خدمات التصميم',
      },
      description: {
        en: 'Professional design services to help bring your vision to life.',
        ar: 'خدمات تصميم احترافية لمساعدتك في تحويل رؤيتك إلى واقع.',
        eg: 'خدمات تصميم احترافية عشان نساعدك تحقق رؤيتك.',
      },
    },
    {
      icon: Truck,
      title: {
        en: 'Fast Shipping',
        ar: 'شحن سريع',
        eg: 'شحن سريع',
      },
      description: {
        en: 'Quick and reliable shipping to get your orders to you as soon as possible.',
        ar: 'شحن سريع وموثوق لتوصيل طلباتك إليك في أسرع وقت ممكن.',
        eg: 'شحن سريع وموثوق عشان نوصل طلباتك ليك في أسرع وقت.',
      },
    },
    {
      icon: Headphones,
      title: {
        en: 'Customer Support',
        ar: 'دعم العملاء',
        eg: 'دعم العملاء',
      },
      description: {
        en: '24/7 customer support to assist you with any questions or concerns.',
        ar: 'دعم عملاء على مدار الساعة لمساعدتك في أي استفسارات أو مخاوف.',
        eg: 'دعم عملاء 24/7 عشان نساعدك في أي استفسارات.',
      },
    },
    {
      icon: Shield,
      title: {
        en: 'Quality Guarantee',
        ar: 'ضمان الجودة',
        eg: 'ضمان الجودة',
      },
      description: {
        en: '100% satisfaction guarantee on all our products and services.',
        ar: 'ضمان رضا 100٪ على جميع منتجاتنا وخدماتنا.',
        eg: 'ضمان رضا 100٪ على كل منتجاتنا وخدماتنا.',
      },
    },
    {
      icon: Zap,
      title: {
        en: 'Quick Turnaround',
        ar: 'تسليم سريع',
        eg: 'تسليم سريع',
      },
      description: {
        en: 'Fast production times without compromising on quality.',
        ar: 'أوقات إنتاج سريعة دون المساس بالجودة.',
        eg: 'أوقات إنتاج سريعة من غير ما نتخلى عن الجودة.',
      },
    },
  ];

  return (
    <div className="services-page" dir={dir} ref={ref}>
      <section className="services-hero fade-in">
        <h1>{t('ourServices')}</h1>
        <p>
          {language === 'en'
            ? 'We offer a comprehensive range of services to meet all your custom apparel needs.'
            : language === 'eg'
            ? 'احنا بنقدم مجموعة شاملة من الخدمات عشان نوافق احتياجاتك في الملابس المخصصة.'
            : 'نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجاتك في الملابس المخصصة.'}
        </p>
      </section>

      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="service-card fade-in">
              <div className="service-icon-wrapper">
                <Icon className="service-icon" size={48} />
              </div>
              <h3>{service.title[language] || service.title.en}</h3>
              <p>{service.description[language] || service.description.en}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


