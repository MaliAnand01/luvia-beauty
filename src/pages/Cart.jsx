import { useApp } from "../context/AppContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, dispatch } = useApp();

  // Safety check: ensure cart is an array before calling .reduce
  const isCartValid = Array.isArray(cart);
  const total = isCartValid ? cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;

  if (!isCartValid || cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <ShoppingBag size={48} className="text-gray-300" />
        <p className="font-serif text-2xl">Your bag is empty.</p>
        <Link to="/" className="bg-luxury-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gold transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <motion.div layout key={item.id} className="flex gap-6 border-b border-gray-100 dark:border-zinc-800 pb-8 items-center">
              <img src={item.thumbnail} alt={item.title} className="w-24 h-32 object-cover bg-cream" />
              <div className="flex-1 space-y-1">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="text-gold font-medium">${item.price}</p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center border border-gray-200 dark:border-zinc-700">
                    <button 
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, qty: Math.max(1, item.quantity - 1) } })} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                    >
                      <Minus size={14}/>
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, qty: item.quantity + 1 } })} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                    >
                      <Plus size={14}/>
                    </button>
                  </div>
                  <button 
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })} 
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="bg-cream dark:bg-zinc-900 p-8 h-fit sticky top-32">
          <h2 className="text-xl font-serif mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm border-b border-gray-200 dark:border-zinc-700 pb-6">
            <div className="flex justify-between">
              <span className="opacity-60">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">Shipping</span>
              <span className="text-gold uppercase text-[10px] font-bold">Complimentary</span>
            </div>
          </div>
          <div className="flex justify-between py-6 font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-luxury-black dark:bg-gold text-white py-4 uppercase tracking-widest text-[10px] font-bold hover:opacity-90 transition">
            Proceed to Checkout
          </button>
          <Link to="/" className="block text-center mt-4 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}