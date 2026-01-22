# PrintWear - E-Commerce Website

A complete, modern e-commerce website for selling custom printed t-shirts, hoodies, and other apparel items. Built with React, TypeScript, and Vite.

## Features

- 🛍️ **Product Catalog** - Browse products by category with search functionality
- 🎨 **Product Customization** - Add custom text to products before ordering
- 🛒 **Shopping Cart** - Add items with size, color, and quantity selection
- 💳 **Payment Integration** - Stripe payment integration for secure checkout
- 📱 **Responsive Design** - Fully responsive for mobile and desktop devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Stripe publishable key:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
   - Get your Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, ProductCard)
├── contexts/         # React contexts (CartContext)
├── data/            # Product data and categories
├── pages/           # Page components (Home, Products, Cart, Checkout)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Feature highlights (Free Shipping, Custom Design, etc.)
- Featured products grid

### Products Page
- Category filtering
- Search functionality
- Responsive product grid
- Product cards with images and pricing

### Product Detail Page
- Product image and description
- Size and color selection
- Custom text input for personalization
- Quantity selector
- Add to cart functionality

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Order summary with shipping calculation
- Free shipping for orders over $50

### Checkout
- Shipping information form
- Stripe payment integration
- Order summary
- Secure payment processing

## Payment Integration

The website uses Stripe for payment processing. For production use:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Set up a backend server to handle payment intents (currently using demo mode)
4. Update the checkout flow to connect with your backend

**Note**: The current implementation uses a demo payment flow. For production, you'll need to:
- Set up a backend server
- Create payment intents on the server
- Handle webhooks for payment confirmation

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Stripe** - Payment processing
- **Lucide React** - Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT