"use client";

import { useState } from 'react';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would process the payment
    // For now, we'll just show a success message
    alert('Payment processed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Item 1</span>
              <span>$799</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Item 2</span>
              <span>$499</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-medium text-gray-900">
              <span>Total</span>
              <span>$1298</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
}
