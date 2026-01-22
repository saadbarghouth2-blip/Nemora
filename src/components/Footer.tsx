import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

// Helper component that scrolls to the top on route changes.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export const Footer = () => {
  const { t, dir, language } = useLanguage();
  const isRtl = language === 'ar' || language === 'eg';

  return (
    <footer className="footer-main" dir={dir}>
      {/* Mount the scroll helper for all pages. */}
      <ScrollToTop />

      <style>{`
        .footer-main {
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          padding: 80px 0 30px;
          margin-top: 50px;
          position: relative;
          z-index: 10;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
        }
        .footer-brand h3 {
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 20px;
          letter-spacing: -1.5px;
          color: var(--primary);
          text-transform: lowercase;
        }
        .footer-brand p {
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 0.95rem;
          max-width: 300px;
        }
        .footer-section h4 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 25px;
          position: relative;
          color: var(--text-main);
        }
        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: -8px;
          ${isRtl ? 'right' : 'left'}: 0;
          width: 30px;
          height: 2px;
          background: var(--primary);
        }
        .footer-links {
          list-style: none;
          padding: 0;
        }
        .footer-links li {
          margin-bottom: 15px;
        }
        .footer-links a {
          text-decoration: none;
          color: var(--text-muted);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }
        .footer-links a:hover {
          color: var(--primary);
          transform: ${isRtl ? 'translateX(-5px)' : 'translateX(5px)'};
        }
        .social-container {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }
        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--bg-main);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(199, 119, 47, 0.25);
          border-color: var(--primary);
        }
        .contact-info li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 18px;
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 60px auto 0;
          padding: 30px 24px 0;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 50px; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .footer-section h4::after { left: 50%; transform: translateX(-50%); }
          .footer-links a { justify-content: center; }
          .contact-info li { justify-content: center; }
          .social-container { justify-content: center; }
          .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}</style>

      <div className="footer-grid">
        {/* Brand description and social links. */}
        <div className="footer-section footer-brand">
          <h3>nemora</h3>
          <p>{t('footerDesc') || 'تصاميم مخصصة تعبر عن شخصيتك الفريدة بأعلى جودة خامات.'}</p>
          <div className="social-container">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn"><Facebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn"><Instagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Primary navigation shortcuts. */}
        <div className="footer-section">
          <h4>{t('quickLinks')}</h4>
          <ul className="footer-links">
            <li><Link to="/products">{t('productsNav')} <ArrowUpRight size={14} opacity={0.5}/></Link></li>
            <li><Link to="/about">{t('about')} <ArrowUpRight size={14} opacity={0.5}/></Link></li>
            <li><Link to="/contact">{t('contact')} <ArrowUpRight size={14} opacity={0.5}/></Link></li>
          </ul>
        </div>

        {/* Customer service links. */}
        <div className="footer-section">
          <h4>{t('customerService')}</h4>
          <ul className="footer-links">
            <li><Link to="/checkout">{t('shippingInfo') || 'الشحن والتوصيل'}</Link></li>
            <li><Link to="/contact">{t('returns') || 'سياسة الاسترجاع'}</Link></li>
            <li><Link to="/cart">{t('shoppingCart')}</Link></li>
          </ul>
        </div>

        {/* Contact information block. */}
        <div className="footer-section">
          <h4>{t('contactUs')}</h4>
          <ul className="contact-info footer-links">
            <li>
              <MapPin size={20} className="text-primary" /> 
              <span>{language === 'en' ? 'Cairo, Egypt' : 'القاهرة، مصر'}</span>
            </li>
            <li>
              <Phone size={20} className="text-primary" /> 
              <span dir="ltr">+20 123 456 789</span>
            </li>
            <li>
              <Mail size={20} className="text-primary" /> 
              <span>support@nemora.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} nemora. {t('allRightsReserved')}.</p>
        <div style={{ display: 'flex', gap: '25px' }}>
          <Link to="/privacy" style={{textDecoration:'none', color:'inherit'}}>{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
          <Link to="/terms" style={{textDecoration:'none', color:'inherit'}}>{language === 'en' ? 'Terms' : 'الشروط'}</Link>
        </div>
      </div>
    </footer>
  );
};
