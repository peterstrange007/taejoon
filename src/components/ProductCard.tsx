import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="group rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-surface hover:transform hover:scale-105 transition-transform duration-300 group-hover:scale-102">
      <Link href={product.href} className="group-hover:scale-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="absolute bottom-2 left-2">
        <h3 className="text-white font-semibold text-sm">
          {product.name}
        </h3>
        <p className="text-white/80 text-xs">
          {product.tagline}
        </p>
        <button
          onClick={openModal}
          className="mt-2 rounded-full bg-primary text-white px-3 py-1 text-sm hover:bg-primary/80 transition-colors"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}

/* Quick view modal */
export function QuickViewModal({ product }) {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen(!open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
          {product.name}
        </h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-2xl mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Category:</p>
            <p className="font-medium">{product.category}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Price:</p>
            <p className="font-medium">₹{product.price}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Specs:</p>
          <ul className="text-sm text-gray-800 space-y-1">
            {product.specs.map((spec, i) => (
              <li key={i}>• {spec}</li>
            ))}
          </ul>
        </div>
        <button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}