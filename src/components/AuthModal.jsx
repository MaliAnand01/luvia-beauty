/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const { dispatch } = useApp();

  const onSubmit = (data) => {
    const savedUsers = JSON.parse(localStorage.getItem("luvia_users")) || [];

    if (isLogin) {
      // Login Logic
      const userMatch = savedUsers.find(u => u.email === data.email && u.password === data.password);
      if (userMatch) {
        dispatch({ type: "LOGIN", payload: userMatch });
        toast.success(`Welcome back, ${userMatch.name}`);
        onClose();
      } else {
        toast.error("Invalid credentials or user not found.");
      }
    } else {
      // Signup Logic
      const userExists = savedUsers.some(u => u.email === data.email);
      if (userExists) {
        toast.error("User already exists with this email.");
      } else {
        const newUser = { ...data, id: Date.now() };
        savedUsers.push(newUser);
        localStorage.setItem("luvia_users", JSON.stringify(savedUsers));
        dispatch({ type: "LOGIN", payload: newUser });
        toast.success("Welcome to the LUVIA circle!");
        onClose();
      }
    }
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-berry/20 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 p-10 rounded-[40px] shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-brand-berry transition">
              <X size={20} />
            </button>

            <h2 className="text-4xl text-center mb-2 font-serif">
              {isLogin ? "Welcome Back" : "Join Luvia"}
            </h2>
            <p className="text-center text-gray-400 text-[10px] uppercase tracking-widest mb-10 italic">
              {isLogin ? "Continue your radiance journey" : "Unlock exclusive beauty rituals"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <input 
                  {...register("name", { required: true })} placeholder="Full Name"
                  className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none focus:ring-2 focus:ring-brand-rose/50 outline-none"
                />
              )}
              <input 
                {...register("email", { required: true })} type="email" placeholder="Email Address"
                className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none focus:ring-2 focus:ring-brand-rose/50 outline-none"
              />
              <input 
                {...register("password", { required: true })} type="password" placeholder="Password"
                className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none focus:ring-2 focus:ring-brand-rose/50 outline-none"
              />
              
              <button className="w-full bg-brand-berry text-white py-4 rounded-full uppercase tracking-widest text-[11px] font-bold hover:bg-brand-terracotta transition shadow-lg">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-6 text-xs text-gray-500">
              {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-brand-terracotta font-bold underline ml-1"
              >
                {isLogin ? "Join Now" : "Login"}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}