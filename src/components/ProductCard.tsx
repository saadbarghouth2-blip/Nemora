import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { language, dir } = useLanguage();
  
  const isAr = language === 'ar' || language === 'eg';
  const name = isAr ? product.name : (product.nameEn || product.name);
  const description = isAr ? product.description : (product.descriptionEn || product.description);

  const categoryMap: Record<string, string> = {
    tshirt: isAr ? 'تيشيرت' : 'T-Shirt',
    hoodie: isAr ? 'هودي' : 'Hoodie',
    polo: isAr ? 'بولو' : 'Polo',
    sweatshirt: isAr ? 'سويتشيرت' : 'Sweatshirt',
    jacket: isAr ? 'جاكيت' : 'Jacket',
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="product-card-wrapper"
    >
      <style>{`
        .product-card-wrapper {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          border: 2px solid var(--border);
          overflow: hidden;
          position: relative;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-md);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .product-card-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s var(--ease-out-expo);
          z-index: 1;
        }
        .product-card-wrapper:hover::before {
          transform: scaleX(1);
        }
        .product-card-wrapper:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-2xl);
          transform: translateY(-10px) scale(1.02);
          background: var(--bg-hover);
        }
        .image-box {
          aspect-ratio: 1/1.2;
          overflow: hidden;
          position: relative;
          background: var(--bg-secondary);
        }
        .image-box::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .product-card-wrapper:hover .image-box::after {
          opacity: 1;
        }
        .main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-out-expo);
        }
        .product-card-wrapper:hover .main-img {
          transform: scale(1.12);
        }
        .badge-stock {
          position: absolute;
          top: 15px; ${dir === 'rtl' ? 'right: 15px;' : 'left: 15px;'}
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          color: white;
          padding: 5px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 2;
        }
        .quick-add {
          position: absolute;
          bottom: 20px;
          ${dir === 'rtl' ? 'left: 20px;' : 'right: 20px;'}
          width: 52px;
          height: 52px;
          background: var(--gradient-primary);
          color: white;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(120px) rotate(180deg);
          transition: transform 0.5s var(--ease-out-expo);
          box-shadow: var(--shadow-primary);
          border: 2px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
        }
        .product-card-wrapper:hover .quick-add {
          transform: translateY(0) rotate(0deg);
        }
        .quick-add:hover {
          transform: translateY(0) rotate(0deg) scale(1.1);
          box-shadow: var(--shadow-2xl);
        }
        .info-box {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cat-tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--primary);
          font-weight: 800;
          margin-bottom: 10px;
          display: block;
          opacity: 0.8;
        }
        .p-name {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text-main);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .p-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          height: 3em;
          overflow: hidden;
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .p-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 18px;
          border-top: 2px solid var(--border-light);
          margin-top: auto;
        }
        .p-price {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--primary);
          background: var(--gradient-soft);
          padding: 8px 16px;
          border-radius: var(--radius);
          display: inline-block;
          border: 1px solid var(--primary-soft);
          letter-spacing: -0.02em;
        }
        .p-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffb800;
          background: rgba(255, 184, 0, 0.1);
          padding: 6px 10px;
          border-radius: var(--radius);
        }
      `}</style>

      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="image-box">
          {!product.inStock && (
            <div className="badge-stock">
              {isAr ? 'نفذت الكمية' : 'Out of Stock'}
            </div>
          )}
          <img src={product.image} alt={name} className="main-img" />
          
          <div className="quick-add">
            <ShoppingBag size={20} />
          </div>
        </div>

        <div className="info-box">
          <span className="cat-tag">{categoryMap[product.category] || product.category}</span>
          <h3 className="p-name">{name}</h3>
          <p className="p-desc">{description}</p>
          
          <div className="p-footer">
            <span className="p-price">
              {product.price} ج.م
            </span>
            <div className="p-rating">
              <Star size={14} fill="currentColor" />
              <span>4.9</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};