/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Sun, Moon, Sparkles, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { cart, user, theme, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-nude/80 dark:bg-luxury-black/80 backdrop-blur-xl border-b border-brand-rose/10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-brand-berry dark:text-brand-rose">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="text-brand-rose group-hover:rotate-12 transition-transform hidden sm:block" />
            <span className="text-2xl md:text-3xl font-serif tracking-tighter text-brand-berry dark:text-brand-rose">LUVIA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold">
            <Link to="/" className="hover:text-brand-terracotta transition">Collection</Link>
            <Link to="/about" className="hover:text-brand-terracotta transition">Philosophy</Link>
            <Link to="/contact" className="hover:text-brand-terracotta transition">Contact</Link>
          </div>

          {/* Icons & Dropdowns */}
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => dispatch({ type: "TOGGLE_THEME" })} className="p-2 rounded-full bg-white dark:bg-zinc-800 text-brand-berry dark:text-brand-rose">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link to="/cart" className="relative p-2 text-brand-berry dark:text-brand-nude">
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-berry text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-nude dark:border-luxury-black">{cart.length}</span>
              )}
            </Link>

            {/* Auth/User Dropdown Container */}
            <div className="relative group">
              <button 
                onClick={() => !user && setIsAuthOpen(true)}
                className="flex items-center gap-2 bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest"
              >
                {user ? <><User size={16} /> Me <ChevronDown size={12}/></> : "Join"}
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-brand-rose/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                {user ? (
                  <div className="flex flex-col py-2">
                    <Link to="/account" className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest transition">My Dashboard</Link>
                    <button onClick={handleLogout} className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-[11px] uppercase tracking-widest text-left flex items-center gap-2">
                      <LogOut size={14}/> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col py-2">
                    <button onClick={() => setIsAuthOpen(true)} className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest text-left">Sign In</button>
                    <button onClick={() => setIsAuthOpen(true)} className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest text-left font-bold text-brand-terracotta">Create Account</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal Component */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}