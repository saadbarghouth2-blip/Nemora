import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const imageBasePath = '/assets/images/';
const allImages: string[] = [
  'WhatsApp Image 2026-01-08 at 1.48.07 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.07 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.08 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.08 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.10 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.10 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.11 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.11 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.13 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.13 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.15 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.15 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.16 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.16 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.18 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.18 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.20 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.20 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.21 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.21 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.22 PM.jpeg',
];

export const Gallery: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const isAr = language === 'ar' || language === 'eg';

  // Track scroll progress for the top bar.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const nextImage = () => selectedImage !== null && setSelectedImage((selectedImage + 1) % allImages.length);
  const prevImage = () => selectedImage !== null && setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);

  // Enable swipe navigation on touch devices.
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) nextImage();
    else if (swipe > 50) prevImage();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    if (selectedImage !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <div className="gallery-page" dir={dir}>
      {/* Scroll progress bar. */}
      <motion.div className="gallery-progress" style={{ scaleX }} />

      <header className="gallery-header">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="gallery-kicker"
        >
          <Sparkles size={14} /> {t('gallery')}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          
        >
          {isAr ? 'نيــمورا' : 'NEMORA'} <br/>
          <span>{isAr ? 'الفيـجن' : 'VISION'}</span>
        </motion.h1>
      </header>

      {/* Masonry-style gallery grid. */}
      <div className="gallery-grid">
        {allImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            className="gallery-item"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`${imageBasePath}${image}`}
              alt={`Nemora ${index}`}
              
              loading="lazy"
            />
            
            <div className="gallery-overlay">
              <div className="gallery-overlay-content">
                <div className="gallery-overlay-icon">
                  <Maximize2 size={20} />
                </div>
                <span>{isAr ? 'عرض الصورة' : 'Expand View'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gesture-enabled lightbox viewer. */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ y: -20 }} animate={{ y: 0 }}
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div 
              key={selectedImage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lightbox-media"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${imageBasePath}${allImages[selectedImage]}`}
                alt="Nemora Large"
                loading="lazy"
              />
            </motion.div>

            <div className="lightbox-counter">
              {selectedImage + 1} / {allImages.length}
            </div>
            <span className="lightbox-hint">
              {isAr ? 'اسحب للتنقل' : 'Swipe to Navigate'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};
