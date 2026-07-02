"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

interface CartItem {
  productId: string;
  name: string;
  edition: string;
  price: number;
  quantity: number;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  cart: CartItem[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, edition: string) => void;
  updateCartQuantity: (
    productId: string,
    edition: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("taejoon-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("taejoon-cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch current user on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    setUser(data.user);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setUser(data.user);
    },
    []
  );

  const logout = useCallback(async () => {
    // Clear the auth cookie by setting it to expire
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUser(null);
    setCart([]);
    localStorage.removeItem("taejoon-cart");
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.edition === item.edition
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.edition === item.edition
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: string, edition: string) => {
      setCart((prev) =>
        prev.filter(
          (i) => i.productId !== productId || i.edition !== edition
        )
      );
    },
    []
  );

  const updateCartQuantity = useCallback(
    (productId: string, edition: string, quantity: number) => {
      if (quantity <= 0) {
        setCart((prev) =>
          prev.filter(
            (i) => i.productId !== productId || i.edition !== edition
          )
        );
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.edition === edition
            ? { ...i, quantity }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cart,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}