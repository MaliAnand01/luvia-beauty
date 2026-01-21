/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Sun, Moon, Sparkles, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { cart, user, theme, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false); // Controls Mobile Hamburger
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Controls Auth Modal
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Collection", path: "/" },
    { name: "Philosophy", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-nude/80 dark:bg-luxury-black/80 backdrop-blur-xl border-b border-brand-rose/10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* MOBILE: Hamburger Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-brand-berry dark:text-brand-rose z-50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* LOGO */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
            <Sparkles className="text-brand-rose group-hover:rotate-12 transition-transform hidden sm:block" />
            <span className="text-2xl md:text-3xl font-serif tracking-tighter text-brand-berry dark:text-brand-rose">LUVIA</span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="hover:text-brand-terracotta transition">
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => dispatch({ type: "TOGGLE_THEME" })} className="p-2 rounded-full bg-white dark:bg-zinc-800 text-brand-berry dark:text-brand-rose shadow-sm">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link to="/cart" onClick={() => setIsOpen(false)} className="relative p-2 text-brand-berry dark:text-brand-nude">
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-berry text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-nude dark:border-luxury-black">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* DESKTOP AUTH: Dropdown on Hover */}
            <div className="relative group hidden md:block">
              <button 
                onClick={() => !user && setIsAuthOpen(true)}
                className="flex items-center gap-2 bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-md"
              >
                {user ? <><User size={14} /> Me <ChevronDown size={10}/></> : "Join"}
              </button>

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

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed inset-0 top-20 bg-white dark:bg-zinc-950 z-40 overflow-hidden flex flex-col"
            >
              <div className="flex flex-col p-8 space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <Link to={link.path} onClick={() => setIsOpen(false)} className="text-4xl font-serif text-brand-berry dark:text-brand-rose">
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* MOBILE AUTH SECTION */}
                <div className="pt-8 border-t border-brand-rose/20 flex flex-col gap-6">
                  {user ? (
                    <>
                      <Link to="/account" onClick={() => setIsOpen(false)} className="text-xl font-sans font-bold uppercase tracking-widest flex items-center gap-3">
                        <User className="text-brand-rose" /> My Account
                      </Link>
                      <button onClick={handleLogout} className="text-xl font-sans font-bold uppercase tracking-widest text-red-500 flex items-center gap-3 text-left">
                        <LogOut /> Logout
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => { setIsAuthOpen(true); setIsOpen(false); }}
                      className="w-full bg-brand-berry text-white py-5 rounded-full uppercase tracking-[0.2em] font-bold text-sm shadow-xl"
                    >
                      Join Luvia
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}