"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineCube,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineDeviceMobile,
  HiOutlineChatAlt2,
  HiOutlineEye,
  HiOutlineSun,
} from "react-icons/hi";

const products = [
  {
    icon: HiOutlineDeviceMobile,
    name: "ALIF Core",
    tagline: "Essential communication, simplified.",
    price: "₹4,999",
    color: "from-primary/20 to-primary/5",
    href: "/products/alif-core",
  },
  {
    icon: HiOutlineChatAlt2,
    name: "ALIF Voice",
    tagline: "Speak with clarity. Powered by AI.",
    price: "₹7,999",
    color: "from-blue-500/20 to-blue-500/5",
    href: "/products/alif-voice",
  },
  {
    icon: HiOutlineEye,
    name: "ALIF Vision",
    tagline: "See the world differently.",
    price: "₹9,999",
    color: "from-purple-500/20 to-purple-500/5",
    href: "/products/alif-vision",
  },
  {
    icon: HiOutlineSun,
    name: "ALIF Solar",
    tagline: "Unlimited power. Unlimited potential.",
    price: "₹12,999",
    color: "from-amber-500/20 to-amber-500/5",
    href: "/products/alif-solar",
  },
];

const features = [
  {
    icon: HiOutlineSparkles,
    title: "AI-Powered",
    desc: "Advanced machine learning adapts to every user's unique communication style.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Made in India",
    desc: "Designed, engineered, and manufactured locally with global quality standards.",
  },
  {
    icon: HiOutlineHeart,
    title: "Affordable",
    desc: "Premium assistive technology at a fraction of the cost — starting at just ₹4,999.",
  },
  {
    icon: HiOutlineCube,
    title: "Modular Design",
    desc: "Swap editions, upgrade components, and customize your ALIF as needs evolve.",
  },
];

const tiers = [
  {
    name: "Student",
    discount: "15% off",
    desc: "Valid student ID required. One ALIF per academic year.",
    highlight: false,
  },
  {
    name: "Parent / Guardian",
    discount: "10% off",
    desc: "For parents purchasing on behalf of a dependent. Family bundle available.",
    highlight: true,
  },
  {
    name: "Institute",
    discount: "Bulk pricing",
    desc: "Schools, NGOs, and therapy centers. Dedicated onboarding & training included.",
    highlight: false,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  return (
    <div className="overflow-hidden">
      {/* ───── Hero Section ───── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container-custom text-center py-20 md:py-32"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <HiOutlineLightningBolt className="w-4 h-4" />
            Next-Gen Assistive Technology
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Every voice
            <br />
            deserves to be{" "}
            <span className="text-gradient">heard.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-10"
          >
            Taejoon&apos;s ALIF devices bring intelligent, affordable
            communication to every individual — redefining what assistive
            technology can do.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="btn-primary text-base px-8 py-3.5">
              Explore Products
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-outline text-base px-8 py-3.5">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "10K+", label: "Devices Shipped" },
              { value: "500+", label: "Partner Schools" },
              { value: "24/7", label: "Support" },
              { value: "₹4,999", label: "Starting Price" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/30">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ───── Product Showcase ───── */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose your{" "}
              <span className="text-gradient">ALIF</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Four editions. One purpose. Find the ALIF that fits your world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="group block relative p-6 rounded-2xl border border-white/5 bg-surface hover:bg-surface-light transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center border border-white/5`}
                  >
                    <product.icon className="w-7 h-7 text-white/80" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-4 leading-relaxed">
                    {product.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {product.price}
                    </span>
                    <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Learn more <HiOutlineArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-gradient">Taejoon</span>?
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              We&apos;re not just building devices — we&apos;re building a
              movement for accessible technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Pricing Tiers ───── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Special <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              We believe cost should never be a barrier. Choose your tier and
              save.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all ${
                  tier.highlight
                    ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-white/5 bg-surface hover:border-white/10"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mb-1">
                  {tier.name}
                </h3>
                <div className="text-2xl font-bold text-primary mb-3">
                  {tier.discount}
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  {tier.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link href="/store" className="btn-primary text-base px-8 py-3.5">
              Order Your ALIF
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───── CTA Banner ───── */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-primary/5 border border-primary/10 p-10 md:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to{" "}
                <span className="text-gradient">empower</span> a voice?
              </h2>
              <p className="text-white/40 max-w-md mx-auto mb-8">
                Join thousands of families, schools, and institutes already
                using ALIF to transform lives.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/store"
                  className="btn-primary text-base px-8 py-3.5"
                >
                  Buy Now
                  <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline text-base px-8 py-3.5"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
