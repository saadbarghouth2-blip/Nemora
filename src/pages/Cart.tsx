import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { language, dir } = useLanguage();
  
  const total = getTotalPrice();
  const shipping = total > 1000 ? 0 : 50;
  const isAr = language === 'ar' || language === 'eg';

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={80} />
          <h2>{isAr ? 'السلة فارغة' : 'BAG IS EMPTY'}</h2>
          <button onClick={() => navigate('/products')} className="shop-button">
            {isAr ? 'تسوق الآن' : 'SHOP NOW'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" dir={dir}>
      {/* Cart header and title. */}
      <header className="cart-header mb-12">
        <h1 className="cart-title">
          {isAr ? 'حقيبتك' : 'THE BAG'}<span className="text-primary">.</span>
        </h1>
      </header>

      <div className="cart-main-grid grid lg:grid-cols-12 gap-12">
        
        {/* Cart item list. */}
        <div className="lg:col-span-7 cart-items space-y-6">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <motion.div 
                layout
                key={item.cartItemId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cart-item"
              >
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-info">
                  <h3 className="uppercase italic tracking-tight">{isAr ? item.name : (item.nameEn || item.name)}</h3>
                  <div className="cart-item-details">
                    {item.selectedSize} / {item.selectedColor}
                  </div>
                  <div className="cart-item-price mt-2 text-primary font-black">
                    {item.price} EGP
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="quantity-button">
                      <Minus size={14} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="quantity-button">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.cartItemId)} className="remove-button">
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cart summary card. */}
        <aside className="lg:col-span-5">
          <div className="cart-summary-card">
            <h2 className="summary-headline">
              {isAr ? 'ملخص الطلب' : 'SUMMARY'}
            </h2>
            
            <div className="price-rows">
              <div className="p-row">
                <span>{isAr ? 'الإجمالي الفرعي' : 'SUBTOTAL'}</span>
                <span>{total} EGP</span>
              </div>
              <div className="p-row">
                <span>{isAr ? 'الشحن' : 'SHIPPING'}</span>
                <span className={shipping === 0 ? "free-text" : ""}>
                  {shipping === 0 ? (isAr ? 'مجاني' : 'FREE') : `${shipping} EGP`}
                </span>
              </div>
            </div>

            <div className="final-total-area">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-2">
                {isAr ? 'الإجمالي الكلي' : 'TOTAL AMOUNT'}
              </span>
              <span className="total-amount-display">
                {total + shipping} <small className="text-sm">EGP</small>
              </span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="checkout-action-btn group"
            >
              <span>{isAr ? 'اتمام الشراء' : 'CHECKOUT NOW'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>

            {shipping > 0 && (
              <p className="mt-6 text-[10px] text-center font-bold uppercase tracking-widest opacity-40">
                {isAr ? `أضف ${1000 - total} ج.م للحصول على شحن مجاني` : `Add ${1000 - total} EGP for free shipping`}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};


