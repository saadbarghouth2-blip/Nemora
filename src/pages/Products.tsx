import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Sparkles, Star, ShoppingBag, X, Flame } from 'lucide-react';
import { products, categories } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import { StyleAssistant } from '../components/StyleAssistant';

export const Products = () => {
  const { language, dir } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState('all');
  const [selectedEmbroidery, setSelectedEmbroidery] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  
  const selectedCategory = searchParams.get('category') || 'all';
  const isAr = language === 'ar' || language === 'eg';

  const content = {
    ar: {
      printEmbroideryTitle: 'الطباعة والتطريز',
      printEmbroideryDesc: 'طباعة DTF وطباعة سكرين وتطريز ممتاز يتم تنفيذهم داخليًا.',
      printBadge: 'طباعة',
      embroideryBadge: 'تطريز',
      productFiltersTitle: 'فلترة حسب الطريقة والشكل',
      productFiltersSubtitle: 'اختار نوع الطباعة أو التطريز ثم ارفع التصميم',
      filterTechnique: 'التقنية',
      filterShape: 'الشكل',
      filterEmbroidery: 'نوع التطريز',
      uploadTitle: 'ارفع تصميمك',
      uploadDesc: 'ابعت اللوجو أو الرسمة وسنطابقها مع أفضل خامة وتقنية.',
      uploadCta: 'اذهب للتفاصيل',
      uploadHint: 'PNG أو JPG أو PDF حتى 10MB',
      uploadStatusMissing: 'من فضلك اختار ملف الأول.',
      uploadStatusUploading: 'جاري رفع الملف...',
      uploadStatusUploaded: 'تم رفع الملف بنجاح.',
      uploadStatusError: 'فشل الرفع. حاول مرة أخرى.',
      orderTitle: 'تفاصيل الطلب',
      noResultsTitle: 'لا توجد نتائج',
      noResultsDesc: 'جرب تقنية أو شكل مختلف.',
      chatbotTitle: 'مساعد ستايل ذكي',
      chatbotSubtitle: 'اختار سؤال من القائمة لتحصل على رد سريع.',
      chatWelcome: 'أهلًا! اختار سؤال من القائمة وسأرد فورًا.',
      chatPlaceholder: 'اختار سؤال من القائمة...',
      chatSend: 'إرسال'
    },

    eg: {
      printEmbroideryTitle: 'الطباعة والتطريز',
      printEmbroideryDesc: 'طباعة DTF وطباعة سكرين وتطريز ممتاز يتم تنفيذهم داخليًا.',
      printBadge: 'طباعة',
      embroideryBadge: 'تطريز',
      productFiltersTitle: 'فلترة حسب الطريقة والشكل',
      productFiltersSubtitle: 'اختار نوع الطباعة أو التطريز ثم ارفع التصميم',
      filterTechnique: 'التقنية',
      filterShape: 'الشكل',
      filterEmbroidery: 'نوع التطريز',
      uploadTitle: 'ارفع تصميمك',
      uploadDesc: 'ابعت اللوجو أو الرسمة وسنطابقها مع أفضل خامة وتقنية.',
      uploadCta: 'اذهب للتفاصيل',
      uploadHint: 'PNG أو JPG أو PDF حتى 10MB',
      uploadStatusMissing: 'من فضلك اختار ملف الأول.',
      uploadStatusUploading: 'جاري رفع الملف...',
      uploadStatusUploaded: 'تم رفع الملف بنجاح.',
      uploadStatusError: 'فشل الرفع. حاول مرة أخرى.',
      orderTitle: 'تفاصيل الطلب',
      noResultsTitle: 'لا توجد نتائج',
      noResultsDesc: 'جرب تقنية أو شكل مختلف.',
      chatbotTitle: 'مساعد ستايل ذكي',
      chatbotSubtitle: 'اختار سؤال من القائمة لتحصل على رد سريع.',
      chatWelcome: 'أهلًا! اختار سؤال من القائمة وسأرد فورًا.',
      chatPlaceholder: 'اختار سؤال من القائمة...',
      chatSend: 'إرسال'
    },

    en: {
      printEmbroideryTitle: 'Printing & Embroidery',
      printEmbroideryDesc: 'DTF, screen print, and premium embroidery done in-house.',
      printBadge: 'Printing',
      embroideryBadge: 'Embroidery',
      productFiltersTitle: 'Filter By Technique & Shape',
      productFiltersSubtitle: 'Pick embroidery or print style, then upload your design',
      filterTechnique: 'Technique',
      filterShape: 'Shape',
      filterEmbroidery: 'Embroidery Style',
      uploadTitle: 'Upload Your Design',
      uploadDesc: 'Send your artwork, logo, or sketch and we will match the exact style.',
      uploadCta: 'Go to Details',
      uploadHint: 'PNG, JPG, or PDF up to 10MB',
      uploadStatusMissing: 'Please choose a file first.',
      uploadStatusUploading: 'Uploading file...',
      uploadStatusUploaded: 'File uploaded successfully.',
      uploadStatusError: 'Upload failed. Try again.',
      orderTitle: 'Order Details',
      noResultsTitle: 'No matches',
      noResultsDesc: 'Try a different technique or shape.',
      chatbotTitle: 'AI Style Assistant',
      chatbotSubtitle: 'Pick a question from the list to get a quick answer.',
      chatWelcome: 'Hi! Pick a question from the list and I will answer instantly.',
      chatPlaceholder: 'Pick a question from the list...',
      chatSend: 'Send'
    }
  };

  const t = content[language] || content.ar;


  const techniqueOptions = [
    { id: 'all', label: 'All Techniques' },
    { id: 'print', label: 'Printing' },
    { id: 'embroidery', label: 'Embroidery' },
    { id: 'both', label: 'Print + Embroidery' }
  ];

  const shapeOptions = [
    { id: 'all', label: 'All Shapes' },
    { id: 'tshirt', label: 'T-Shirt' },
    { id: 'hoodie', label: 'Hoodie' },
    { id: 'polo', label: 'Polo' },
    { id: 'sweatshirt', label: 'Sweatshirt' },
    { id: 'jacket', label: 'Jacket' }
  ];

  const embroideryOptions = [
    { id: 'all', label: 'All Embroidery' },
    { id: 'logo', label: 'Logo' },
    { id: 'monogram', label: 'Monogram' },
    { id: 'patch', label: 'Patch' },
    { id: 'text', label: 'Text' }
  ];

  const techniqueLabels = {
    all: isAr ? 'كل التقنيات' : 'All Techniques',
    print: isAr ? 'طباعة' : 'Printing',
    embroidery: isAr ? 'تطريز' : 'Embroidery',
    both: isAr ? 'طباعة + تطريز' : 'Print + Embroidery'
  };


  const shapeLabels = {
    all: isAr ? 'كل الأشكال' : 'All Shapes',
    tshirt: isAr ? 'تيشيرت' : 'T-Shirt',
    hoodie: isAr ? 'هودي' : 'Hoodie',
    polo: isAr ? 'بولو' : 'Polo',
    sweatshirt: isAr ? 'سويتشيرت' : 'Sweatshirt',
    jacket: isAr ? 'جاكيت' : 'Jacket'
  };


  const embroideryLabels = {
    all: isAr ? 'كل التطريز' : 'All Embroidery',
    logo: isAr ? 'لوجو' : 'Logo',
    monogram: isAr ? 'مونوغرام' : 'Monogram',
    patch: isAr ? 'باتش' : 'Patch',
    text: isAr ? 'نص' : 'Text'
  };


  const printHint = isAr ? 'ألوان واضحة وتدرجات ناعمة.' : 'Sharp colors and smooth gradients.';
  const embroideryHint = isAr ? 'خيوط كثيفة وتفاصيل دقيقة.' : 'Dense threads and clean details.';

  const contactQuery = `?shape=${encodeURIComponent(selectedShape)}&technique=${encodeURIComponent(selectedTechnique)}&embroidery=${encodeURIComponent(selectedEmbroidery)}`;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedShape('all');
    setSelectedTechnique('all');
    setSelectedEmbroidery('all');
    setSearchParams({ category: 'all' });
  };

  // Filter pipeline that keeps types and search behavior consistent.
  const displayProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      // Step 1: match category, shape, and technique filters.
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesShape = selectedShape === 'all' || p.category === selectedShape;
      const technique = p.technique || 'print';
      const embroideryStyle = p.embroideryStyle || 'none';
      const matchesTechnique =
        selectedTechnique === 'all' ||
        technique === selectedTechnique ||
        (selectedTechnique !== 'both' && technique === 'both');
      const matchesEmbroidery =
        selectedEmbroidery === 'all' || embroideryStyle === selectedEmbroidery;
      
      // Step 2: match the search query against name and description.
      const query = searchQuery.toLowerCase().trim();
      if (query === '') {
        return matchesCategory && matchesShape && matchesTechnique && matchesEmbroidery;
      }

      const nameAr = (p.name || '').toLowerCase();
      const nameEn = (p.nameEn || '').toLowerCase();
      // Use the shared description field to align with the interface.
      const description = (isAr ? p.description : (p.descriptionEn || p.description)) || '';
      
      const matchesSearch = 
        nameAr.includes(query) || 
        nameEn.includes(query) || 
        description.toLowerCase().includes(query);

      return matchesCategory && matchesShape && matchesTechnique && matchesEmbroidery && matchesSearch;
    });

    if (filtered.length === 0) return [];

    // Repeat items to fill the grid for a fuller UX.
    return Array(filtered.length > 0 ? 5 : 0).fill(filtered).flat().map((item, idx) => ({
      ...item,
      uniqueKey: `${item.id}-${idx}-${searchQuery}` 
    }));
  }, [selectedCategory, selectedShape, selectedTechnique, selectedEmbroidery, searchQuery, isAr]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="premium-shop-container" dir={dir}>
      <div className="bg-glow-blob"></div>
      <div className="bg-glow-blob secondary"></div>

<div className="shop-inner-content">
        <header className="shop-header-section" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '60px 20px 40px'
        }}>
          <style>{`
            /* الفونت الجديد وتكبير العناوين */
            .main-shop-title {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              font-size: clamp(3.5rem, 10vw, 5.5rem); /* حجم ضخم وجذاب */
              font-weight: 850;
              letter-spacing: -3px;
              color: #ffffff;
              margin: 15px 0;
              line-height: 1;
            }

            .main-shop-title span {
              color: var(--primary-blue, #c7772f);
            }

            .collection-label {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              font-size: 1rem;
              letter-spacing: 3px;
              color: var(--primary-blue, #c7772f);
              font-weight: 600;
              text-transform: uppercase;
            }

            /* تكبير وتوسيع شريط البحث */
            .search-wrapper {
              width: 100%;
              max-width: 800px; /* زيادة العرض */
              margin-top: 45px;
              position: relative;
            }

            .premium-search-input {
              width: 100%;
              padding: 22px 35px; /* زيادة السماكة */
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 100px;
              color: white;
              font-size: 1.2rem; /* تكبير خط الكتابة */
              transition: all 0.3s ease;
              backdrop-filter: blur(12px);
            }

            .premium-search-input:focus {
              border-color: var(--primary-blue, #c7772f);
              background: rgba(255, 255, 255, 0.08);
              box-shadow: 0 0 40px rgba(199, 119, 47, 0.15);
              outline: none;
            }

            .search-icon-fixed {
              position: absolute;
              right: 30px;
              top: 50%;
              transform: translateY(-50%);
              scale: 1.3;
              opacity: 0.7;
            }

            [dir="rtl"] .search-icon-fixed {
              right: auto;
              left: 30px;
            }
          `}</style>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="collection-label">
              <Sparkles size={18} /> 
              {isAr ? 'مجموعة نمورا 2026' : 'NEMORA 2026 COLLECTION'}
            </div>
            <h1 className="main-shop-title">
              {isAr ? 'المتجر' : 'THE SHOP'}<span>.</span>
            </h1>
          </motion.div>

          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder={isAr ? "ابحث عن تصميمك المفضل..." : "Search for your favorite design..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="premium-search-input"
              style={{ textAlign: isAr ? 'right' : 'left' }}
            />
            <div className="search-icon-fixed">
              {searchQuery ? (
                <X size={20} onClick={() => setSearchQuery('')} style={{ cursor: 'pointer' }} />
              ) : (
                <Search size={20} />
              )}
            </div>
          </div>
        </header>

        <nav className="premium-categories-bar no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {isAr ? cat.name : cat.nameEn}
            </button>
          ))}
        </nav>

        <div className="product-tools-section">
          <div className="product-tools-header">
            <div>
              <div className="tools-title">{t.printEmbroideryTitle}</div>
              <p className="tools-subtitle">{t.printEmbroideryDesc}</p>
            </div>
          </div>

          <div className="capability-grid">
            <div className="capability-card">
              <div className="capability-icon">
                <Flame size={22} />
              </div>
              <div>
                <div className="capability-title">{t.printBadge}</div>
                <div className="capability-desc">{printHint}</div>
              </div>
            </div>
            <div className="capability-card">
              <div className="capability-icon">
                <Sparkles size={22} />
              </div>
              <div>
                <div className="capability-title">{t.embroideryBadge}</div>
                <div className="capability-desc">{embroideryHint}</div>
              </div>
            </div>
          </div>

          <div className="product-filter-intro">
            <div className="tools-title">{t.productFiltersTitle}</div>
            <div className="tools-subtitle">{t.productFiltersSubtitle}</div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <div className="filter-label">{t.filterTechnique}</div>
              <div className="filter-chips">
                {techniqueOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`filter-chip ${selectedTechnique === option.id ? 'active' : ''}`}
                    onClick={() => setSelectedTechnique(option.id)}
                  >
                    {techniqueLabels[option.id as keyof typeof techniqueLabels]}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">{t.filterEmbroidery}</div>
              <div className="filter-chips">
                {embroideryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`filter-chip ${selectedEmbroidery === option.id ? 'active' : ''}`}
                    onClick={() => setSelectedEmbroidery(option.id)}
                  >
                    {embroideryLabels[option.id as keyof typeof embroideryLabels]}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">{t.filterShape}</div>
              <div className="filter-select-wrap">
                <select
                  className="filter-select"
                  value={selectedShape}
                  onChange={(event) => setSelectedShape(event.target.value)}
                >
                  {shapeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {shapeLabels[option.id as keyof typeof shapeLabels]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="upload-card">
            <div className="upload-title">{t.uploadTitle}</div>
            <div className="upload-desc">{t.uploadDesc}</div>
            <div className="upload-actions">
              <Link className="btn-primary" to={`/contact${contactQuery}`}>
                {t.uploadCta}
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={`${selectedCategory}-${selectedShape}-${selectedTechnique}-${selectedEmbroidery}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="premium-grid-layout"
          >
            {displayProducts.map((product) => (
              <motion.div 
                key={product.uniqueKey}
                variants={itemVariants}
                layout
                className="luxury-card"
              >
                <div className="card-media">
                  <Link to={`/products/${product.id}`} className="add-to-cart-float">
                    <Plus size={24} />
                  </Link>
                  
                  <Link to={`/products/${product.id}`} className="image-link">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </Link>

                  <div className="card-badge">
                    {product.price} EGP
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-top-info">
                    <span className="cat-tag">{product.category}</span>
                    <div className="rating">
                      <Star size={10} fill="var(--primary-blue)" stroke="none" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-title-text">
                      {isAr ? product.name : (product.nameEn || product.name)}
                    </h3>
                  </Link>
                  <div className="card-footer">
                      <span className="stock-status">{isAr ? 'متوفر' : 'In Stock'}</span>
                      <ShoppingBag size={14} className="bag-icon" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayProducts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="empty-state">
            <div className="no-results-icon">
               <Search size={60} style={{ opacity: 0.2 }} />
            </div>
            <h3>{isAr ? 'لا توجد نتائج مطابقة' : 'No matching results'}</h3>
            <p>{isAr ? 'جرب كلمات مختلفة أو غيّر التصنيف' : 'Try different keywords or change category'}</p>
            <button onClick={handleResetFilters} className="btn-reset">
              {isAr ? 'إعادة الضبط' : 'Reset Filters'}
            </button>
          </motion.div>
        )}

        <StyleAssistant />
      </div>
    </div>
  );
};


