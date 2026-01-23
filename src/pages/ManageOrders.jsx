/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CheckCircle2, Truck, Package, Search, Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ManageOrders() {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("luvia_orders")) || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteOrder = (orderNumber) => {
    if (window.confirm("Are you sure you want to remove this order from the system?")) {
      const updatedOrders = orders.filter(o => o.orderNumber !== orderNumber);
      setOrders(updatedOrders);
      localStorage.setItem("luvia_orders", JSON.stringify(updatedOrders));
      toast.success("Order deleted successfully", {
        style: { background: '#333', color: '#fff', fontSize: '12px' }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="text-brand-terracotta uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">Store Management</span>
          <h1 className="text-5xl font-serif text-brand-berry dark:text-brand-rose">Manage Rituals</h1>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-rose" size={18} />
          <input 
            type="text" 
            placeholder="Search Order ID or Name..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-rose/10 outline-none text-sm dark:text-white transition-all focus:ring-2 focus:ring-brand-rose/20"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredOrders.length > 0 ? filteredOrders.slice().reverse().map((order, i) => (
            <motion.div 
              key={order.orderNumber}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[40px] border border-brand-rose/10 shadow-lg shadow-brand-berry/5 flex flex-col md:flex-row justify-between items-center gap-8"
            >
              <div className="flex gap-6 items-center w-full md:w-auto">
                <div className="w-16 h-16 bg-brand-nude dark:bg-luxury-black rounded-[24px] flex items-center justify-center text-brand-rose">
                  <Package size={28} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-brand-terracotta uppercase">{order.orderNumber}</span>
                    <span className="text-[9px] px-3 py-1 rounded-full bg-brand-rose/10 text-brand-berry dark:text-brand-rose font-bold uppercase tracking-widest border border-brand-rose/20">
                      {order.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm">{order.address.firstName} {order.address.lastName}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{order.date} • {order.items.length} items</p>
                </div>
              </div>

              <div className="flex-1 hidden lg:block border-l border-brand-rose/10 pl-8">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">Ship To</p>
                <p className="text-xs font-medium leading-relaxed italic opacity-80">{order.address.address}, {order.address.city}</p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                <p className="text-2xl font-serif font-bold text-brand-berry dark:text-brand-rose">${order.total.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button title="Update to Shipped" className="p-3 rounded-2xl bg-brand-nude dark:bg-luxury-black text-brand-berry dark:text-brand-rose hover:bg-brand-rose hover:text-white transition-all shadow-sm active:scale-90">
                    <Truck size={18} />
                  </button>
                  <button title="Delete Record" 
                    onClick={() => deleteOrder(order.orderNumber)}
                    className="p-3 rounded-2xl bg-brand-nude dark:bg-luxury-black text-brand-berry dark:text-brand-rose hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-32 bg-white/50 dark:bg-zinc-900/50 rounded-[40px] border-2 border-dashed border-brand-rose/20">
              <AlertCircle size={48} className="mx-auto mb-4 text-brand-rose opacity-20" />
              <p className="font-serif text-xl opacity-50 italic">No orders found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}