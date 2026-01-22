// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sun, Moon, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { getCartCount } = useCart();
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  const isRtl = dir === "rtl";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  return (
    <>
      <style>{`
        :root {
          --bg-card: #ffffff;
          --bg-secondary: #f3f4f6; 
          --text-main: #111827;    /* أسود قوي للوضوح في اللايت */
          --border: rgba(0, 0, 0, 0.1);
          --primary: #c7772f;
        }

        [data-theme='dark'] {
          --bg-card: #120e0c;
          --bg-secondary: #1c1816;
          --text-main: #f9fafb;
          --border: rgba(255, 255, 255, 0.1);
        }

        .nav-master {
          position: fixed; top: 0; left: 0; right: 0; z-index: 3000;
          padding: 18px 0; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-master.scrolled { padding: 10px 0; }

        .nav-shell {
          max-width: 1200px; margin: 0 auto; padding: 8px 18px;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 100px;
          backdrop-filter: blur(14px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        .nav-master.scrolled .nav-shell { 
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
          border-color: var(--primary);
        }

        .brand-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          background: var(--bg-secondary);
        }
        .brand-name { 
          font-size: 1.45rem; font-weight: 900; letter-spacing: -1.2px; 
          color: var(--text-main) !important; text-decoration: none;
        }

        .nav-desktop-links { 
          display: flex; gap: 6px; background: var(--bg-secondary); 
          padding: 5px; border-radius: 100px; border: 1px solid var(--border);
        }
        .nav-item { 
          text-decoration: none; color: var(--text-main) !important; font-weight: 700; 
          padding: 8px 22px; border-radius: 100px; font-size: 0.9rem; transition: 0.3s;
          opacity: 0.85;
        }
        .nav-item:hover { opacity: 1; color: var(--primary) !important; }
        .nav-item.active { 
          background: var(--primary); color: white !important; 
          opacity: 1; box-shadow: 0 4px 12px rgba(199, 119, 47, 0.3);
        }

        .icon-btn {
          width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid var(--border);
          background: var(--bg-card); color: var(--text-main);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: 0.3s; position: relative;
        }
        .icon-btn:hover { background: var(--primary-soft); color: var(--primary); border-color: var(--primary); transform: scale(1.05); }

        .lang-dropdown-desktop {
          position: absolute; top: 55px; left: ${isRtl ? "auto" : "0"}; right: ${isRtl ? "0" : "auto"};
          background: var(--bg-card); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 8px; min-width: 140px; box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        .lang-option {
          width: 100%; padding: 10px 14px; border: none; background: transparent;
          color: var(--text-main); font-weight: 700; font-size: 0.85rem; cursor: pointer;
          border-radius: 12px; text-align: ${isRtl ? "right" : "left"}; transition: 0.2s;
        }
        .lang-option:hover { background: var(--bg-secondary); color: var(--primary); }

        .cart-badge {
          position: absolute; top: -3px; right: -3px; background: var(--primary); color: white;
          width: 19px; height: 19px; font-size: 10px; font-weight: 900;
          display: flex; align-items: center; justify-content: center; border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        .mobile-only { display: none; }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 3500;
        }

        .mobile-drawer {
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .mobile-actions {
          margin-top: auto;
          display: grid;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .mobile-lang-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .mobile-lang-btn {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-main);
          padding: 10px 0;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.85rem;
        }

        .mobile-lang-btn.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }

        @media (max-width: 950px) {
          .desktop-only { display: none; }
          .nav-shell { margin: 0 12px; padding: 10px 14px; border-radius: 40px; gap: 8px; }
          .brand-logo { width: 30px; height: 30px; }
          .brand-name { font-size: 1.15rem; }
          .icon-btn { width: 38px; height: 38px; }
          .mobile-only { display: inline-flex; }
        }
      `}</style>

      <nav className={`nav-master ${isScrolled ? "scrolled" : ""}`} dir={dir}>
        <div className="nav-shell">
          
          {/* Settings Group (Desktop) */}
          <div className="desktop-only" style={{ display: "flex", gap: "10px" }}>
            <div ref={langRef} style={{ position: "relative" }}>
              <button className="icon-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                <Globe size={18} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="lang-dropdown-desktop">
                    {['ar', 'eg', 'en'].map((l) => (
                      <button key={l} onClick={() => { setLanguage(l as any); setIsLangOpen(false); }} className="lang-option">
                        {l === 'ar' ? 'العربية' : l === 'eg' ? 'المصرية' : 'English'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="brand-wrap" dir="ltr">
            <img
              src="/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png"
              alt="Nemora logo"
              className="brand-logo"
            />
            <span className="brand-name">
              NEMORA<span style={{ color: "var(--primary)" }}>.</span>
            </span>
          </Link>

          {/* Links (Desktop) */}
          <div className="nav-desktop-links desktop-only">
            {['home', 'productsNav', 'about', 'contact'].map((key) => {
              const path = key === 'home' ? '/' : `/${key.replace('Nav', '')}`;
              return (
                <Link key={key} to={path} className={`nav-item ${location.pathname === path ? "active" : ""}`}>
                  {t(key)}
                </Link>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/cart" className="icon-btn">
              <ShoppingCart size={19} />
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </Link>
            <button className="icon-btn mobile-only" onClick={() => setIsMenuOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />
              <motion.div 
                initial={{ x: isRtl ? "100%" : "-100%" }} animate={{ x: 0 }} exit={{ x: isRtl ? "100%" : "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="mobile-drawer"
                style={{ position: 'fixed', top: 0, bottom: 0, width: '85%', maxWidth: '320px', background: 'var(--bg-card)', zIndex: 4000, padding: '30px', [isRtl ? "right" : "left"]: 0, borderRadius: isRtl ? "35px 0 0 35px" : "0 35px 35px 0" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src="/assets/images/Gemini_Generated_Image_j8n8etj8n8etj8n8.png"
                      alt="Nemora logo"
                      className="brand-logo"
                    />
                    <span className="brand-name">NEMORA</span>
                  </div>
                  <button className="icon-btn" onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
                </div>

                <div style={{ flex: 1 }}>
                  {['home', 'productsNav', 'about', 'contact'].map((key) => {
                    const path = key === 'home' ? '/' : `/${key.replace('Nav', '')}`;
                    return (
                      <Link key={key} to={path} onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px', borderRadius: '18px', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, marginBottom: '10px', background: location.pathname === path ? 'var(--primary)' : 'var(--bg-secondary)', color: location.pathname === path ? 'white' : 'var(--text-main)' }}>
                        {t(key)}
                        <ChevronRight size={18} style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
                      </Link>
                    );
                  })}
                </div>

                <div className="mobile-actions">
                  <div className="mobile-lang-row">
                    {['ar', 'eg', 'en'].map((l) => (
                      <button
                        key={l}
                        type="button"
                        className={`mobile-lang-btn ${language === l ? 'active' : ''}`}
                        onClick={() => setLanguage(l as any)}
                      >
                        {l === 'ar' ? 'AR' : l === 'eg' ? 'EG' : 'EN'}
                      </button>
                    ))}
                  </div>
                  <button className="icon-btn" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
