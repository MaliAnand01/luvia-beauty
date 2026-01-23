/* eslint-disable no-unused-vars */
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import { Users, DollarSign, ShoppingBag, BarChart3, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const allOrders = JSON.parse(localStorage.getItem("luvia_orders")) || [];
  const allUsers = JSON.parse(localStorage.getItem("luvia_users")) || [];
  
  const totalSales = allOrders.reduce((acc, curr) => acc + curr.total, 0);

  const stats = [
    { label: "Total Revenue", value: `$${totalSales.toFixed(2)}`, icon: <DollarSign />, color: "bg-green-100 text-green-600" },
    { label: "Total Orders", value: allOrders.length, icon: <ShoppingBag />, color: "bg-brand-rose/20 text-brand-berry" },
    { label: "Registered Users", value: allUsers.length, icon: <Users />, color: "bg-blue-100 text-blue-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-12">
        <span className="text-brand-terracotta uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">Management</span>
        <h1 className="text-5xl font-serif text-brand-berry dark:text-brand-rose">Executive Overview</h1>
      </header>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-xl shadow-brand-rose/5 border border-brand-rose/10 flex items-center gap-6"
          >
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-brand-rose/10 shadow-2xl shadow-brand-berry/5 overflow-hidden">
        <div className="p-8 border-b border-brand-rose/10 flex justify-between items-center">
          <h2 className="text-2xl font-serif text-brand-berry dark:text-brand-rose flex items-center gap-3">
            <Users size={24} /> Customer Database
          </h2>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
            <TrendingUp size={14} /> Live Sync
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-rose/5 text-[10px] uppercase tracking-[0.2em] font-bold">
              <tr>
                <th className="px-8 py-5">Full Name</th>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">User ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-rose/5">
              {allUsers.length > 0 ? allUsers.map((u, i) => (
                <tr key={i} className="hover:bg-brand-nude/30 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 font-bold text-sm">{u.name}</td>
                  <td className="px-8 py-5 text-sm opacity-60 italic">{u.email}</td>
                  <td className="px-8 py-5">
                    <span className="bg-brand-rose/10 text-brand-terracotta px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Verified</span>
                  </td>
                  <td className="px-8 py-5 text-right font-mono text-[10px] opacity-40">{u.id}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-gray-400 italic font-sans text-sm">No registered customers yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}