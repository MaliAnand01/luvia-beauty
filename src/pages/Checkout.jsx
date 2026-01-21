/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronLeft, CreditCard, Truck } from "lucide-react";
import confetti from "canvas-confetti";

export default function Checkout() {
  const { cart, dispatch, user } = useApp();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("luvia_addresses")) || {};
    const userAddress = savedAddresses[user?.email];
    if (userAddress) {
      Object.keys(userAddress).forEach(key => setValue(key, userAddress[key]));
      toast.success("Saved address applied", { icon: '🏠' });
    }
  }, [user, setValue]);

  const onPlaceOrder = (data) => {
    const orderNumber = `LUV-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newOrder = {
      orderNumber,
      date: orderDate,
      items: [...cart],
      total: total,
      address: data,
      userEmail: user.email,
      status: "Processing"
    };

    const loadingToast = toast.loading("Finalizing your ritual...");
    
    setTimeout(() => {
      const allOrders = JSON.parse(localStorage.getItem("luvia_orders")) || [];
      allOrders.push(newOrder);
      localStorage.setItem("luvia_orders", JSON.stringify(allOrders));

      const savedAddresses = JSON.parse(localStorage.getItem("luvia_addresses")) || {};
      savedAddresses[user.email] = data;
      localStorage.setItem("luvia_addresses", JSON.stringify(savedAddresses));

      toast.dismiss(loadingToast);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#e8b4b8', '#4a1d1d', '#c97c5d'] });
      
      toast.success("Order Confirmed!");
      
      // Clear cart items from state and localStorage
      cart.forEach(item => dispatch({ type: "REMOVE_ITEM", payload: item.id }));
      navigate("/account");
    }, 2000);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-10 opacity-50 hover:opacity-100 transition">
            <ChevronLeft size={14}/> Back to Bag
          </button>
          
          <h2 className="text-4xl font-serif mb-10 text-brand-berry dark:text-brand-rose">Shipping Details</h2>
          
          <form onSubmit={handleSubmit(onPlaceOrder)} className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input {...register("firstName", { required: true })} placeholder="First Name" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
                <input {...register("lastName", { required: true })} placeholder="Last Name" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
              </div>
              <input {...register("address", { required: true })} placeholder="Delivery Address" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
              <div className="grid md:grid-cols-3 gap-6">
                <input {...register("city", { required: true })} placeholder="City" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
                <input {...register("postal", { required: true })} placeholder="Zip Code" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
                <input {...register("country", { required: true })} placeholder="Country" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-serif mb-6 flex items-center gap-3"><CreditCard size={20} className="text-brand-rose" /> Payment Method</h3>
              <div className="p-6 rounded-3xl border-2 border-brand-berry dark:border-brand-rose bg-white dark:bg-zinc-900 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-berry font-bold text-[10px]">COD</div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest block">Cash on Delivery</span>
                    <span className="text-[10px] text-gray-400">Pay when your beauty ritual arrives</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-4 border-brand-berry dark:border-brand-rose"></div>
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry py-6 rounded-full uppercase tracking-[0.2em] text-xs font-bold mt-10 shadow-2xl hover:scale-[1.02] transition-transform">
              Complete Order — ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 sticky top-32 shadow-xl shadow-brand-berry/5">
            <h3 className="text-xl font-serif mb-8 text-brand-berry dark:text-brand-rose">Order Summary</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.thumbnail} className="w-16 h-20 object-contain bg-brand-nude rounded-2xl p-2" alt="" />
                  <div className="flex-1">
                    <p className="text-xs font-bold leading-tight">{item.title}</p>
                    <p className="text-[9px] text-brand-terracotta uppercase font-bold mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-serif font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-brand-rose/10 space-y-4 font-serif text-xl flex justify-between">
              <span>Total Amount</span>
              <span className="text-brand-berry dark:text-brand-rose">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}