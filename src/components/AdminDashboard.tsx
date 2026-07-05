"use client";

import Image from "next/image";
import { HiOutlineChartBar, HiOutlineCube, HiOutlineShoppingBag, HiOutlineUsers, HiOutlineArrowUp, HiOutlineDotsHorizontal } from "react-icons/hi";

const products = [
  { name: "ALIF Core", stock: 42, price: "₹4,999", image: "/assets/products/product_img/Alif (70).jpg", status: "In stock" },
  { name: "ALIF Voice", stock: 18, price: "₹7,999", image: "/assets/products/product_img/Alif (46).jpg", status: "In stock" },
  { name: "ALIF Vision", stock: 7, price: "₹9,999", image: "/assets/products/product_img/Alif (12).jpg", status: "Low stock" },
];
const orders = [
  { id: "TJ-2048", customer: "Aarav Sharma", total: "₹7,999", status: "Processing" },
  { id: "TJ-2047", customer: "Meera Foundation", total: "₹29,997", status: "Shipped" },
  { id: "TJ-2046", customer: "Kabir Singh", total: "₹4,999", status: "Delivered" },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Revenue", value: "₹4.82L", change: "+18.2%", icon: HiOutlineChartBar },
    { label: "Orders", value: "284", change: "+12.5%", icon: HiOutlineShoppingBag },
    { label: "Customers", value: "1,248", change: "+9.1%", icon: HiOutlineUsers },
    { label: "Products", value: "4", change: "124 units", icon: HiOutlineCube },
  ];
  return <main className="min-h-screen bg-[#f5f5f7] px-5 pb-20 pt-28 text-[#171717] sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-primary">Taejoon Console</p><h1 className="mt-1 text-4xl font-semibold tracking-[-.04em]">Good morning, Admin.</h1><p className="mt-2 text-[#737373]">Here is what is happening across your store today.</p></div><button className="rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white">Add product</button></div>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, change, icon: Icon }) => <article key={label} className="rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,.04)]"><div className="flex items-center justify-between"><span className="rounded-2xl bg-[#f5f5f7] p-3"><Icon className="h-6 w-6" /></span><span className="flex items-center text-xs font-semibold text-emerald-600"><HiOutlineArrowUp />{change}</span></div><p className="mt-7 text-sm text-[#777]">{label}</p><p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p></article>)}</section>
      <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl bg-[#111] p-7 text-white"><div className="flex items-center justify-between"><div><p className="text-sm text-white/50">Revenue overview</p><h2 className="mt-1 text-2xl font-semibold">Sales performance</h2></div><span className="rounded-full bg-white/10 px-4 py-2 text-xs">Last 6 months</span></div><div className="mt-12 flex h-52 items-end gap-3">{[42,58,48,72,68,92,76,105,88,122,108,142].map((h,i)=><div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-orange-300" style={{height:`${h}px`,opacity:.55+i*.035}} />)}</div><div className="mt-4 flex justify-between text-xs text-white/35"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div></article>
        <article className="rounded-3xl bg-white p-7"><p className="text-sm text-[#777]">Order completion</p><div className="mx-auto mt-7 flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#ff6b00_0_78%,#eee_78%)]"><div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white"><span className="text-4xl font-semibold">78%</span><span className="text-xs text-[#777]">fulfilled</span></div></div><div className="mt-7 grid grid-cols-2 gap-3 text-center"><div className="rounded-2xl bg-[#f5f5f7] p-3"><b>221</b><p className="text-xs text-[#777]">Completed</p></div><div className="rounded-2xl bg-[#fff4ec] p-3"><b>63</b><p className="text-xs text-[#777]">In progress</p></div></div></article>
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <article className="overflow-hidden rounded-3xl bg-white"><div className="flex items-center justify-between p-7"><div><h2 className="text-xl font-semibold">Inventory</h2><p className="text-sm text-[#777]">Current product availability</p></div><button className="text-sm font-semibold text-primary">View all</button></div><div>{products.map(p=><div key={p.name} className="flex items-center gap-4 border-t border-black/5 px-7 py-4"><Image src={p.image} alt="" width={52} height={52} className="h-13 w-13 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="font-semibold">{p.name}</p><p className="text-xs text-[#777]">{p.stock} units · {p.price}</p></div><span className={`rounded-full px-3 py-1 text-xs font-medium ${p.stock<10?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}`}>{p.status}</span></div>)}</div></article>
        <article className="overflow-hidden rounded-3xl bg-white"><div className="flex items-center justify-between p-7"><div><h2 className="text-xl font-semibold">Recent orders</h2><p className="text-sm text-[#777]">Latest customer purchases</p></div><HiOutlineDotsHorizontal /></div><div>{orders.map(o=><div key={o.id} className="grid grid-cols-[1fr_auto] gap-3 border-t border-black/5 px-7 py-5"><div><p className="font-semibold">{o.customer}</p><p className="text-xs text-[#777]">{o.id} · {o.status}</p></div><b>{o.total}</b></div>)}</div></article>
      </section>
    </div>
  </main>;
}
