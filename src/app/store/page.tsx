"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingCart,
  HiOutlineTrash,
  HiOutlineArrowRight,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice: number;
  images: string[];
  inStock: boolean;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | "confirmation">("cart");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { cart, cartTotal, addToCart, removeFromCart, updateCartQuantity, clearCart } =
    useAuth();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customerInfo: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
            },
          },
          totalAmount: cartTotal,
          paymentMethod: "cod",
          paymentStatus: "pending",
        }),
      });

      if (res.ok) {
        clearCart();
        setCheckoutStep("confirmation");
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
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
              Shop <span className="text-gradient">ALIF</span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto">
              Select your ALIF device, add to cart, and checkout securely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Layout */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Available Products</h2>
                  {products.length === 0 ? (
                    <p className="text-white/40">No products available.</p>
                  ) : (
                    products.map((product, i) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-lg border border-white/5 bg-surface hover:bg-surface-light transition-all flex gap-4 items-start"
                      >
                        {/* Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-light flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.png"}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-white/40 mb-3">
                            {product.tagline}
                          </p>
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

                        {/* Action */}
                        <button
                          onClick={() => {
                            const existingItem = cart.find((c) => c.productId === product._id);
                            if (existingItem) {
                              updateCartQuantity(product._id, existingItem.edition, existingItem.quantity + 1);
                            } else {
                              addToCart({
                                productId: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                quantity: 1,
                                edition: "standard",
                              });
                            }
                            toast.success("Added to cart!");
                          }}
                          disabled={!product.inStock}
                          className={`px-6 py-2 rounded-lg font-medium transition-all flex-shrink-0 ${
                            product.inStock
                              ? "bg-primary text-black hover:bg-primary-light"
                              : "bg-white/10 text-white/40 cursor-not-allowed"
                          }`}
                        >
                          {product.inStock ? "Add" : "Out of Stock"}
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-xl border border-white/5 bg-surface">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <HiOutlineShoppingCart className="w-5 h-5" />
                  Your Cart
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <HiOutlineShoppingCart className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">Cart is empty</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={`${item.productId}-${item.edition}`}
                          className="p-3 rounded-lg bg-white/5 border border-white/5"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-white line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.productId, item.edition)}
                              className="text-white/40 hover:text-primary transition-colors"
                              aria-label="Remove from cart"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.productId,
                                    item.edition,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="text-white/60 hover:text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <HiOutlineMinus className="w-3 h-3" />
                              </button>
                              <span className="text-xs text-white font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(item.productId, item.edition, item.quantity + 1)
                                }
                                className="text-white/60 hover:text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <HiOutlinePlus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t border-white/5 pt-4 mb-4">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-white/60">Subtotal</span>
                        <span className="text-white font-medium">
                          ₹{cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between mb-4 text-sm">
                        <span className="text-white/60">Shipping</span>
                        <span className="text-white font-medium">Free</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-4">
                        <span className="font-bold text-white">Total</span>
                        <span className="text-lg font-bold text-primary">
                          ₹{cartTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => {
                        setShowCheckout(true);
                        setCheckoutStep("address");
                      }}
                      className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                    >
                      Checkout
                      <HiOutlineArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && checkoutStep !== "confirmation" && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl border border-white/5 max-w-md w-full max-h-screen overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {checkoutStep === "address" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCheckoutStep("payment");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    placeholder="123 Main Street"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="New Delhi"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="Delhi"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      placeholder="110001"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === "payment" && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                  <h3 className="font-semibold text-white mb-2">
                    Order Summary
                  </h3>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60 pb-2 border-b border-white/5">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <p className="text-sm text-white/80">
                    <span className="font-semibold">Payment Method:</span> Cash on
                    Delivery
                  </p>
                  <p className="text-xs text-white/40 mt-2">
                    Pay securely when your order arrives at your doorstep.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setCheckoutStep("address")}
                    className="flex-1 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Confirmation */}
      {checkoutStep === "confirmation" && (
        <section className="section-padding pt-0">
          <div className="container-custom max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <HiOutlineCheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-3">
                Order Confirmed!
              </h2>
              <p className="text-white/60 mb-8">
                Your order has been placed successfully. You'll receive a confirmation email shortly.
              </p>
              <Link href="/products" className="btn-primary text-base px-8 py-3.5">
                Continue Shopping
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
