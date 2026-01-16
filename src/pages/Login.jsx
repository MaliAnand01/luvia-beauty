import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch({ type: "LOGIN", payload: data });
    toast.success("Welcome to the LUVIA circle");
    navigate("/account");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-12 rounded-[50px] shadow-2xl shadow-brand-rose/10">
        <h2 className="text-4xl text-center mb-2">Join the Ritual</h2>
        <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-10 italic">Unlock exclusive beauty rewards</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input 
            {...register("name")} placeholder="Your Name"
            className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none focus:ring-2 focus:ring-brand-rose/50 outline-none"
          />
          <input 
            {...register("email")} type="email" placeholder="Email Address"
            className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none focus:ring-2 focus:ring-brand-rose/50 outline-none"
          />
          <button className="w-full bg-brand-berry text-white py-4 rounded-full uppercase tracking-widest text-[11px] font-bold hover:bg-brand-terracotta transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}