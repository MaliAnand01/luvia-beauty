/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pb-20">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] md:h-[85vh] flex items-center overflow-hidden px-6 md:px-12 bg-white dark:bg-luxury-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-12 md:py-0">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <span className="text-brand-terracotta uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">
              Spring Collection 2026
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl leading-[1.1] text-brand-berry dark:text-brand-rose mb-6">
              Effortless <br className="hidden sm:block" />{" "}
              <span className="italic font-light">Radiance.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto md:mx-0 mb-8 text-sm md:text-base leading-relaxed">
              High-performance skincare designed to simplify your morning ritual
              and amplify your natural glow.
            </p>
            <button className="bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry px-10 py-4 rounded-full text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-berry/10 active:scale-95">
              Shop Now
            </button>
          </motion.div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center order-1 md:order-2"
          >
            {/* On mobile: Slightly smaller height and smaller border 
               On desktop: Larger height and thick border 
            */}
            <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-none h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-[100px] md:rounded-[150px] overflow-hidden border-[10px] md:border-[15px] border-brand-nude dark:border-zinc-800 shadow-2xl transition-all">
              <img
                src="https://images.pexels.com/photos/13534819/pexels-photo-13534819.jpeg"
                className="w-full h-full object-cover"
                alt="Skincare Model"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl text-brand-berry dark:text-brand-rose">Our Essentials</h2>
            <p className="text-gray-400 text-sm italic">
              Clean ingredients, bold results.
            </p>
          </div>
          
          <div className="relative w-full max-w-md md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-rose"
              size={18}
            />
            <input
              type="text"
              placeholder="Find your ritual..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-rose/10 focus:ring-4 focus:ring-brand-rose/20 outline-none shadow-sm text-sm dark:text-white transition-all"
              onChange={(e) => setSearchParams({ q: e.target.value })}
            />
          </div>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-8">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-50 italic">
              No rituals found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}