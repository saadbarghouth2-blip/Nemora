import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Award, Target, Users, Sparkles, ShieldCheck, Zap, Globe2, ArrowRight, Play, Volume2 } from 'lucide-react';

export const About: React.FC = () => {
  const [language, setLanguage] = useState('ar');
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const MotionLink = motion(Link);

  const isAr = language === 'ar' || language === 'eg';
  const dir = isAr ? 'rtl' : 'ltr';

  // Use YouTube Shorts-style embeds with autoplay, mute, and loop.
  const videos = [
    { 
      id: 'd9b31A38lz0', 
      thumbnail: 'https://img.youtube.com/vi/d9b31A38lz0/maxresdefault.jpg',
      title: 'Nemora Collection 1'
    },
    { 
      id: 'Y3ccZaTcU9U', 
      thumbnail: 'https://img.youtube.com/vi/Y3ccZaTcU9U/maxresdefault.jpg',
      title: 'Nemora Collection 2'
    },
    { 
      id: 'tebp5m-3t3I', 
      thumbnail: 'https://img.youtube.com/vi/tebp5m-3t3I/maxresdefault.jpg',
      title: 'Nemora Collection 3'
    }
  ];

  const fullContent = {
    ar: {
      heroTitle: "\u0646\u0635\u0646\u0639 \u0627\u0644\u0625\u0637\u0644\u0627\u0644\u0629 \u0627\u0644\u062a\u064a \u062a\u0644\u064a\u0642 \u0628\u0643",
      storyTitle: "\u062d\u0643\u0627\u064a\u0629 \u0646\u0645\u0648\u0631\u0627",
      storyText: "\u0646\u0645\u0648\u0631\u0627 \u0628\u062f\u0623\u062a \u0628\u0634\u063a\u0641 \u0644\u0644\u062c\u0648\u062f\u0629 \u0641\u064a \u0623\u0628\u0633\u0637 \u0642\u0637\u0639\u0629\u060c \u0648\u0645\u0646 \u0647\u0646\u0627 \u0628\u0646\u0642\u062f\u0645 \u0637\u0628\u0627\u0639\u0629 \u0648\u062a\u0637\u0631\u064a\u0632 \u0628\u0645\u0639\u0627\u064a\u064a\u0631 \u0639\u0627\u0644\u064a\u0629 \u062a\u0646\u0627\u0633\u0628 \u0647\u0648\u064a\u062a\u0643.",
      missionTitle: "\u0631\u0633\u0627\u0644\u062a\u0646\u0627",
      missionText: "\u0646\u0642\u062f\u0645 \u0642\u0637\u0639 \u062a\u0639\u0628\u0631 \u0639\u0646\u0643 \u0628\u062c\u0648\u062f\u0629 \u062b\u0627\u0628\u062a\u0629 \u0648\u062e\u062f\u0645\u0629 \u0633\u0631\u064a\u0639\u0629 \u0648\u062a\u062c\u0631\u0628\u0629 \u0648\u0627\u0636\u062d\u0629.",
      visionTitle: "\u0631\u0624\u064a\u062a\u0646\u0627",
      visionText: "\u0646\u062e\u0644\u064a \u0643\u0644 \u0634\u062e\u0635 \u064a\u0644\u0628\u0633 \u0647\u0648\u064a\u062a\u0647 \u0628\u062b\u0642\u0629 \u0648\u0628\u0623\u0633\u0644\u0648\u0628 \u0645\u0645\u064a\u0632.",
      videosTitle: "\u0634\u0627\u0647\u062f \u0623\u0639\u0645\u0627\u0644\u0646\u0627",
      watchNow: "\u0634\u0627\u0647\u062f \u0627\u0644\u0622\u0646"
    },
    eg: {
      heroTitle: "\u0628\u0646\u0635\u0646\u0639 \u0627\u0644\u0625\u0637\u0644\u0627\u0644\u0629 \u0627\u0644\u0644\u064a \u062a\u0644\u064a\u0642 \u0628\u064a\u0643",
      storyTitle: "\u062d\u0643\u0627\u064a\u0629 \u0646\u0645\u0648\u0631\u0627",
      storyText: "\u0646\u0645\u0648\u0631\u0627 \u0628\u062f\u0623\u062a \u0628\u0634\u063a\u0641 \u0644\u0644\u062c\u0648\u062f\u0629 \u0641\u064a \u0623\u0628\u0633\u0637 \u0642\u0637\u0639\u0629\u060c \u0648\u0645\u0646 \u0647\u0646\u0627 \u0628\u0646\u0642\u062f\u0645 \u0637\u0628\u0627\u0639\u0629 \u0648\u062a\u0637\u0631\u064a\u0632 \u0628\u0645\u0639\u0627\u064a\u064a\u0631 \u0639\u0627\u0644\u064a\u0629 \u062a\u0646\u0627\u0633\u0628 \u0647\u0648\u064a\u062a\u0643.",
      missionTitle: "\u0631\u0633\u0627\u0644\u062a\u0646\u0627",
      missionText: "\u0628\u0646\u0642\u062f\u0645 \u0642\u0637\u0639 \u062a\u0639\u0628\u0631 \u0639\u0646\u0643 \u0628\u062c\u0648\u062f\u0629 \u062b\u0627\u0628\u062a\u0629 \u0648\u062e\u062f\u0645\u0629 \u0633\u0631\u064a\u0639\u0629 \u0648\u062a\u062c\u0631\u0628\u0629 \u0648\u0627\u0636\u062d\u0629.",
      visionTitle: "\u0631\u0624\u064a\u062a\u0646\u0627",
      visionText: "\u0646\u062e\u0644\u064a \u0643\u0644 \u0634\u062e\u0635 \u064a\u0644\u0628\u0633 \u0647\u0648\u064a\u062a\u0647 \u0628\u062b\u0642\u0629 \u0648\u0628\u0623\u0633\u0644\u0648\u0628 \u0645\u0645\u064a\u0632.",
      videosTitle: "\u0634\u0627\u0647\u062f \u0623\u0639\u0645\u0627\u0644\u0646\u0627",
      watchNow: "\u0634\u0627\u0647\u062f \u0627\u0644\u0622\u0646"
    },
    en: {
      heroTitle: "Crafting Tomorrow's Legacy Today",
      storyTitle: "The Essence of Nemora",
      storyText: "At Nemora, we don't just follow trends; we set them. Our journey began as a quest for perfection in the most fundamental garment: the T-shirt.",
      missionTitle: "Our Philosophy",
      missionText: "We believe luxury should be effortless. Our mission is to provide apparel that speaks for you before you do.",
      visionTitle: "The Horizon",
      visionText: "We envision a world where everyone wears their identity with absolute confidence.",
      videosTitle: "Watch Our Work",
      watchNow: "Watch Now"
    }
  };

  const c = fullContent[language] || fullContent.en;

  return (
    <div className="about-page" dir={dir}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
          --primary: #c7772f;
          --primary-soft: rgba(199, 119, 47, 0.14);
          --accent: #2f6b57;
          --bg-card: rgba(255, 246, 234, 0.06);
          --bg-secondary: rgba(255, 246, 234, 0.04);
          --bg-hover: rgba(255, 246, 234, 0.12);
          --text-muted: rgba(247, 241, 231, 0.72);
          --border: rgba(247, 232, 214, 0.12);
          --glass: rgba(255, 248, 240, 0.04);
          --glass-border: rgba(247, 232, 214, 0.12);
          --gradient-primary: linear-gradient(135deg, #c7772f 0%, #e0a66b 100%);
          --gradient-soft: linear-gradient(135deg, rgba(199, 119, 47, 0.15) 0%, rgba(224, 166, 107, 0.15) 100%);
          --shadow-lg: 0 10px 40px rgba(9, 6, 4, 0.35);
          --shadow-xl: 0 20px 60px rgba(9, 6, 4, 0.45);
          --radius: 12px;
          --radius-lg: 20px;
          --radius-xl: 30px;
          --transition: all 0.3s ease;
        }

        .about-page {
          padding-bottom: 100px;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0b08 0%, #1b130d 100%);
          color: #f7f1e7;
        }

        [data-theme='light'] .about-page,
        body.light .about-page {
          color: #2b2018;
          background: linear-gradient(135deg, #faf5ee 0%, #efe3d5 100%);
          --primary: #b86529;
          --primary-soft: rgba(184, 101, 41, 0.1);
          --bg-card: rgba(255, 248, 240, 0.92);
          --bg-secondary: rgba(43, 32, 24, 0.04);
          --bg-hover: rgba(184, 101, 41, 0.12);
          --text-muted: rgba(43, 32, 24, 0.6);
          --border: rgba(43, 32, 24, 0.12);
          --glass: rgba(255, 248, 240, 0.85);
          --glass-border: rgba(43, 32, 24, 0.08);
          --gradient-primary: linear-gradient(135deg, #b86529 0%, #d58f4f 100%);
          --gradient-soft: linear-gradient(135deg, rgba(184, 101, 41, 0.12) 0%, rgba(213, 143, 79, 0.12) 100%);
          --shadow-lg: 0 10px 30px rgba(43, 32, 24, 0.12);
          --shadow-xl: 0 20px 40px rgba(43, 32, 24, 0.18);
        }
        
        .hero-v2 {
          height: 80vh; display: flex; flex-direction: column; align-items: center; 
          justify-content: center; text-align: center; position: relative; overflow: hidden;
          background: radial-gradient(circle at center, var(--primary-soft) 0%, transparent 70%);
        }
        .hero-v2 h1 { 
          font-size: clamp(2rem, 8vw, 5rem); 
          font-weight: 900; 
          letter-spacing: -2px; 
          line-height: 1.1; 
          margin-bottom: 30px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0 20px;
        }
        
        .lang-switcher {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          gap: 10px;
          background: var(--bg-card);
          padding: 10px;
          border-radius: 50px;
          border: 1px solid var(--border);
          backdrop-filter: blur(20px);
        }
        .lang-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: var(--text-main);
          cursor: pointer;
          border-radius: 50px;
          font-weight: 600;
          transition: var(--transition);
        }
        .lang-btn:hover {
          background: var(--bg-hover);
        }
        .lang-btn.active {
          background: var(--primary);
          color: #fff;
        }

        .stats-bar {
          display: flex; gap: 50px; margin-top: 50px; padding: 30px 50px;
          background: var(--glass); backdrop-filter: blur(20px);
          border: 2px solid var(--glass-border); border-radius: 100px;
          box-shadow: var(--shadow-lg);
          flex-wrap: wrap;
          justify-content: center;
        }
        .stat-item { text-align: center; position: relative; min-width: 100px; }
        .stat-number {
          font-size: 2.5rem; font-weight: 900; background: var(--gradient-primary);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 8px; display: block;
        }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }

        /* Video section layout and card styling. */
        .videos-showcase {
          max-width: 1400px;
          margin: -50px auto 80px;
          padding: 0 20px;
          position: relative;
          z-index: 20;
        }
        .videos-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .videos-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          margin-bottom: 20px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .videos-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
        }
        
        .videos-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          perspective: 1000px;
        }
        
        .video-item {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-card);
          border: 2px solid var(--border);
          box-shadow: var(--shadow-xl);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          aspect-ratio: 9/16;
          cursor: pointer;
        }
        
        .video-item:hover {
          border-color: var(--primary);
          box-shadow: 0 30px 80px rgba(199, 119, 47, 0.35);
          transform: translateY(-10px) scale(1.02);
        }
        
        .video-player {
          width: 100%;
          height: 100%;
          border: none;
        }

        .content-card {
          max-width: 1100px; margin: 80px auto 0; position: relative; z-index: 10;
          background: var(--bg-card); border-radius: var(--radius-xl); padding: 60px 40px;
          box-shadow: var(--shadow-xl); border: 2px solid var(--border); backdrop-filter: blur(10px);
        }

        .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 40px; }
        
        .modern-list { list-style: none; margin-top: 30px; }
        .modern-list li { 
          display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;
          padding: 20px; background: var(--bg-secondary); border-radius: var(--radius-lg);
          border: 1px solid var(--border); transition: var(--transition);
        }
        .modern-list li:hover { background: var(--bg-hover); border-color: var(--primary); }
        .check-icon { 
          color: var(--primary); background: var(--primary-soft); padding: 10px; 
          border-radius: var(--radius); min-width: 40px; height: 40px; 
          display: flex; align-items: center; justify-content: center;
        }

        .floating-blobs { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; }
        .blob { position: absolute; filter: blur(80px); opacity: 0.3; border-radius: 50%; background: var(--primary); }

        @media (max-width: 900px) {
          .grid-layout { grid-template-columns: 1fr; gap: 30px; }
          .content-card { margin: 50px 20px 0; padding: 30px 20px; }
          .stats-bar { gap: 20px; padding: 20px; border-radius: 20px; }
          .videos-container { grid-template-columns: 1fr; gap: 30px; }
          .play-button { width: 60px; height: 60px; }
        }

        @media (max-width: 600px) {
          .hero-v2 {
            height: auto;
            padding: 80px 16px 60px;
          }

          .lang-switcher {
            top: 90px;
            right: 12px;
            left: 12px;
            justify-content: center;
          }

          .lang-btn {
            padding: 6px 12px;
            font-size: 0.85rem;
          }

          .stats-bar {
            gap: 12px;
            padding: 16px;
            border-radius: 22px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .videos-showcase {
            margin: 20px auto 60px;
          }

          .videos-header {
            margin-bottom: 35px;
          }

          .videos-subtitle {
            font-size: 1rem;
          }

          .video-item {
            border-radius: 22px;
          }

          .content-card {
            margin: 40px 16px 0;
            padding: 24px 18px;
          }

          .modern-list li {
            padding: 16px;
          }

          .check-icon {
            min-width: 34px;
            height: 34px;
          }

        }
      `}</style>

      {/* Language toggle controls. */}
      <div className="lang-switcher">
        <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
        <button className={`lang-btn ${language === 'ar' ? 'active' : ''}`} onClick={() => setLanguage('ar')}>AR</button>
        <button className={`lang-btn ${language === 'eg' ? 'active' : ''}`} onClick={() => setLanguage('eg')}>EG</button>
      </div>

      {/* Hero banner with headline and stats. */}
      <section className="hero-v2">
        <div className="floating-blobs">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }} 
            transition={{ duration: 10, repeat: Infinity }} 
            className="blob" 
            style={{ width: '300px', height: '300px', top: '10%', left: '10%' }} 
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }} 
            transition={{ duration: 12, repeat: Infinity }} 
            className="blob" 
            style={{ width: '400px', height: '400px', bottom: '10%', right: '10%', background: 'var(--accent)' }} 
          />
        </div>

        <motion.h1 style={{ scale }}>{c.heroTitle}</motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="stats-bar"
        >
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">{language === 'en' ? 'Customers' : 'عملاء'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">{language === 'en' ? 'Satisfaction' : 'رضا'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">{language === 'en' ? 'Support' : 'دعم'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">{language === 'en' ? 'Cotton' : 'قطن'}</span>
          </div>
        </motion.div>
      </section>

      {/* Video showcase with embedded previews. */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="videos-showcase"
      >
        <div className="videos-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="videos-title"
          >
            {c.videosTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="videos-subtitle"
          >
            {language === 'en' ? 'Discover our latest collections in action' : '\u0627\u0643\u062a\u0634\u0641 \u0627\u062d\u062f\u062b \u0643\u0648\u0644\u0643\u0634\u0646\u0627\u062a\u0646\u0627'}
          </motion.p>
        </div>
        
        <div className="videos-container">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="video-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <iframe
                className="video-player"
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${video.id}`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Story, mission, and vision content. */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="content-card"
      >
        <div className="grid-layout">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '20px' }}>
              <Sparkles size={24} />
              <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Nemora Spirit</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.2 }}>{c.storyTitle}</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>{c.storyText}</p>
            
            <ul className="modern-list">
              <li>
                <div className="check-icon"><ShieldCheck size={20}/></div>
                <div>
                  <strong>{language === 'en' ? 'Authentic Materials' : '\u062e\u0627\u0645\u0627\u062a \u0623\u0635\u0644\u064a\u0629'}</strong><br/>
                  <small style={{ color: 'var(--text-muted)' }}>{language === 'en' ? '100% premium Egyptian cotton' : '\u0642\u0637\u0646 \u0645\u0635\u0631\u064a \u0641\u0627\u062e\u0631 100%'}</small>
                </div>
              </li>
              <li>
                <div className="check-icon"><Zap size={20}/></div>
                <div>
                  <strong>{language === 'en' ? 'Eco-friendly' : '\u0635\u062f\u064a\u0642 \u0644\u0644\u0628\u064a\u0626\u0629'}</strong><br/>
                  <small style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Sustainable technology' : '\u062a\u0642\u0646\u064a\u0627\u062a \u0645\u0633\u062a\u062f\u0627\u0645\u0629'}</small>
                </div>
              </li>
              <li>
                <div className="check-icon"><Globe2 size={20}/></div>
                <div>
                  <strong>{language === 'en' ? 'Fast Shipping' : '\u0634\u062d\u0646 \u0633\u0631\u064a\u0639'}</strong><br/>
                  <small style={{ color: 'var(--text-muted)' }}>{language === 'en' ? 'Delivery across Egypt' : '\u062a\u0648\u0635\u064a\u0644 \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u062d\u0627\u0641\u0638\u0627\u062a'}</small>
                </div>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
            <motion.div 
              whileHover={{ x: dir === 'rtl' ? -10 : 10 }} 
              style={{ 
                padding: '30px', 
                background: 'var(--gradient-soft)', 
                borderRadius: 'var(--radius-xl)', 
                border: '2px solid var(--primary)' 
              }}
            >
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', fontWeight: 800 }}>
                <Target size={24} /> {c.missionTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{c.missionText}</p>
            </motion.div>

            <motion.div 
              whileHover={{ x: dir === 'rtl' ? -10 : 10 }} 
              style={{ 
                padding: '30px', 
                background: 'var(--bg-card)', 
                borderRadius: 'var(--radius-xl)', 
                border: '2px solid var(--border)' 
              }}
            >
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', fontWeight: 800 }}>
                <Award size={24} /> {c.visionTitle}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{c.visionText}</p>
            </motion.div>
          </div>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <MotionLink
            to="/products" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0 0 0 0px rgba(199, 119, 47, 0.35)", "0 0 0 20px rgba(199, 119, 47, 0)"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
            style={{ 
              padding: '18px 45px', 
              borderRadius: '100px', 
              background: 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            {language === 'en' ? 'Explore Collections' : '\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a'}
            <ArrowRight size={22} />
          </MotionLink>
        </div>
      </motion.div>

      {/* Brand footer strip. */}
      <section style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Crafted with passion in Egypt
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
          <Heart size={30} /> <Award size={30} /> <Users size={30} />
        </div>
      </section>
    </div>
  );
};
