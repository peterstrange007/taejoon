"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export const metadata = {
  title: "Products",
  description: "Explore ALIF assistive devices. Find Core, Voice, Vision, and Solar editions with advanced features and affordable pricing.",
  keywords: ["ALIF products", "assistive devices", "communication aids", "accessibility"],
};

interface Product {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockCount: number;
}

const categories = [
  { id: "all", label: "All Products" },
  { id: "core", label: "Core" },
  { id: "voice", label: "Voice" },
  { id: "vision", label: "Vision" },
  { id: "solar", label: "Solar" },
  { id: "accessories", label: "Accessories" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToCart } = useAuth();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      slug: product.slug,
    });
    toast.success("Added to cart!");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="section-padding relative pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover <span className="text-gradient">ALIF</span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto">
              Explore our complete range of assistive communication devices.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12 relative"
          >
            <div className="relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-black"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/40">No products found.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative rounded-xl overflow-hidden bg-surface border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-surface-light">
                        <img
                          src={product.images[0] || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product._id);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-primary transition-colors"
                          aria-label="Add to wishlist"
                        >
                          <HiOutlineHeart
                            className={`w-5 h-5 ${
                              wishlist.includes(product._id)
                                ? "fill-primary text-primary"
                                : "text-white"
                            }`}
                          />
                        </button>

                        {/* Stock Badge */}
                        {product.inStock && product.stockCount < 5 && (
                          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                            Only {product.stockCount} left
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-white/40 mb-3 line-clamp-2">
                          {product.tagline}
                        </p>

                        {/* Price */}
                        <div className="mt-auto mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-white/40 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          disabled={!product.inStock}
                          className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                            product.inStock
                              ? "bg-primary text-black hover:bg-primary-light"
                              : "bg-white/10 text-white/40 cursor-not-allowed"
                          }`}
                          aria-label="Add to cart"
                        >
                          <HiOutlineShoppingCart className="w-4 h-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
