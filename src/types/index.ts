export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  image: string;
  category: 'tshirt' | 'hoodie' | 'tank-top' | 'polo' | 'sweatshirt' | 'jacket';
  technique?: 'print' | 'embroidery' | 'both';
  embroideryStyle?: 'logo' | 'monogram' | 'patch' | 'text' | 'none';
  sizes: string[];
  colors: string[];
  colorsEn?: string[];
  inStock: boolean;
  basePrice: number;
  material?: string;
  materialEn?: string;
  careInstructions?: string;
  careInstructionsEn?: string;
  isNew?: boolean; 
  onSale?: boolean;
  reviews?: number;
  rating?: number;
}

// Shared cart item type used to resolve cart typing errors.
export interface CartItem extends Product {
  cartItemId: string; // Unique id for a cart line item (size/color variants).
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  image?: string;
}

export type Language = 'en' | 'ar' | 'eg';
