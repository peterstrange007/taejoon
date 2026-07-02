import { useEffect, useState } from 'react';
import { Product } from '@/models/Product';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products and orders from the backend
    // For now, we'll use sample data
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: 'Smartphone X',
        tagline: 'Flagship smartphone with advanced features',
        price: '$799',
        category: 'Smartphones',
        image: '/images/product1.jpg',
        specs: ['5G', '4GB RAM', '128GB Storage'],
        href: '/products/1'
      },
      {
        id: 2,
        name: 'Tablet Pro',
        tagline: 'High-performance tablet for productivity',
        price: '$499',
        category: 'Tablets',
        image: '/images/product2.jpg',
        specs: ['10-inch display', '6GB RAM', '256GB Storage'],
        href: '/products/2'
      }
    ];

    const sampleOrders = [
      {
        id: 1,
        customer: 'John Doe',
        amount: '$799',
        status: 'Processing'
      },
      {
        id: 2,
        customer: 'Jane Smith',
        amount: '$499',
        status: 'Shipped'
      }
    ];

    setProducts(sampleProducts);
    setOrders(sampleOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Products</h2>
            <p className="text-gray-500">Total: {products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
            <p className="text-gray-500">Total: {orders.length}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-700">Product Management</h2>
            <p className="text-gray-500">Manage your product catalog, inventory, and pricing.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-700">Order Management</h2>
            <p className="text-gray-500">View, track, and fulfill customer orders.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Recent Activity</h2>
          <div className="mt-4">
            <p className="text-gray-500">No recent activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}