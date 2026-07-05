"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  HiOutlineMenuAlt3,
  HiX,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineSearch,
} from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, cartCount, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/10" : ""}`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">Tae</span>
            <span className="text-primary">joon</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HiOutlineSearch className="w-5 h-5" />
          </button>

          {/* Cart */}
          <Link
            href="/store"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-primary text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                aria-label="User menu"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <HiOutlineUser className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-background border border-white/10 rounded-xl shadow-xl shadow-black/30 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-medium text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-white/40 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn-primary text-sm px-4 py-2"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiOutlineMenuAlt3 className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {!user && (
                <Link
                  href="/auth/login"
                  className="mt-2 btn-primary text-sm text-center py-3"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
