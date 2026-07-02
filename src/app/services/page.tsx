"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineWrench,
  HiOutlineHeartHandshake,
  HiOutlineLightningBolt,
  HiOutlineChevronDown,
  HiOutlineArrowRight,
} from "react-icons/hi";

export const metadata = {
  title: "Services & Support",
  description: "Comprehensive warranty, 24/7 support, extended care plans, and device upgrade programs for ALIF devices.",
  keywords: ["warranty", "support", "service plans", "technical support"],
};

const services = [
  {
    icon: HiOutlineShieldCheck,
    title: "2-Year Warranty",
    desc: "Comprehensive coverage for manufacturing defects and technical issues. Free repairs and replacements included.",
  },
  {
    icon: HiOutlineWrench,
    title: "24/7 Technical Support",
    desc: "Dedicated support team available round-the-clock via phone, email, and chat. Average response time: 1 hour.",
  },
  {
    icon: HiOutlineHeartHandshake,
    title: "Extended Care Plans",
    desc: "Optional plans covering accidental damage, lost parts replacement, and priority service for 3-5 years.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Device Upgrade Program",
    desc: "Trade in your old ALIF for credit towards a new model. Get the latest features at a discounted price.",
  },
];

const faqs = [
  {
    question: "What is the warranty coverage?",
    answer:
      "All ALIF devices come with a 2-year manufacturer's warranty covering defects and malfunctions. We offer free repairs and replacements. Extended care plans available for accidental damage.",
  },
  {
    question: "How long does repair typically take?",
    answer:
      "Standard repairs are completed within 5-7 business days. Express repair service available (2-3 days) for an additional fee. Loaner devices provided during repair.",
  },
  {
    question: "Can I get on-site support?",
    answer:
      "Yes! For schools, institutes, and bulk orders, we offer on-site installation, training, and support. Contact our enterprise team for details.",
  },
  {
    question: "What if my device is damaged accidentally?",
    answer:
      "Standard warranty covers manufacturing defects only. However, our Extended Care Plans (₹999/year) cover accidental damage with a small deductible.",
  },
  {
    question: "Is training provided?",
    answer:
      "Yes! All purchases include free initial training for users and caregivers. We offer online video tutorials, webinars, and documentation in multiple languages.",
  },
  {
    question: "Can I upgrade my device?",
    answer:
      "Absolutely! Trade in your existing ALIF and get 30% credit towards a new model. Stay updated with the latest features.",
  },
];

export default function ServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="section-padding relative pt-32">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Support &<span className="text-gradient"> Services</span>
            </h1>
            <p className="text-lg text-white/50">
              Comprehensive warranty, training, and support services to ensure
              your ALIF device serves you reliably for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-surface hover:border-primary/20 hover:bg-surface-light transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/40">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Details */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Standard <span className="text-gradient">Warranty</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "What's Covered",
                  items: [
                    "Manufacturing defects",
                    "Software bugs and updates",
                    "Hardware malfunctions",
                    "Free repairs and replacements",
                  ],
                },
                {
                  title: "Duration",
                  items: [
                    "2 years from date of purchase",
                    "Extends with optional care plans",
                    "Transferable to new owner",
                  ],
                },
                {
                  title: "Exclusions",
                  items: [
                    "Accidental damage (covered by Extended Care Plans)",
                    "Water damage from non-professional use",
                    "Loss or theft",
                    "Normal wear and tear",
                  ],
                },
              ].map((section, i) => (
                <div key={section.title} className="p-6 rounded-lg border border-white/5">
                  <h3 className="font-semibold text-white mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Care Plans */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Extended <span className="text-gradient">Care Plans</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Optional plans for enhanced protection and peace of mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹999",
                period: "/year",
                features: [
                  "Accidental damage coverage",
                  "Lost parts replacement",
                  "Priority repair service",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "₹1,999",
                period: "/year",
                popular: true,
                features: [
                  "Everything in Basic +",
                  "24/7 phone support",
                  "Quarterly device checkup",
                  "Free software updates",
                  "Upgrade discount (20%)",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                features: [
                  "Dedicated account manager",
                  "On-site support",
                  "Bulk device management",
                  "Training programs",
                  "Custom SLAs",
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-xl border transition-all ${
                  plan.popular
                    ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-white/5 bg-surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-black text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  {plan.price}
                  <span className="text-sm text-white/40 font-normal">
                    {" "}
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 px-4 rounded-lg font-medium bg-primary text-black hover:bg-primary-light transition-colors">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/5 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === i ? null : i)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>
                  <HiOutlineChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 text-white/60 border-t border-white/5"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-primary/5 border border-primary/10 p-10 md:p-16 text-center"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need <span className="text-gradient">Help?</span>
              </h2>
              <p className="text-white/40 max-w-md mx-auto mb-8">
                Our support team is here to assist you 24/7. Reach out anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
                  Contact Support
                  <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="mailto:support@taejoon.com"
                  className="btn-outline text-base px-8 py-3.5"
                >
                  Email Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
