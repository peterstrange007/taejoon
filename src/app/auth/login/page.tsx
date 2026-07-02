"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Taejoon account to manage orders and access exclusive features.",
  robots: { index: false },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      const data = await res.json();
      login(data.user);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-background" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/40">Sign in to your Taejoon account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-light transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <HiOutlineArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">Don't have an account?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Register Link */}
          <Link
            href="/auth/register"
            className="block w-full py-3 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors text-center"
          >
            Create Account
          </Link>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-white/40">
            <Link href="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
