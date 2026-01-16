import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Plus, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { dispatch } = useApp();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.title} added to bag`, {
      icon: '🛍️',
      style: { borderRadius: '20px' }
    });
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="group relative flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="flex-1">
        {/* Image Container */}
        <div className="aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden bg-white dark:bg-zinc-900 mb-4 relative shadow-sm transition-all group-hover:shadow-xl group-hover:shadow-brand-rose/20">
          <img 
            src={product.thumbnail} 
            className="w-full h-full object-contain p-6 scale-95 group-hover:scale-105 transition-transform duration-700" 
            alt={product.title} 
          />
          
          {/* DESKTOP ONLY: Plus icon on hover */}
          <button 
            onClick={handleQuickAdd}
            className="hidden md:flex absolute bottom-4 right-4 bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-10 hover:scale-110 active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Text Details */}
        <div className="px-2">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-sans text-[15px] md:text-base font-semibold text-brand-berry dark:text-brand-nude leading-tight tracking-tight">
              {product.title}
            </h3>
            <span className="font-sans font-extrabold text-sm md:text-base text-brand-terracotta">
              ${product.price}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.1em]">
            <div className="flex items-center gap-1">
              <Star size={12} fill="#e8b4b8" className="text-brand-rose" />
              <span>{product.rating}</span>
            </div>
            <span>•</span>
            <span className="truncate max-w-[80px] md:max-w-none">{product.brand}</span>
          </div>
        </div>
      </Link>

      {/* MOBILE ONLY: Visible "Add to Bag" button below text */}
      <div className="md:hidden mt-4 px-1">
        <button 
          onClick={handleQuickAdd}
          className="w-full bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <ShoppingBag size={14} /> Add to Bag
        </button>
      </div>
    </motion.div>
  );
}