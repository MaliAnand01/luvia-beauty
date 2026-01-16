import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import { Plus, Minus, Star, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, dispatch } = useApp();
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="h-screen flex items-center justify-center font-serif">Finding your glow...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-10 opacity-50 hover:opacity-100 transition">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white dark:bg-zinc-900 rounded-[60px] p-12 aspect-square flex items-center justify-center shadow-2xl shadow-brand-rose/5">
          <img src={product.thumbnail} className="w-full h-full object-contain hover:scale-110 transition-transform duration-700" alt={product.title} />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-[10px] mb-4">{product.brand}</span>
          <h1 className="text-5xl md:text-7xl mb-6 text-brand-berry dark:text-brand-nude">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-light">${product.price}</span>
            <div className="h-4 w-[1px] bg-brand-rose/30"></div>
            <div className="flex items-center gap-1 text-brand-rose">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold text-brand-berry dark:text-brand-nude">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md">{product.description}</p>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center bg-white dark:bg-zinc-900 rounded-full px-4 py-2 border border-brand-rose/10">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2"><Minus size={16}/></button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2"><Plus size={16}/></button>
            </div>

            <button 
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: qty } });
                toast.success("Ritual Added to Bag");
              }}
              className="flex-1 bg-brand-berry text-white py-5 rounded-full uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-brand-terracotta transition-all"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}