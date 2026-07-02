import { motion } from 'framer-motion';
import Link from 'next/link';
import FeaturedSlider from './FeaturedSlider';

type Stat = {
  value: string;
  label: string;
};

export default function Hero() {
  // Sample stats data
  const stats: Stat[] = [
    { value: "10K+", label: "Devices Shipped" },
    { value: "500+", label: "Partner Schools" },
    { value: "24/7", label: "Support" },
    { value: "₹4,999", label: "Starting Price" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-grid" />

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center py-20 md:py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 01-11.65 0 7 7 0 010 11.65"></path>
          </svg>
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
          Taejoon's ALIF devices bring intelligent, affordable communication to every individual — redefining what assistive technology can do.
        </motion.p>

        {/* Featured Items Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <FeaturedSlider />
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link href="/products?category=smartphones" className="text-sm font-medium text-primary hover:underline">
            Smartphones
          </Link>
          <Link href="/products?category=tablets" className="text-sm font-medium text-primary hover:underline">
            Tablets
          </Link>
          <Link href="/products?category=tv" className="text-sm font-medium text-primary hover:underline">
            TVs
          </Link>
          <Link href="/products?category=accessories" className="text-sm font-medium text-primary hover:underline">
            Accessories
          </Link>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/products" className="btn-primary text-base px-8 py-3.5">
            Explore Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2 4 4-4 4-4-4 2-2z" />
            </svg>
          </Link>
          <Link href="/about" className="btn-outline text-base px-8 py-3.5">
            Our Story
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 1.998 0 .546.284 1.002 0.743 1.299L7 16.998l5.457 2.997c.458.25 1.004.416 1.555.416 1.08 0 1.998-.895 1.998-2 0-.546-.284-1.002-.743-1.299l-5.457-2.997L1 12.002c-.275 1.003-.565 2.058-.565 3.01 0 1.657 1.343 3 3 3h12c1.657 0 3-.895 3-2 0-.546-.284-1.002-.565-1.523L13 5.998z" />
            </svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/30">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}