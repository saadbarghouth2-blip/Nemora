import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Award, Target, Users, Sparkles, ShieldCheck, Zap, Globe2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Lang = 'en' | 'ar' | 'eg';

export const About: React.FC = () => {
  const { language } = useLanguage();

  const isAr = language === 'ar' || language === 'eg';
  const dir = isAr ? 'rtl' : 'ltr';

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const MotionLink = motion(Link);

  const videos = useMemo(
    () => [
      {
        id: 'd9b31A38lz0',
        thumbnail: 'https://img.youtube.com/vi/d9b31A38lz0/maxresdefault.jpg',
        title: 'Nemora Collection 1',
      },
      {
        id: 'Y3ccZaTcU9U',
        thumbnail: 'https://img.youtube.com/vi/Y3ccZaTcU9U/maxresdefault.jpg',
        title: 'Nemora Collection 2',
      },
      {
        id: 'tebp5m-3t3I',
        thumbnail: 'https://img.youtube.com/vi/tebp5m-3t3I/maxresdefault.jpg',
        title: 'Nemora Collection 3',
      },
    ],
    []
  );

  const fullContent: Record<Lang, any> = {
    ar: {
      heroTitle: 'نصنع الإطلالة التي تليق بك',
      storyTitle: 'حكاية نمورا',
      storyText:
        'نمورا بدأت بشغف للجودة في أبسط قطعة، ومن هنا بنقدم طباعة وتطريز بمعايير عالية تناسب هويتك وتكمل شكل البراند بتاعك.',
      missionTitle: 'رسالتنا',
      missionText:
        'نقدم قطع تعبّر عنك بجودة ثابتة وخدمة سريعة وتجربة واضحة من أول تواصل لحد التسليم.',
      visionTitle: 'رؤيتنا',
      visionText:
        'أن يلبس كل شخص هويته بثقة وبأسلوب مميز—بخامات محترمة وتشطيب يبان من أول لمسة.',
      videosTitle: 'شاهد أعمالنا',
      videosSubtitle: 'اكتشف أحدث الكولكشنات على أرض الواقع',
      watchNow: 'شاهد الآن',

      stats: {
        customers: 'عملاء',
        satisfaction: 'رضا',
        support: 'دعم',
        cotton: 'قطن',
      },

      bullets: {
        matTitle: 'خامات أصلية',
        matDesc: 'قطن مصري فاخر 100%',
        ecoTitle: 'صديق للبيئة',
        ecoDesc: 'تقنيات مستدامة',
        shipTitle: 'شحن سريع',
        shipDesc: 'توصيل لجميع المحافظات',
      },

      cta: 'اكتشف المجموعات',
      footer: 'صُنع بشغف في مصر',
    },

    eg: {
      heroTitle: 'بنصنّع الإطلالة اللي تليق بيك',
      storyTitle: 'حكاية نمورا',
      storyText:
        'نمورا بدأت من حبّنا للتفاصيل والجودة حتى في أبسط حاجة. بنقدملك طباعة وتطريز “نضيف” يخدم هويتك ويطلع البراند بتاعك في أحسن صورة.',
      missionTitle: 'رسالتنا',
      missionText:
        'عايزين التجربة تبقى سهلة وواضحة: خامة محترمة، شغل مظبوط، وتسليم سريع من غير دوشة.',
      visionTitle: 'رؤيتنا',
      visionText:
        'إن كل حد يلبس شخصيته بثقة… ستايل مختلف وجودة تبان من أول مرة.',
      videosTitle: 'اتفرّج على شغلنا',
      videosSubtitle: 'شوف أحدث الكولكشنات وهي شغالة على الحقيقة',
      watchNow: 'اتفرّج دلوقتي',

      stats: {
        customers: 'عميل',
        satisfaction: 'رضا',
        support: 'مساعدة',
        cotton: 'قطن',
      },

      bullets: {
        matTitle: 'خامات مظبوطة',
        matDesc: 'قطن مصري ممتاز 100%',
        ecoTitle: 'على قدّ البيئة',
        ecoDesc: 'تقنيات أنضف وأهدى',
        shipTitle: 'شحن سريع',
        shipDesc: 'توصيل لكل المحافظات',
      },

      cta: 'اكتشف الكولكشنات',
      footer: 'متعمل بحب في مصر',
    },

    en: {
      heroTitle: "Crafting Tomorrow's Legacy Today",
      storyTitle: 'The Essence of Nemora',
      storyText:
        "At Nemora, we don't just follow trends; we set them. Our journey began as a quest for perfection in the most fundamental garment: the T-shirt.",
      missionTitle: 'Our Philosophy',
      missionText:
        'We believe luxury should be effortless. Our mission is to provide apparel that speaks for you before you do.',
      visionTitle: 'The Horizon',
      visionText:
        'We envision a world where everyone wears their identity with absolute confidence.',
      videosTitle: 'Watch Our Work',
      videosSubtitle: 'Discover our latest collections in action',
      watchNow: 'Watch Now',

      stats: {
        customers: 'Customers',
        satisfaction: 'Satisfaction',
        support: 'Support',
        cotton: 'Cotton',
      },

      bullets: {
        matTitle: 'Authentic Materials',
        matDesc: '100% premium Egyptian cotton',
        ecoTitle: 'Eco-friendly',
        ecoDesc: 'Sustainable technology',
        shipTitle: 'Fast Shipping',
        shipDesc: 'Delivery across Egypt',
      },

      cta: 'Explore Collections',
      footer: 'Crafted with passion in Egypt',
    },
  };

  const c = fullContent[language];

  return (
    <div className="about-page" dir={dir}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .about-page {
          --primary: #c7772f;
          --primary-soft: rgba(199, 119, 47, 0.14);
          --accent: #2f6b57;

          --text-main: #f7f1e7; /* ✅ مهم للـ desktop */
          --text-muted: rgba(247, 241, 231, 0.72);

          --bg-card: rgba(255, 246, 234, 0.06);
          --bg-secondary: rgba(255, 246, 234, 0.04);
          --bg-hover: rgba(255, 246, 234, 0.12);

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

        [data-theme='light'] .about-page,
        body.light .about-page {
          --text-main: #2b2018; /* ✅ مهم للـ desktop */
          --text-muted: rgba(43, 32, 24, 0.6);

          background: linear-gradient(135deg, #faf5ee 0%, #efe3d5 100%);
          color: var(--text-main);

          --primary: #b86529;
          --primary-soft: rgba(184, 101, 41, 0.1);
          --bg-card: rgba(255, 248, 240, 0.92);
          --bg-secondary: rgba(43, 32, 24, 0.04);
          --bg-hover: rgba(184, 101, 41, 0.12);
          --border: rgba(43, 32, 24, 0.12);
          --glass: rgba(255, 248, 240, 0.85);
          --glass-border: rgba(43, 32, 24, 0.08);
          --gradient-primary: linear-gradient(135deg, #b86529 0%, #d58f4f 100%);
          --gradient-soft: linear-gradient(135deg, rgba(184, 101, 41, 0.12) 0%, rgba(213, 143, 79, 0.12) 100%);
          --shadow-lg: 0 10px 30px rgba(43, 32, 24, 0.12);
          --shadow-xl: 0 20px 40px rgba(43, 32, 24, 0.18);
        }

        .about-page {
          padding-bottom: 100px;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0b08 0%, #1b130d 100%);
          color: var(--text-main);
        }

        .hero-v2 {
          height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
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

        .stats-bar {
          display: flex;
          gap: 50px;
          margin-top: 50px;
          padding: 30px 50px;
          background: var(--glass);
          backdrop-filter: blur(20px);
          border: 2px solid var(--glass-border);
          border-radius: 100px;
          box-shadow: var(--shadow-lg);
          flex-wrap: wrap;
          justify-content: center;
        }

        .stat-item { text-align: center; min-width: 100px; }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
          display: block;
        }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 700; }

        .videos-showcase {
          max-width: 1400px;
          margin: -50px auto 80px;
          padding: 0 20px;
          position: relative;
          z-index: 20;
        }

        .videos-header { text-align: center; margin-bottom: 60px; }
        .videos-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          margin-bottom: 20px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .videos-subtitle { color: var(--text-muted); font-size: 1.2rem; }

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

        .video-player { width: 100%; height: 100%; border: none; }

        .content-card {
          max-width: 1100px;
          margin: 80px auto 0;
          position: relative;
          z-index: 10;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          padding: 60px 40px;
          box-shadow: var(--shadow-xl);
          border: 2px solid var(--border);
          backdrop-filter: blur(10px);
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-top: 40px;
        }

        .modern-list { list-style: none; margin-top: 30px; }
        .modern-list li {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .modern-list li:hover { background: var(--bg-hover); border-color: var(--primary); }

        .check-icon {
          color: var(--primary);
          background: var(--primary-soft);
          padding: 10px;
          border-radius: var(--radius);
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-blobs { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
        .blob { position: absolute; filter: blur(80px); opacity: 0.3; border-radius: 50%; background: var(--primary); }

        @media (max-width: 900px) {
          .grid-layout { grid-template-columns: 1fr; gap: 30px; }
          .content-card { margin: 50px 20px 0; padding: 30px 20px; }
          .stats-bar { gap: 20px; padding: 20px; border-radius: 20px; }
          .videos-container { grid-template-columns: 1fr; gap: 30px; }
        }

        @media (max-width: 600px) {
          .hero-v2 { height: auto; padding: 80px 16px 60px; }
          .stats-bar { gap: 12px; padding: 16px; border-radius: 22px; }
          .stat-number { font-size: 2rem; }
          .videos-showcase { margin: 20px auto 60px; }
          .videos-header { margin-bottom: 35px; }
          .videos-subtitle { font-size: 1rem; }
          .video-item { border-radius: 22px; }
          .content-card { margin: 40px 16px 0; padding: 24px 18px; }
          .modern-list li { padding: 16px; }
          .check-icon { min-width: 34px; height: 34px; }
        }
      `}</style>

      {/* Hero */}
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
            style={{
              width: '400px',
              height: '400px',
              bottom: '10%',
              right: '10%',
              background: 'var(--accent)',
            }}
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
            <span className="stat-label">{c.stats.customers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">{c.stats.satisfaction}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">{c.stats.support}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">{c.stats.cotton}</span>
          </div>
        </motion.div>
      </section>

      {/* Videos */}
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
            {c.videosSubtitle}
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
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

      {/* Story + Mission + Vision */}
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
              <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
                Nemora Spirit
              </span>
            </div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1.2 }}>
              {c.storyTitle}
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              {c.storyText}
            </p>

            <ul className="modern-list">
              <li>
                <div className="check-icon"><ShieldCheck size={20} /></div>
                <div>
                  <strong>{c.bullets.matTitle}</strong><br />
                  <small style={{ color: 'var(--text-muted)' }}>{c.bullets.matDesc}</small>
                </div>
              </li>
              <li>
                <div className="check-icon"><Zap size={20} /></div>
                <div>
                  <strong>{c.bullets.ecoTitle}</strong><br />
                  <small style={{ color: 'var(--text-muted)' }}>{c.bullets.ecoDesc}</small>
                </div>
              </li>
              <li>
                <div className="check-icon"><Globe2 size={20} /></div>
                <div>
                  <strong>{c.bullets.shipTitle}</strong><br />
                  <small style={{ color: 'var(--text-muted)' }}>{c.bullets.shipDesc}</small>
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
                border: '2px solid var(--primary)',
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
                border: '2px solid var(--border)',
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
              boxShadow: [
                '0 0 0 0px rgba(199, 119, 47, 0.35)',
                '0 0 0 20px rgba(199, 119, 47, 0)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
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
              textDecoration: 'none',
            }}
          >
            {c.cta}
            <ArrowRight size={22} style={{ transform: dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
          </MotionLink>
        </div>
      </motion.div>

      {/* Footer */}
      <section style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          {c.footer}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
          <Heart size={30} /> <Award size={30} /> <Users size={30} />
        </div>
      </section>
    </div>
  );
};
