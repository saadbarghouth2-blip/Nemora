import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Sun, Moon, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { getCartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const langRef = useRef<HTMLDivElement>(null);

  const cartCount = getCartCount();
  const isRtl = language === 'ar' || language === 'eg';

  // Close language dropdown on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  const langLabel =
    language === 'ar' ? 'العربية' :
    language === 'eg' ? 'مصري' :
    'English';

  return (
    <>
      <style>{`
        .nav-master {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 3000;
          padding: 16px 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none; /* ✅ مهم: يمنع تغطية الصفحة */
        }
        .nav-master * { pointer-events: auto; } /* ✅ يخلي التفاعل جوه النافبار بس */

        .nav-master.scrolled { padding: 8px 0; }

        .nav-shell {
          max-width: 1320px; margin: 0 auto; padding: 10px 18px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 999px;
          backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 16px 40px rgba(43, 32, 24, 0.12);
          transition: all 0.3s ease;
        }
        .nav-master.scrolled .nav-shell {
          background: var(--bg-card);
          box-shadow: 0 20px 50px rgba(43, 32, 24, 0.14);
        }

        .nav-wrapper {
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px;
        }

        .brand-name {
          font-size: 1.7rem; font-weight: 900; letter-spacing: -1.5px;
          color: var(--text-main); text-decoration: none;
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
        }

        /* Desktop navigation group */
        .nav-desktop-links {
          display: flex; gap: 6px; align-items: center;
          background: var(--bg-card);
          padding: 6px;
          border-radius: 999px;
          border: 1px solid var(--border);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
        }

        .nav-item {
          position: relative;
          text-decoration: none;
          color: var(--text-main);
          font-weight: 800;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 0.9rem;
          transition: 0.25s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-item:hover { background: var(--bg-hover); color: var(--primary); }
        .nav-item.active { background: var(--primary); color: white; box-shadow: 0 10px 18px rgba(199, 119, 47, 0.25); }

        /* Actions */
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .icon-btn {
          width: 44px; height: 44px; border-radius: 14px; border: 1px solid transparent;
          background: var(--bg-secondary); color: var(--text-main);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: 0.3s; position: relative;
        }
        .icon-btn:hover { background: var(--primary-soft); color: var(--primary); transform: translateY(-2px); border-color: var(--border); }

        /* Desktop language dropdown */
        .lang-wrap { position: relative; }
        .lang-dropdown-desktop {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 8px;
          min-width: 170px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          z-index: 4005; /* ✅ أعلى من أي طبقة */
        }
        .lang-option {
          width: 100%;
          padding: 12px 14px;
          border: none;
          background: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-main);
          font-weight: 800;
          cursor: pointer;
          border-radius: 12px;
          transition: 0.2s;
        }
        .lang-option:hover { background: var(--bg-hover); color: var(--primary); }
        .lang-option.active { background: var(--primary-soft); color: var(--primary); }

        /* Mobile */
        .mobile-drawer {
          position: fixed; top: 0; bottom: 0; width: 85%; max-width: 350px;
          background: var(--bg-card);
          z-index: 4002; /* ✅ أعلى من النافبار */
          padding: 30px;
          display: flex; flex-direction: column;
          border: 2px solid var(--border);
          box-shadow: 0 0 80px rgba(0, 0, 0, 0.5), 0 30px 60px rgba(43, 32, 24, 0.3);
        }
        .mobile-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(10px);
          z-index: 4001; /* ✅ أعلى من النافبار */
        }

        .mobile-link-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-radius: 18px; text-decoration: none;
          color: var(--text-main); font-size: 1.15rem; font-weight: 900;
          margin-bottom: 14px; background: var(--bg-secondary); border: 2px solid var(--border);
          transition: 0.25s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .mobile-link-item:hover { border-color: var(--primary); background: var(--bg-hover); transform: translateX(8px); }
        .mobile-link-item.active {
          border-color: var(--primary); background: var(--primary);
          color: white; box-shadow: 0 8px 20px rgba(199, 119, 47, 0.35);
        }

        .cart-badge {
          position: absolute; top: -4px; right: -4px; background: #ff3b30; color: white;
          width: 18px; height: 18px; font-size: 10px; font-weight: 900;
          display: flex; align-items: center; justify-content: center; border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        @media (max-width: 950px) {
          .desktop-only { display: none; }
          .nav-shell { border-radius: 22px; }
        }
        @media (max-width: 640px) {
          .nav-master { padding: 10px 12px; }
          .nav-master.scrolled { padding: 6px 12px; }
          .nav-shell { padding: 8px 12px; border-radius: 18px; }
          .nav-wrapper { gap: 10px; }
          .brand-name { font-size: 1.3rem; letter-spacing: -1px; }
          .nav-actions { gap: 8px; }
          .icon-btn { width: 38px; height: 38px; border-radius: 12px; }
          .cart-badge { width: 16px; height: 16px; font-size: 9px; }
          .mobile-drawer { width: 90%; max-width: 320px; padding: 24px; }
          .mobile-link-item { padding: 18px 20px; border-radius: 16px; font-size: 1.05rem; }
        }
        @media (min-width: 951px) { .mobile-only { display: none; } }
      `}</style>

      <nav className={`nav-master ${isScrolled ? 'scrolled' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="nav-shell">
          <div className="nav-wrapper">
            {/* Brand */}
            <Link to="/" className="brand-name" dir="ltr">
              Nemora<span style={{ color: 'var(--primary)' }}>.</span>
            </Link>

            {/* Desktop nav links + language (✅ جوّه نفس التاب) */}
            <div className="nav-desktop-links desktop-only">
              <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>{t('home')}</Link>
              <Link to="/products" className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`}>{t('productsNav')}</Link>
              <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>{t('about')}</Link>
              <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>{t('contact')}</Link>

              {/* Language dropdown inside tab bar */}
              <div className="lang-wrap" ref={langRef}>
                <button
                  type="button"
                  className="nav-item"
                  onClick={() => setIsLangOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={isLangOpen}
                >
                  <Globe size={18} />
                  <span>{langLabel}</span>
                  <ChevronDown size={14} style={{ marginLeft: isRtl ? 0 : 2, marginRight: isRtl ? 2 : 0 }} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="lang-dropdown-desktop"
                      role="menu"
                    >
                      <button
                        type="button"
                        onClick={() => { setLanguage('ar'); setIsLangOpen(false); }}
                        className={`lang-option ${language === 'ar' ? 'active' : ''}`}
                      >
                        العربية
                      </button>
                      <button
                        type="button"
                        onClick={() => { setLanguage('eg'); setIsLangOpen(false); }}
                        className={`lang-option ${language === 'eg' ? 'active' : ''}`}
                      >
                        مصري
                      </button>
                      <button
                        type="button"
                        onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                        className={`lang-option ${language === 'en' ? 'active' : ''}`}
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="nav-actions">
              <button type="button" className="icon-btn desktop-only" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/cart" className="icon-btn">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              <button type="button" className="icon-btn mobile-only" onClick={() => setIsMenuOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mobile-overlay"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: isRtl ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRtl ? '100%' : '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="mobile-drawer"
                style={{ [isRtl ? 'right' : 'left']: 0, borderRadius: isRtl ? '35px 0 0 35px' : '0 35px 35px 0' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                  <span className="brand-name" dir="ltr">Nemora<span style={{ color: 'var(--primary)' }}>.</span></span>
                  <button type="button" className="icon-btn" onClick={() => setIsMenuOpen(false)}><X /></button>
                </div>

                <div className="mobile-nav-list">
                  {[
                    { path: '/', label: t('home') },
                    { path: '/products', label: t('productsNav') },
                    { path: '/about', label: t('about') },
                    { path: '/contact', label: t('contact') },
                  ].map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link to={link.path} className={`mobile-link-item ${location.pathname === link.path ? 'active' : ''}`}>
                        {link.label}
                        <ChevronRight size={20} style={{ opacity: location.pathname === link.path ? 1 : 0.5, transform: isRtl ? 'rotate(180deg)' : '' }} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '25px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontWeight: 900, fontSize: '0.95rem' }}>{t('changeLanguage')}</span>
                    <button type="button" onClick={toggleTheme} className="icon-btn" style={{ background: 'var(--bg-card)', width: '36px', height: '36px' }}>
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setLanguage('ar')}
                      style={{
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: language === 'ar' ? 'var(--primary)' : 'var(--bg-card)',
                        color: language === 'ar' ? 'white' : 'var(--text-main)',
                        fontWeight: 900,
                      }}
                    >
                      AR
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage('eg')}
                      style={{
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: language === 'eg' ? 'var(--primary)' : 'var(--bg-card)',
                        color: language === 'eg' ? 'white' : 'var(--text-main)',
                        fontWeight: 900,
                      }}
                    >
                      EG
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      style={{
                        padding: '10px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: language === 'en' ? 'var(--primary)' : 'var(--bg-card)',
                        color: language === 'en' ? 'white' : 'var(--text-main)',
                        fontWeight: 900,
                      }}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
