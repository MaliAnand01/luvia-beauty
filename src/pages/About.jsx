/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Sparkles, Leaf, Heart, Globe } from "lucide-react";

export default function About() {
  const values = [
    { icon: <Leaf size={24} />, title: "Pure Ingredients", desc: "We source only the finest organic botanicals, ensuring your skin receives the nutrients it deserves." },
    { icon: <Sparkles size={24} />, title: "Modern Science", desc: "High-performance formulas backed by dermatological research for visible, lasting results." },
    { icon: <Heart size={24} />, title: "Cruelty Free", desc: "Beauty should never come at a cost. We are 100% vegan and never test on animals." },
    { icon: <Globe size={24} />, title: "Sustainable", desc: "Our glass packaging is designed to be recycled or repurposed, minimizing our footprint." }
  ];

  return (
    <div className="overflow-hidden">
      {/* Editorial Header */}
      <section className="relative h-[90vh] py-24 px-6 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-terracotta uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl text-brand-berry dark:text-brand-rose mb-10 leading-tight"
          >
            Founded on the <br /> <span className="italic font-light">Art of the Glow.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-500 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            LUVIA was born in 2026 out of a simple necessity: skincare that works as hard as you do. 
            We believe that beauty is a ritual, not a chore. Our mission is to provide 
            minimalist luxury that empowers the modern woman.
          </motion.p>
        </div>
      </section>

      {/* Split Vision Section */}
      <section className="grid md:grid-cols-2 items-center bg-brand-nude dark:bg-luxury-black">
        <div className="h-150">
          <img 
            src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Skincare application"
          />
        </div>
        <div className="p-12 md:p-24 space-y-8">
          <h2 className="text-4xl md:text-5xl text-brand-berry dark:text-brand-rose">The Philosophy of Less.</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            In a world of 12-step routines, we advocate for the essential. We focus on 
            concentrated active ingredients that target multiple concerns at once. 
            It’s not about having more; it’s about having better.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-3xl font-serif text-brand-terracotta">98%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Natural Origin</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-brand-terracotta">24H</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Hydration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-white dark:bg-zinc-900 rounded-[40px] shadow-xl shadow-brand-rose/5 border border-brand-rose/10"
            >
              <div className="inline-flex p-4 bg-brand-nude dark:bg-luxury-black rounded-full text-brand-rose mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl mb-4 text-brand-berry dark:text-brand-rose">{v.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-brand-berry text-brand-nude text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-serif italic mb-8">
            "We don't create beauty; we simply provide the light to let yours shine through."
          </p>
          <div className="h-[1px] w-20 bg-brand-rose/50 mx-auto mb-6"></div>
          <p className="text-xs uppercase tracking-[0.3em] font-bold">LUVIA Founder</p>
        </div>
      </section>
    </div>
  );
}