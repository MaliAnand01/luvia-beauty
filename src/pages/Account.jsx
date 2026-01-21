/* eslint-disable no-unused-vars */
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Package, Heart, Settings, Star, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function Account() {
  const { user, cart, dispatch } = useApp();
  const navigate = useNavigate();

  const allOrders = JSON.parse(localStorage.getItem("luvia_orders")) || [];
  const userOrders = allOrders.filter(order => order.userEmail === user?.email);

  if (!user) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-serif mb-4 text-brand-berry dark:text-brand-rose">Membership required.</h2>
        <p className="text-gray-400 mb-8 max-w-sm">Please sign in to view your personalized radiance dashboard.</p>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out of LUVIA");
    navigate("/");
  };

  const downloadInvoice = (order) => {
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(`
      <html>
        <body style="font-family: sans-serif; padding: 40px; color: #4a1d1d;">
          <h1 style="letter-spacing: 4px;">LUVIA BEAUTY</h1>
          <hr style="border: 1px solid #e8b4b8; margin: 20px 0;" />
          <p><strong>Order ID:</strong> ${order.orderNumber}</p>
          <p><strong>Customer:</strong> ${order.address.firstName} ${order.address.lastName}</p>
          <p><strong>Address:</strong> ${order.address.address}, ${order.address.city}</p>
          <table style="width: 100%; margin: 30px 0; border-collapse: collapse;">
            ${order.items.map(i => `<tr><td style="padding: 10px; border-bottom: 1px solid #eee;">${i.title} (x${i.quantity})</td><td style="text-align: right; padding: 10px; border-bottom: 1px solid #eee;">$${(i.price * i.quantity).toFixed(2)}</td></tr>`).join('')}
          </table>
          <h2 style="text-align: right;">Total: $${order.total.toFixed(2)}</h2>
          <script>window.print();</script>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 shadow-xl shadow-brand-rose/5 border border-brand-rose/10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-brand-rose/20 rounded-full flex items-center justify-center text-3xl font-serif text-brand-berry dark:text-brand-rose mb-4 border-2 border-brand-rose/30">{user.name?.charAt(0)}</div>
            <h2 className="text-3xl font-serif mb-1">{user.name}</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">{user.email}</p>
            <div className="w-full space-y-2">
              <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-brand-nude dark:bg-luxury-black text-xs font-bold uppercase tracking-widest"><div className="flex items-center gap-3"><Settings size={16}/> Settings</div></button>
              <button onClick={handleLogout} className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest"><div className="flex items-center gap-3"><LogOut size={16}/> Logout</div></button>
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
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 space-y-12">
          
          {/* SECTION 1: Active Bag (RESTORED) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif flex items-center gap-3"><Heart size={24} className="text-brand-rose" /> My Saved Rituals</h3>
              <span className="text-[10px] font-bold bg-brand-rose/20 text-brand-berry px-4 py-1 rounded-full uppercase tracking-widest">{cart.length} Items</span>
            </div>
            {cart.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-brand-rose/5 shadow-sm">
                    <img src={item.thumbnail} className="w-16 h-20 object-contain bg-brand-nude dark:bg-luxury-black rounded-xl p-2" alt="" />
                    <div>
                      <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                      <p className="text-xs text-brand-terracotta font-serif">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-brand-rose/20 rounded-[40px] text-center italic text-gray-400 text-sm">Your bag is currently empty.</div>
            )}
          </section>

          {/* SECTION 2: Order History */}
          <section>
            <h3 className="text-2xl font-serif mb-6 flex items-center gap-3"><Package size={24} className="text-brand-rose" /> Order History</h3>
            <div className="overflow-hidden rounded-[30px] border border-brand-rose/10 bg-white dark:bg-zinc-900 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-rose/5 text-[10px] uppercase tracking-widest font-bold">
                  <tr><th className="px-6 py-5">Order ID</th><th className="px-6 py-5">Date</th><th className="px-6 py-5">Total</th><th className="px-6 py-5 text-right">Invoice</th></tr>
                </thead>
                <tbody className="divide-y divide-brand-rose/5">
                  {userOrders.length > 0 ? userOrders.reverse().map((order, i) => (
                    <tr key={i} className="hover:bg-brand-nude/20 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-brand-terracotta">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-xs opacity-60">{order.date}</td>
                      <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => downloadInvoice(order)} className="p-2 text-brand-berry dark:text-brand-rose hover:scale-110 transition-transform"><Download size={18} /></button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm italic">No history found.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}