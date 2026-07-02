import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

// Sample product data
const products: Product[] = [
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
  },
  {
    id: 3,
    name: 'Smart TV',
    tagline: '4K Ultra HD Smart Television',
    price: '$699',
    category: 'TVs',
    image: '/images/product3.jpg',
    specs: ['55-inch', '8GB RAM', '16GB Storage'],
    href: '/products/3'
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    tagline: 'Premium wireless earbuds with noise cancellation',
    price: '$149',
    category: 'Accessories',
    image: '/images/product4.jpg',
    specs: ['Noise Cancellation', '20hr Battery', 'Bluetooth 5.0'],
    href: '/products/4'
  }
];

// Get all products
router.get('/', (req: any, res: any) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req: any, res: any) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;