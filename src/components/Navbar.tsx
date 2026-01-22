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

  const cartCount = getCartCount();
  const isRtl = dir === "rtl";

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset UI on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  return (
    <>
      <style>{`
        .nav-master {
          position: fixed; top: 0; left: 0; right: 0; z-index: 3000;
          padding: 20px 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-master.scrolled { padding: 12px 0; }

        .nav-shell {
          max-width: 1200px; margin: 0 auto; padding: 8px 12px;
          background: rgba(var(--bg-card-rgb), 0.7);
          border: 1px solid var(--border);
          border-radius: 100px;
          backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
        }
        .nav-master.scrolled .nav-shell {
          background: var(--bg-card);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-soft);
        }

        .nav-wrapper {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }

        .brand-name { 
          font-size: 1.6rem; font-weight: 900; letter-spacing: -1px; 
          color: var(--text-main); text-decoration: none; display: flex; align-items: center;
          padding: 0 10px;
        }

        .nav-desktop-links { 
          display: flex; gap: 4px; background: var(--bg-secondary); 
          padding: 4px; border-radius: 100px; border: 1px solid var(--border);
        }
        .nav-item { 
          text-decoration: none; color: var(--text-main); font-weight: 700; 
          padding: 8px 18px; border-radius: 100px; font-size: 0.85rem; transition: 0.3s;
        }
        .nav-item:hover { color: var(--primary); background: var(--bg-hover); }
        .nav-item.active { 
          background: var(--primary); color: #fff !important; 
          box-shadow: 0 8px 20px rgba(199, 119, 47, 0.3);
        }

        .nav-actions { display: flex; align-items: center; gap: 8px; }

        .icon-btn {
          width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--border);
          background: var(--bg-card); color: var(--text-main);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; text-decoration: none;
        }
        .icon-btn:hover { 
          background: var(--primary); color: white; border-color: var(--primary);
          transform: translateY(-3px); box-shadow: 0 5px 15px rgba(199, 119, 47, 0.3);
        }

        .lang-container { position: relative; }

        .lang-dropdown-desktop {
          position: absolute; top: 55px; left: ${isRtl ? "auto" : "0"}; right: ${isRtl ? "0" : "auto"};
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 20px; padding: 8px; min-width: 150px;
          box-shadow: var(--shadow-xl); z-index: 1001;
        }
        .lang-option {
          width: 100%; padding: 10px 14px; border: none; background: transparent;
          display: flex; justify-content: space-between; align-items: center;
          color: var(--text-main); font-weight: 700; cursor: pointer;
          border-radius: 12px; transition: 0.2s; font-size: 0.9rem;
        }
        .lang-option:hover { background: var(--primary-soft); color: var(--primary); }
        .lang-option.active { color: var(--primary); background: var(--bg-secondary); }

        .cart-badge {
          position: absolute; top: -2px; right: -2px; background: var(--primary); color: white;
          width: 18px; height: 18px; font-size: 10px; font-weight: 900;
          display: flex; align-items: center; justify-content: center; border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        .mobile-drawer {
          position: fixed; top: 0; bottom: 0; width: 85%; max-width: 340px;
          background: var(--bg-card); z-index: 4000; padding: 30px;
          display: flex; flex-direction: column;
          box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
        }
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 3999; }

        .mobile-link-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-radius: 16px; text-decoration: none;
          color: var(--text-main); font-size: 1.1rem; font-weight: 700;
          margin-bottom: 10px; border: 1px solid var(--border);
          transition: 0.3s;
        }
        .mobile-link-item.active { background: var(--primary); color: white; border-color: var(--primary); }

        @media (max-width: 950px) {
          .desktop-only { display: none; }
          .nav-shell { border-radius: 30px; margin: 0 15px; }
        }
      `}</style>

      <nav className={`nav-master ${isScrolled ? "scrolled" : ""}`} dir={dir}>
        <div className="nav-shell">
          <div className="nav-wrapper">
            
            {/* Left: Language (Desktop) */}
            <div className="lang-container desktop-only" ref={langRef}>
              <button className="icon-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                <Globe size={18} />
                <ChevronDown size={12} style={{ marginLeft: 4, transform: isLangOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                    className="lang-dropdown-desktop"
                  >
                    {[
                      { code: "ar", label: "العربية" },
                      { code: "eg", label: "المصرية" },
                      { code: "en", label: "English" }
                    ].map((l) => (
                      <button 
                        key={l.code}
                        className={`lang-option ${language === l.code ? "active" : ""}`}
                        onClick={() => { setLanguage(l.code as any); setIsLangOpen(false); }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center: Brand */}
            <Link to="/" className="brand-name" style={{ fontFamily: 'Cairo, sans-serif' }}>
              Nemora<span style={{ color: "var(--primary)" }}>.</span>
            </Link>

            {/* Center: Desktop Links */}
            <div className="nav-desktop-links desktop-only">
              <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>{t("home")}</Link>
              <Link to="/products" className={`nav-item ${location.pathname === "/products" ? "active" : ""}`}>{t("productsNav")}</Link>
              <Link to="/about" className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>{t("about")}</Link>
              <Link to="/contact" className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>{t("contact")}</Link>
            </div>

            {/* Right: Actions */}
            <div className="nav-actions">
              <button className="icon-btn desktop-only" onClick={toggleTheme}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <Link to="/cart" className="icon-btn">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              <button className="icon-btn mobile-only" onClick={() => setIsMenuOpen(true)}>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />
              <motion.div 
                initial={{ x: isRtl ? "100%" : "-100%" }} animate={{ x: 0 }} exit={{ x: isRtl ? "100%" : "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="mobile-drawer"
                style={{ [isRtl ? "right" : "left"]: 0, borderRadius: isRtl ? "40px 0 0 40px" : "0 40px 40px 0" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                  <span className="brand-name">Nemora<span style={{ color: "var(--primary)" }}>.</span></span>
                  <button className="icon-btn" onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
                </div>

                <div className="mobile-nav-list">
                  {[
                    { path: "/", label: t("home") },
                    { path: "/products", label: t("productsNav") },
                    { path: "/about", label: t("about") },
                    { path: "/contact", label: t("contact") },
                  ].map((link) => (
                    <Link key={link.path} to={link.path} className={`mobile-link-item ${location.pathname === link.path ? "active" : ""}`}>
                      {link.label}
                      <ChevronRight size={18} style={{ transform: isRtl ? "rotate(180deg)" : "none" }} />
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: "auto", background: "var(--bg-secondary)", padding: "20px", borderRadius: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <span style={{ fontWeight: 800 }}>{t("settings")}</span>
                    <button onClick={toggleTheme} className="icon-btn" style={{ width: 32, height: 32 }}>
                      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {["ar", "eg", "en"].map((l) => (
                      <button 
                        key={l}
                        onClick={() => setLanguage(l as any)}
                        style={{
                          padding: "8px", borderRadius: "12px", border: "1px solid var(--border)",
                          background: language === l ? "var(--primary)" : "var(--bg-card)",
                          color: language === l ? "white" : "var(--text-main)",
                          fontWeight: 700, fontSize: "0.8rem"
                        }}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
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
