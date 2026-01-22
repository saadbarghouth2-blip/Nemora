import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, ChevronLeft, Star, AlertCircle, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { language, dir } = useLanguage();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showError, setShowError] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Track add-to-cart notification state.

  const product = products.find((p) => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) return null;
  const isAr = language === 'ar' || language === 'eg';

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      window.navigator.vibrate?.(100);
      return;
    }
    // Add the product once per selected quantity.
    for(let i = 0; i < quantity; i++) {
        addToCart(product, selectedSize, '');
    }
    
    setShowError(false);
    setIsAdded(true); // Show the add-to-cart notification.
    // Hide the notification after 4 seconds.
    setTimeout(() => setIsAdded(false), 4000);
  };

  return (
    <div className="premium-shop-container" dir={dir}>
      <div className="bg-glow-blob"></div>

      {/* Add-to-cart notification popup. */}
      <AnimatePresence>
        {isAdded && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 30, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.9 }}
            className="added-notification-popup"
          >
            <div className="notif-glass-content">
              <div className="notif-icon-box">
                <CheckCircle2 size={24} className="text-green-400" />
              </div>
              <div className="notif-main-info">
                <h4 className="notif-title">{isAr ? 'تمت الإضافة بنجاح' : 'ADDED TO BAG'}</h4>
                <p className="notif-desc">
                  {isAr ? 'يمكنك إكمال إجراءاتك في السلة' : 'Complete your checkout in the bag'}
                </p>
              </div>
              <button onClick={() => navigate('/cart')} className="notif-action-btn">
                <ArrowRight size={18} />
              </button>
              <button onClick={() => setIsAdded(false)} className="notif-close-x">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="detail-inner-content">
        <button onClick={() => navigate(-1)} className="mobile-back-btn">
          <ChevronLeft size={24} />
        </button>

        <div className="product-detail-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="detail-image-section"
          >
            <div className="luxury-image-wrapper">
              <img src={product.image} alt={product.nameEn} />
              <div className="image-overlay-gradient"></div>
            </div>
          </motion.div>

          <div className="detail-info-section">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="collection-label">
                <Star size={12} fill="var(--primary-blue)" color="none" /> 
                {isAr ? 'إصدار محدود' : 'LIMITED EDITION'}
              </div>
              <h1 className="detail-title">{isAr ? product.name : product.nameEn}</h1>
              <div className="detail-price-tag">{product.price} <small>EGP</small></div>
            </motion.div>

            <p className="detail-description">
              {isAr ? product.description : product.descriptionEn}
            </p>

            <div className={`selection-group ${showError && !selectedSize ? 'error-pulse' : ''}`}>
              <div className="label-row">
                <label className="group-label">{isAr ? 'المقاس المتاح' : 'Available Size'}</label>
                <AnimatePresence>
                  {showError && !selectedSize && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="error-text"
                    >
                      <AlertCircle size={14} /> {isAr ? 'برجاء اختيار المقاس أولاً' : 'Please select a size'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mobile-fixed-actions">
              <div className="action-container-inner">
                <div className="detail-quantity-stepper">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18}/></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus size={18}/></button>
                </div>

                <button 
                  className={`detail-add-btn ${!selectedSize ? 'needs-size' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>{isAr ? 'إضافة للطلب' : 'Add to Order'}</span>
                </button>
              </div>
            </div>

            <div className="trust-badges mobile-hide">
              <div className="badge-item">✨ {isAr ? 'خامات ممتازة' : 'Premium Materials'}</div>
              <div className="badge-item">🔄 {isAr ? 'تبديل سهل' : 'Easy Exchange'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
