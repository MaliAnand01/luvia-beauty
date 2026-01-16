/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <span className="text-brand-terracotta uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl mb-8 text-brand-berry dark:text-brand-rose">We'd love to hear from <span className="italic">you.</span></h1>
          
          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-brand-rose shadow-sm">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</p>
                <p className="text-sm font-semibold">care@luvia.com</p>
              </div>
            </div>
            {/* Add Phone and Location similarly */}
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] shadow-2xl shadow-brand-rose/5 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
            <input type="text" placeholder="Last Name" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20" />
          <textarea rows="4" placeholder="How can we help?" className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20"></textarea>
          <button className="w-full bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition">Send Message</button>
        </motion.form>
      </div>
    </div>
  );
}