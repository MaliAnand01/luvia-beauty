/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronLeft, CreditCard, MapPin, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Checkout() {
  const { cart, dispatch, user } = useApp();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm();

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const pincode = watch("postal");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      setIsFetchingLocation(true);
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            setValue("city", postOffice.District);
            setValue("state", postOffice.State);
            toast.success(`Location identified: ${postOffice.District}`);
          }
        })
        .catch(() => {
          toast.error("Pincode not found");
        })
        .finally(() => setIsFetchingLocation(false));
    }
  }, [pincode, setValue]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("luvia_addresses")) || {};
    const userAddress = saved[user?.email];
    if (userAddress) {
      Object.keys(userAddress).forEach((key) =>
        setValue(key, userAddress[key]),
      );
    }
  }, [user, setValue]);

  const onPlaceOrder = (data) => {
    const orderNumber = `LUV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: [...cart],
      total,
      address: { ...data, country: "India" },
      userEmail: user.email,
      status: "Processing",
    };

    const loadingToast = toast.loading("Confirming your ritual...");
    setTimeout(() => {
      const allOrders = JSON.parse(localStorage.getItem("luvia_orders")) || [];
      allOrders.push(newOrder);
      localStorage.setItem("luvia_orders", JSON.stringify(allOrders));

      const saved = JSON.parse(localStorage.getItem("luvia_addresses")) || {};
      saved[user.email] = data;
      localStorage.setItem("luvia_addresses", JSON.stringify(saved));

      toast.dismiss(loadingToast);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e8b4b8", "#4a1d1d", "#c97c5d"],
      });
      toast.success("Order Confirmed!");
      cart.forEach((item) =>
        dispatch({ type: "REMOVE_ITEM", payload: item.id }),
      );
      navigate("/order-success");
    }, 2000);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-10 opacity-50 hover:opacity-100 transition"
          >
            <ChevronLeft size={14} /> Back to Bag
          </button>

          <h2 className="text-4xl font-serif mb-10 text-brand-berry dark:text-brand-rose">
            Shipping Details
          </h2>

          <form onSubmit={handleSubmit(onPlaceOrder)} className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 space-y-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                  className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
                />
                <input
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                  className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
                />
              </div>

              <input
                {...register("address", { required: true })}
                placeholder="House No., Building, Street Area"
                className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
              />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative">
                  <input
                    {...register("postal", { required: true, maxLength: 6 })}
                    placeholder="Pincode"
                    className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
                  />
                  {isFetchingLocation && (
                    <Loader2
                      className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-brand-rose"
                      size={16}
                    />
                  )}
                </div>

                <input
                  {...register("city", { required: true })}
                  placeholder="City"
                  className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
                />

                <input
                  {...register("state", { required: true })}
                  placeholder="State"
                  className="w-full p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none outline-none focus:ring-2 focus:ring-brand-rose/20 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 p-4 rounded-2xl bg-brand-nude dark:bg-luxury-black border-none text-xs font-bold uppercase tracking-widest opacity-60">
                <MapPin size={14} className="text-brand-rose" /> India
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
                <CreditCard size={20} className="text-brand-rose" /> Payment
                Method
              </h3>
              <div className="p-6 rounded-3xl border-2 border-brand-berry dark:border-brand-rose bg-white dark:bg-zinc-900 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-berry font-bold text-[10px]">
                    COD
                  </div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest block">
                      Cash on Delivery
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Pay at your doorstep
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-4 border-brand-berry dark:border-brand-rose"></div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry py-6 rounded-full uppercase tracking-[0.2em] text-xs font-bold mt-10 shadow-2xl hover:scale-[1.02] transition-transform"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 sticky top-32 shadow-xl shadow-brand-rose/5">
            <h3 className="text-xl font-serif mb-8 text-brand-berry dark:text-brand-rose">
              Order Summary
            </h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.thumbnail}
                    className="w-16 h-20 object-contain bg-brand-nude dark:bg-zinc-800 rounded-2xl p-2"
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-bold leading-tight">{item.title}</p>
                    <p className="text-[10px] text-brand-terracotta uppercase font-bold mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-serif font-bold text-brand-berry dark:text-brand-nude">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-brand-rose/10 flex justify-between font-serif text-xl text-brand-berry dark:text-brand-rose">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
