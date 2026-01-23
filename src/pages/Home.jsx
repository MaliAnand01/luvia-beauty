/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { Search, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, dispatch, loading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [localSearch, setLocalSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_QUERY", payload: localSearch });
      setSearchParams(localSearch ? { q: localSearch } : {});
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, dispatch, setSearchParams]);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-[85vh] flex items-center overflow-hidden px-6 md:px-12 bg-white dark:bg-luxury-black transition-colors duration-500 text-brand-berry dark:text-brand-rose">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <span className="text-brand-terracotta uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">
              Spring Collection 2026
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl leading-[1.1] mb-6 font-serif">
              Effortless <br className="hidden sm:block" />{" "}
              <span className="italic font-light">Radiance.</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto md:mx-0 mb-8 text-sm md:text-base leading-relaxed">
              High-performance skincare designed to simplify your morning ritual
              and amplify your natural glow.
            </p>
            <a
              href="#featured"
              className="bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry cursor-pointer px-10 py-4 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              Shop Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            duration={0.5}
            className="relative flex justify-center order-1 md:order-2"
          >
            <div className="w-full max-w-[320px] sm:max-w-100 md:max-w-none h-100 sm:h-125 md:h-137.5 lg:h-150 rounded-[100px] md:rounded-[150px] overflow-hidden border-10 md:border-15 border-brand-nude dark:border-zinc-800 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/13534819/pexels-photo-13534819.jpeg"
                className="w-full h-full object-cover"
                alt="Skincare"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Grid */}
      <section id="featured" className="max-w-7xl mx-auto px-6 mt-12 md:mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl text-brand-berry dark:text-brand-rose font-serif">
              Our Essentials
            </h2>
            <p className="text-gray-400 text-sm italic">
              Clean ingredients, bold results.
            </p>
          </div>

          <div className="relative w-full max-w-md md:w-80">
            {loading ? (
              <Loader2
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-rose animate-spin"
                size={18}
              />
            ) : (
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-rose"
                size={18}
              />
            )}
            <input
              type="text"
              value={localSearch}
              placeholder="Find your ritual..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-rose/10 focus:ring-4 focus:ring-brand-rose/20 outline-none text-sm dark:text-white transition-all"
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-rose" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="col-span-full py-20 text-center opacity-50 italic">
                No rituals found matching your search.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
