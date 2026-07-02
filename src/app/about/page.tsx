"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineLightningBolt,
  HiOutlineHeart,
  HiOutlineGlobeAlt,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
} from "react-icons/hi";

const team = [
  {
    name: "Amit Kumar",
    role: "Founder & CEO",
    bio: "Passionate about accessibility and inclusive technology",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    bio: "AI and machine learning expert with 10+ years experience",
  },
  {
    name: "Rahul Gupta",
    role: "Head of Product",
    bio: "User-centric product designer focused on simplicity",
  },
  {
    name: "Neha Singh",
    role: "Head of Operations",
    bio: "Building scalable processes for global impact",
  },
];

const milestones = [
  { year: "2020", event: "Taejoon founded with a vision for accessibility" },
  { year: "2021", event: "ALIF Core launched to market" },
  { year: "2022", event: "Reached 10,000 devices shipped globally" },
  { year: "2023", event: "Expanded to 500+ partner schools" },
  { year: "2024", event: "Launched ALIF Solar with renewable energy" },
  { year: "2025", event: "Achieved carbon-neutral manufacturing" },
];

const values = [
  {
    icon: HiOutlineHeart,
    title: "Accessibility First",
    desc: "Every device is built for inclusivity. No barriers, only possibilities.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Innovation",
    desc: "Continuous R&D to bring cutting-edge AI to assistive technology.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Sustainability",
    desc: "Environmentally responsible manufacturing and packaging.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Education",
    desc: "Empowering communities with free training and support programs.",
  },
];

export default function AboutPage() {
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
              Redefining Assistive{" "}
              <span className="text-gradient">Technology</span>
            </h1>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              At Taejoon, we believe that technology should serve everyone. Our
              mission is to make intelligent assistive devices affordable,
              accessible, and impactful for millions worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineLightningBolt className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-white/60 leading-relaxed">
                    To democratize assistive communication technology by building
                    intelligent, affordable, and modular devices that empower
                    every individual to express themselves. We're committed to
                    breaking down barriers and creating a world where disability
                    is not a limitation, but a different way of being.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineGlobeAlt className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-white/60 leading-relaxed">
                    A future where millions of non-verbal and low-verbal
                    individuals have a voice. Where assistive technology is as
                    common as smartphones, and where no one is left behind due
                    to cost or accessibility. We envision a connected world
                    powered by inclusivity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              These principles guide every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-surface hover:bg-surface-light transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-white/40">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface/50 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 relative"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary mt-2" />
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 h-20 bg-gradient-to-b from-primary to-primary/20 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="font-bold text-primary text-lg">
                    {milestone.year}
                  </h3>
                  <p className="text-white/60">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Passionate individuals united by a mission to change lives.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl border border-white/5 bg-surface hover:border-primary/20 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-white/40">{member.bio}</p>
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
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our <span className="text-gradient">Movement</span>
              </h2>
              <p className="text-white/40 max-w-md mx-auto mb-8">
                Whether you&apos;re looking to purchase, partner, or contribute,
                we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products" className="btn-primary text-base px-8 py-3.5">
                  Shop ALIF
                  <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-outline text-base px-8 py-3.5">
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
