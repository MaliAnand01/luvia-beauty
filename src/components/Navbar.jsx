/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User, Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cart, user, theme, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Collection", path: "/" },
    { name: "Our Philosophy", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-nude/80 dark:bg-luxury-black/80 backdrop-blur-xl border-b border-brand-rose/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Side: Hamburger (Mobile Only) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-berry dark:text-brand-rose"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center/Left: Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
          <Sparkles className="text-brand-rose group-hover:rotate-12 transition-transform hidden sm:block" />
          <span className="text-2xl md:text-3xl font-serif tracking-tighter text-brand-berry dark:text-brand-rose">
            LUVIA
          </span>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-brand-terracotta transition">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-brand-berry dark:text-brand-rose transition-transform active:scale-90"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/cart" onClick={closeMenu} className="relative p-2 text-brand-berry dark:text-brand-nude">
            <ShoppingBag size={22} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-nude dark:border-luxury-black">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/account"
              onClick={closeMenu}
              className="flex items-center gap-2 bg-brand-rose/20 dark:bg-brand-rose/10 px-3 md:px-4 py-2 rounded-full text-brand-berry dark:text-brand-rose"
            >
              <User size={18} />
              <span className="text-[10px] uppercase font-bold hidden lg:block">Account</span>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry px-5 md:px-6 py-2 rounded-full text-[10px] uppercase tracking-widest hover:bg-brand-terracotta transition active:scale-95"
            >
              Join
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-brand-rose/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className="text-2xl font-serif text-brand-berry dark:text-brand-nude block active:text-brand-rose"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 border-t border-brand-rose/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">Social</p>
                <div className="flex gap-6 text-xs font-bold text-brand-berry dark:text-brand-rose">
                  <span>Instagram</span>
                  <span>Pinterest</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}