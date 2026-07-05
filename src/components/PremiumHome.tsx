"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineSupport } from "react-icons/hi";

const devices = [
  { name: "ALIF Core", line: "Communication, beautifully simple.", price: "From ₹4,999", image: "/assets/products/product_img/Alif (70).jpg", tone: "bg-[#f3f3f3]" },
  { name: "ALIF Voice", line: "Your thoughts. Your voice.", price: "From ₹7,999", image: "/assets/products/product_img/Alif (46).jpg", tone: "bg-[#e9f0f6]" },
  { name: "ALIF Vision", line: "See more. Say more.", price: "From ₹9,999", image: "/assets/products/product_img/Alif (12).jpg", tone: "bg-[#f5ede7]" },
];

const features = [
  { icon: HiOutlineSparkles, title: "Adapts to you", copy: "ALIF learns communication patterns and puts the right words closer." },
  { icon: HiOutlineShieldCheck, title: "Private by design", copy: "Personal communication stays protected and under your control." },
  { icon: HiOutlineSupport, title: "Human support", copy: "Setup, training, and care from people who understand accessibility." },
];

export default function PremiumHome() {
  return <main className="overflow-hidden bg-white text-[#111]">
    <section className="relative flex min-h-[92vh] items-center bg-[#f5f5f7] pt-20">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-6 py-16 lg:grid-cols-2 lg:px-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center lg:text-left">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[.22em] text-primary">Introducing ALIF</p>
          <h1 className="text-5xl font-semibold leading-[.96] tracking-[-.055em] sm:text-7xl xl:text-[92px]">Every voice.<br /><span className="text-[#777]">Fully heard.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[#626262] lg:mx-0 lg:text-xl">Thoughtful assistive technology that makes communication natural, personal, and wonderfully simple.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"><Link href="/store" className="rounded-full bg-primary px-7 py-3.5 font-semibold text-white hover:bg-primary-dark">Shop ALIF</Link><Link href="/products" className="group flex items-center gap-2 rounded-full border border-[#bbb] px-7 py-3.5 font-semibold hover:border-[#111]">Explore devices <HiArrowRight className="transition group-hover:translate-x-1" /></Link></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto h-[420px] w-full max-w-[680px] lg:h-[650px]"><div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-orange-100 via-white to-blue-100 blur-2xl" /><Image src="/assets/hero-section/hero (6).png" alt="ALIF communication device" fill priority className="relative object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,.16)]" /></motion.div>
      </div>
    </section>
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto max-w-[1380px]"><div className="mb-14 text-center"><p className="text-sm font-semibold text-primary">Find your ALIF</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">One purpose. Made personal.</h2></div><div className="grid gap-5 lg:grid-cols-3">{devices.map((device, i) => <motion.article key={device.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className={`${device.tone} group overflow-hidden rounded-[32px] p-8 text-center sm:p-10`}><h3 className="text-3xl font-semibold">{device.name}</h3><p className="mt-2 text-[#666]">{device.line}</p><div className="relative mt-6 h-72 overflow-hidden rounded-2xl"><Image src={device.image} alt={device.name} fill className="object-cover transition duration-700 group-hover:scale-105" /></div><div className="mt-7 flex items-center justify-between"><span className="font-medium text-[#555]">{device.price}</span><Link href="/store" className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary">Buy</Link></div></motion.article>)}</div></div></section>
    <section className="bg-[#0a0a0a] px-6 py-28 text-white"><div className="mx-auto max-w-6xl text-center"><p className="text-sm font-semibold text-primary">Intelligence that feels human</p><h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-[-.045em] sm:text-7xl">Powerful technology.<br /><span className="text-white/40">Quietly working for you.</span></h2><div className="mt-16 grid gap-4 text-left md:grid-cols-3">{features.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-3xl bg-white/[.06] p-8 ring-1 ring-white/10"><Icon className="h-8 w-8 text-primary" /><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-white/50">{copy}</p></div>)}</div></div></section>
    <section className="px-6 py-28 text-center"><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-6xl">A voice changes everything.</h2><p className="mx-auto mt-5 max-w-xl text-lg text-[#666]">Choose an ALIF device today, or talk to our team to find the right fit.</p><div className="mt-9 flex justify-center gap-4"><Link href="/store" className="rounded-full bg-primary px-8 py-3.5 font-semibold text-white">Shop now</Link><Link href="/contact" className="rounded-full border border-[#bbb] px-8 py-3.5 font-semibold">Talk to us</Link></div></section>
  </main>;
}
