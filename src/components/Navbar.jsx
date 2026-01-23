/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Sun, Moon, Sparkles, Menu, X, ChevronDown, LogOut, ShieldCheck } from "lucide-react";
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
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-brand-berry dark:text-brand-rose z-50">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
            <Sparkles className="text-brand-rose group-hover:rotate-12 transition-transform hidden sm:block" />
            <span className="text-2xl md:text-3xl font-serif tracking-tighter text-brand-berry dark:text-brand-rose">LUVIA</span>
          </Link>

          {/* DESKTOP NAV: Standard Links + Conditional Admin Links */}
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold items-center">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="hover:text-brand-terracotta transition">
                {link.name}
              </Link>
            ))}

            {/* ADMIN ONLY SECTION */}
            {user?.isAdmin && (
              <div className="flex gap-8 border-l border-brand-rose/20 pl-8 ml-2">
                <Link to="/admin" className="text-brand-terracotta flex items-center gap-2 hover:opacity-80 transition">
                  <ShieldCheck size={14} /> Dashboard
                </Link>
                <Link to="/admin/orders" className="hover:text-brand-terracotta transition">Manage Orders</Link>
              </div>
            )}
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

            <div className="relative group hidden md:block">
              <button 
                onClick={() => !user && setIsAuthOpen(true)}
                className="flex items-center gap-2 bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-md"
              >
                {user ? <><User size={14} /> {user.isAdmin ? "Admin" : "Me"} <ChevronDown size={10}/></> : "Join"}
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-brand-rose/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="flex flex-col py-2 text-brand-berry dark:text-brand-nude">
                  {user ? (
                    <>
                      <Link to="/account" className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest transition">My Profile</Link>
                      {user.isAdmin && <Link to="/admin" className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest transition text-brand-terracotta">Admin Panel</Link>}
                      <button onClick={handleLogout} className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-[11px] uppercase tracking-widest text-left flex items-center gap-2">
                        <LogOut size={14}/> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsAuthOpen(true)} className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest text-left font-bold">Sign In</button>
                      <button onClick={() => setIsAuthOpen(true)} className="px-6 py-3 hover:bg-brand-nude dark:hover:bg-luxury-black text-[11px] uppercase tracking-widest text-left font-bold text-brand-terracotta">Register</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "100vh" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden fixed inset-0 top-20 bg-white dark:bg-zinc-950 z-40 overflow-hidden flex flex-col"
            >
              <div className="flex flex-col p-8 space-y-6">
                {navLinks.map((link, i) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-3xl font-serif text-brand-berry dark:text-brand-rose">
                    {link.name}
                  </Link>
                ))}

                {user?.isAdmin && (
                  <div className="pt-6 mt-6 border-t border-brand-rose/20 space-y-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Administrator</p>
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-brand-terracotta block">Dashboard</Link>
                    <Link to="/admin/orders" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-brand-berry dark:text-brand-rose block">Manage Orders</Link>
                  </div>
                )}

                <div className="pt-8 border-t border-brand-rose/20 flex flex-col gap-6">
                  {user ? (
                    <>
                      <Link to="/account" onClick={() => setIsOpen(false)} className="text-lg font-sans font-bold uppercase tracking-widest flex items-center gap-3"><User className="text-brand-rose" /> Profile</Link>
                      <button onClick={handleLogout} className="text-lg font-sans font-bold uppercase tracking-widest text-red-500 flex items-center gap-3 text-left"><LogOut /> Logout</button>
                    </>
                  ) : (
                    <button onClick={() => { setIsAuthOpen(true); setIsOpen(false); }} className="w-full bg-brand-berry text-white py-5 rounded-full uppercase tracking-widest font-bold text-sm shadow-xl">Join Luvia</button>
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