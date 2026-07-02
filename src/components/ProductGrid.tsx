"use client";

import { useState } from 'react';
import Image from 'next/image';

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

export default function ProductGrid() {
  // Sample product data
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "ALIF Core",
      tagline: "Essential communication, simplified.",
      price: "₹4,999",
      category: "Smartphones",
      image: "/assets/products/slide-show/Alif (6).jpg",
      specs: ["5G", "4GB RAM", "128GB Storage"],
      href: "/products/alif-core",
    },
    {
      id: 2,
      name: "ALIF Voice",
      tagline: "Speak with clarity. Powered by AI.",
      price: "₹7,999",
      category: "Smartphones",
      image: "/assets/products/slide-show/Alif (16).jpg",
      specs: ["5G", "8GB RAM", "256GB Storage"],
      href: "/products/alif-voice",
    },
    {
      id: 3,
      name: "ALIF Vision",
      tagline: "See the world differently.",
      price: "₹9,999",
      category: "Tablets",
      image: "/assets/products/slide-show/Alif (21).jpg",
      specs: ["5G", "12GB RAM", "512GB Storage"],
      href: "/products/alif-vision",
    },
    {
      id: 4,
      name: "ALIF Solar",
      tagline: "Unlimited power. Unlimited potential.",
      price: "₹12,999",
      category: "Accessories",
      image: "/assets/products/slide-show/Alif (24).jpg",
      specs: ["Solar Charging", "10,000mAh Battery"],
      href: "/products/alif-solar",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="space-y-12">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-surface hover:transform hover:scale-105 transition-transform duration-300 group-hover:scale-102"
          >
            <a href={product.href}>
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={384}
                className="w-full h-48 object-cover"
              />
            </a>
            <div className="absolute bottom-2 left-2">
              <h3 className="text-white font-semibold text-sm">
                {product.name}
              </h3>
              <p className="text-white/80 text-xs">
                {product.tagline}
              </p>
              <button
                onClick={() => openModal(product)}
                className="mt-2 rounded-full bg-primary text-white px-3 py-1 text-sm hover:bg-primary/80 transition-colors"
                aria-label="Quick view"
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              {selectedProduct.name}
            </h2>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={768}
              height={512}
              className="w-full h-64 object-cover rounded-t-2xl mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Category:</p>
                <p className="font-medium">{selectedProduct.category}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Price:</p>
                <p className="font-medium">₹{selectedProduct.price}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Specs:</p>
              <ul className="text-sm text-gray-800 space-y-1">
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i}>• {spec}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
