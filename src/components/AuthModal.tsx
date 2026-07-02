import { useState } from 'react';

export default function AuthModal() {
  const [showModal, setShowModal] = useState(true);

  const close = () => setShowModal(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <button
          onClick={close}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
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
        <h2 className="text-xl font-bold text-center mb-4">
          Welcome!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Please sign in or create an account.
        </p>
        <button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}