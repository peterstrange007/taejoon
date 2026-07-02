"use client";

import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

const footerLinks = {
  products: [
    { href: "/products", label: "ALIF Core" },
    { href: "/products", label: "ALIF Voice" },
    { href: "/products", label: "ALIF Vision" },
    { href: "/products", label: "ALIF Solar" },
    { href: "/products", label: "Accessories" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/about", label: "Our Story" },
    { href: "/about", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/services", label: "Warranty" },
    { href: "/services", label: "FAQ" },
    { href: "/services", label: "Repair Service" },
    { href: "/contact", label: "Help Center" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Tae</span>
                <span className="text-primary">joon</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              Redefining assistive technology with intelligent, affordable
              devices that empower every individual to communicate, learn, and
              thrive.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaXTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaYoutube, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={`Follow us on ${Icon.name || "social media"}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 text-sm hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Taejoon. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <HiOutlineMail className="w-3.5 h-3.5" />
              hello@taejoon.com
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlinePhone className="w-3.5 h-3.5" />
              +91 1800-TAEJOON
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker className="w-3.5 h-3.5" />
              India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}