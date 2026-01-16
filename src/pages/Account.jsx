import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Package, Heart, Settings, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function Account() {
  const { user, cart, dispatch } = useApp();
  const navigate = useNavigate();

  if (!user) {
    // Redirect if not logged in
    setTimeout(() => navigate("/login"), 0);
    return null;
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out of LUVIA");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar / Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 shadow-xl shadow-brand-rose/5 border border-brand-rose/10">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-rose/20 rounded-full flex items-center justify-center text-3xl font-serif text-brand-berry dark:text-brand-rose mb-4 border-2 border-brand-rose/30">
                {user.name?.charAt(0)}
              </div>
              <h2 className="text-3xl font-serif mb-1">{user.name}</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{user.email}</p>
              
              <div className="w-full space-y-2">
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-brand-nude dark:bg-luxury-black text-xs font-bold uppercase tracking-widest hover:bg-brand-rose/10 transition">
                  <div className="flex items-center gap-3"><Settings size={16}/> Settings</div>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                >
                  <div className="flex items-center gap-3"><LogOut size={16}/> Logout</div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-brand-berry text-white rounded-[40px] p-8">
            <div className="flex items-center gap-2 mb-2 text-brand-rose">
              <Star size={16} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Luvia Circle</span>
            </div>
            <p className="text-xl font-serif">Gold Member</p>
            <p className="text-xs opacity-60 mt-2">You have 450 Glow Points to spend.</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 space-y-10"
        >
          {/* Active Bag Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif flex items-center gap-3">
                <Heart size={24} className="text-brand-rose" /> My Current Rituals
              </h3>
              <span className="text-xs font-bold bg-brand-rose/20 text-brand-berry px-3 py-1 rounded-full">
                {cart.length} Items
              </span>
            </div>
            
            {cart.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-[24px] border border-brand-rose/5">
                    <img src={item.thumbnail} className="w-16 h-16 object-cover bg-brand-nude rounded-xl" alt={item.title} />
                    <div>
                      <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                      <p className="text-xs text-brand-terracotta">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-brand-rose/20 rounded-[40px] text-center">
                <p className="text-sm text-gray-400 italic">No items in your bag yet. Explore the collection to start your journey.</p>
              </div>
            )}
          </section>

          {/* Recent Orders */}
          <section>
            <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
              <Package size={24} className="text-brand-rose" /> Recent Orders
            </h3>
            <div className="overflow-hidden rounded-[30px] border border-brand-rose/10 bg-white dark:bg-zinc-900">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-rose/5 text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-rose/5">
                  <tr>
                    <td className="px-6 py-4 font-mono text-[11px]">#LV-88291</td>
                    <td className="px-6 py-4">Jan 12, 2026</td>
                    <td className="px-6 py-4 text-green-500 font-bold uppercase text-[10px]">Delivered</td>
                    <td className="px-6 py-4 font-bold">$124.00</td>
                  </tr>
                  <tr className="opacity-50">
                    <td className="px-6 py-4 font-mono text-[11px]">#LV-88102</td>
                    <td className="px-6 py-4">Dec 28, 2025</td>
                    <td className="px-6 py-4 uppercase text-[10px]">Returned</td>
                    <td className="px-6 py-4 font-bold">$45.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </motion.div>

      </div>
    </div>
  );
}