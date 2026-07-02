import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 left-0 right-0 z-50">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary">
              Taejoon
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:inline-block">
            <ul className="flex items-center space-x-6 text-lg font-medium">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-700 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-700 hover:text-primary transition-colors">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side: Search, Cart, Auth */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-2 py-1 rounded-md border border-gray-300 text-sm focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="pointer-events-none absolute left-3 top-2.5 w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 01-11.65 0 7 7 0 010 11.65"
                />
              </path>
            </div>

            {/* Cart */}
            <Link href="/cart" className="text-gray-700 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 4H3v10.55A2 2 0 005 22h14a2 2 0 002-2V7H3V3z" />
              </svg>
            </Link>

            {/* Auth Button */}
            <button
              onClick={openModal}
              className="text-gray-700 hover:text-primary transition-colors"
              aria-label="Login/Register"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 01-11.65 0 7 7 0 010 11.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={openModal}
            className="text-gray-700 hover:text-primary transition-colors"
            aria-label="Login/Register"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="hidden md:block">
            <ul className="flex flex-col space-y-2 mt-2 right-0">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-700 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-700 hover:text-primary transition-colors">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Auth Button */}
        <div className="md:hidden">
          <button
            onClick={openModal}
            className="text-gray-700 hover:text-primary transition-colors"
            aria-label="Login/Register"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 01-11.65 0 7 7 0 010 11.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden ${showModal ? 'block' : 'hidden'} absolute inset-0 bg-white z-50 flex flex-col items-center p-4 space-y-4`}>
        <div className="w-full max-w-md">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                Services
              </Link>
            </li>
            <li>
              <Link href="/store" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                Store
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors w-full text-left px-3 py-2 rounded-md">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
        >
          Close
        </button>
      </div>
    </nav>

    {/* Auth Modal */}
    <div className={showModal ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' : 'hidden'}>
      <AuthModalComponent show={showModal} onClose={closeModal} />
    </div>
  );
}

// Dummy component for auth modal (to be replaced with actual modal)
function AuthModalComponent({ show, onClose }: { show: boolean; onClose: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl font-bold text-center mb-4">
        Welcome!
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Please sign in or create an account.
      </p>
      <button
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}