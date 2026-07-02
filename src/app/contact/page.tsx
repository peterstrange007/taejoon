"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: HiOutlinePhone,
    title: "Phone",
    value: "+91 (11) 4050-5050",
    link: "tel:+911140505050",
  },
  {
    icon: HiOutlineMail,
    title: "Email",
    value: "support@taejoon.com",
    link: "mailto:support@taejoon.com",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Headquarters",
    value: "New Delhi, India",
    link: "#",
  },
];

const offices = [
  {
    city: "Delhi",
    address: "Plot 456, Cyber City, New Delhi 110001",
    phone: "+91 11 4050-5050",
    email: "delhi@taejoon.com",
  },
  {
    city: "Bangalore",
    address: "Tech Park, Bangalore 560001",
    phone: "+91 80 4050-5050",
    email: "bangalore@taejoon.com",
  },
  {
    city: "Mumbai",
    address: "Bandra Kurla, Mumbai 400051",
    phone: "+91 22 4050-5050",
    email: "mumbai@taejoon.com",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        toast.success("Message sent! We'll be in touch soon.");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-white/50">
              Have questions or want to learn more? We'd love to hear from you.
              Reach out anytime and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-surface hover:border-primary/20 hover:bg-surface-light transition-all text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                <p className="text-white/60 text-sm hover:text-primary transition-colors">
                  {info.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="p-8 rounded-xl border border-primary/30 bg-primary/5 text-center">
                  <HiOutlineCheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-white/60">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-primary text-black font-medium rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Offices */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-colors"
                  >
                    <h3 className="font-semibold text-white text-lg mb-3">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex items-start gap-2">
                        <HiOutlineLocationMarker className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p>{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlinePhone className="w-4 h-4 text-primary flex-shrink-0" />
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineMail className="w-4 h-4 text-primary flex-shrink-0" />
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-8 p-6 rounded-xl border border-white/5 bg-white/5">
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: "FAQ", href: "/services#faq" },
                    { label: "Support Center", href: "/services" },
                    { label: "Careers", href: "#" },
                    { label: "Press Kit", href: "#" },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
