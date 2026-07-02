import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Product3DViewer from './Product3DViewer';
import { useCart } from '@/context/CartContext';

export interface Product {
  id: number;
  name: string;
  tagline: string;
  price: string;
  category: string;
  image: string;
  specs: string[];
  href: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, removeFromCart } = useCart();

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-primary hover:underline">
        Home
      </Link>
      <h1 className="text-3xl font-bold mt-6 mb-4">{product.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{product.tagline}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 3D Viewer */}
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <Product3DViewer />
        </div>
        {/* Specs Table */}
        <div className="border rounded-lg p-4 bg-surface">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <ul className="space-y-2 text-sm">
            {product.specs.map((spec, index) => (
              <li key={index} className="flex flex-col">
                <span className="font-medium text-gray-800">{spec}</span>
                {/* Placeholder for spec value */}
                <span className="text-gray-500">{index === 0 ? '5G' : index === 1 ? '4GB RAM' : index === 2 ? '128GB Storage' : 'N/A'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="text-2xl font-bold text-primary">{product.price}</div>
        <div className="text-lg text-gray-600">
          Category: {product.category}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8 4a2 2 0 012 2h6a2 2 0 012 2V6h8a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6a2 2 0 012-2H8zm5.657 2.343a1 1 0 011.414 0l1.06 1.06a1 1 0 01-1.414 1.415l-1.06-1.06a1 1 0 010-1.415zM14 10a1 1 0 100 2h-1a1 1 0 100-2h1zm-3.657 5.657a1 1 0 010 1.414l1.06 1.06a1 1 0 11-1.414 1.415l-1.06-1.06a1 1 0 010-1.415zM10.5 14a1 1 0 100 2H9a1 1 0 100-2h1.5zM13 18a1 1 0 100 2H9.5a1 1 0 100-2H10z"
            />
            <path fillRule="evenodd" d="M4 12a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm1 0a1 1 0 100 2H4a1 1 0 01-1-1zm5.657-2.343a1 1 0 010 1.414l1.06 1.06a1 1 0 11-1.414 1.415l-1.06-1.06a1 1 0 010-1.415zM14 10a1 1 0 100 2h-1a1 1 0 100-2h1zm-3.657 5.657a1 1 0 010 1.414l1.06 1.06a1 1 0 11-1.414 1.415l-1.06-1.06a1 1 0 010-1.415zM10.5 14a1 1 0 100 2H9a1 1 0 100-2h1.5zM13 18a1 1 0 100 2H9.5a1 1 0 100-2H10z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <button
            onClick={handleAddToCart}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isInCart ? 'bg-gray-400' : 'bg-primary text-white'
            }`}
            disabled={isInCart}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <Link href={product.href} className="text-sm text-primary hover:underline">
            View Details
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg text-gray-600">SKU: ALIF-{product.id}</p>
        <p className="text-lg font-semibold text-primary mb-2">In Stock</p>
      </div>
    </div>
  );
}