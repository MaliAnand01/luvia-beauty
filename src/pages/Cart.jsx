/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useApp } from "../context/AppContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, user, dispatch } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed with your order", {
        icon: "🔒",
      });
      // You could also trigger the AuthModal here if you pass setIsAuthOpen down
    } else {
      navigate("/checkout");
    }
  };

  const isCartValid = Array.isArray(cart);
  const total = isCartValid
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  if (!isCartValid || cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-24 h-24 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
          <ShoppingBag size={40} />
        </div>
        <h2 className="font-serif text-3xl text-brand-berry dark:text-brand-rose">
          Your bag is empty
        </h2>
        <p className="text-gray-400 max-w-xs">
          It looks like you haven't started your radiance journey yet.
        </p>
        <Link
          to="/"
          className="bg-brand-berry text-white dark:bg-brand-rose dark:text-brand-berry px-10 py-4 rounded-full uppercase text-[10px] font-bold tracking-widest hover:scale-105 transition-transform shadow-lg"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-berry dark:text-brand-nude">
          Shopping Bag
        </h1>
        <Link
          to="/"
          className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-terracotta hover:underline"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          {cart.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 border-b border-brand-rose/10 pb-8 items-center"
            >
              <div className="w-32 h-40 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden p-4 shadow-sm">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <p className="text-brand-terracotta text-[10px] uppercase font-bold tracking-widest">
                  {item.brand}
                </p>
                <h3 className="font-sans text-xl font-semibold text-brand-berry dark:text-brand-nude">
                  {item.title}
                </h3>
                <p className="text-lg font-light">${item.price}</p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 pt-4">
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-white dark:bg-zinc-900 rounded-full px-2 py-1 border border-brand-rose/10 shadow-sm">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            id: item.id,
                            qty: Math.max(1, item.quantity - 1),
                          },
                        })
                      }
                      className="p-2 text-brand-rose hover:scale-120 transition-transform"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, qty: item.quantity + 1 },
                        })
                      }
                      className="p-2 text-brand-rose hover:scale-120 transition-transform"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                    className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-brand-berry dark:text-brand-nude">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <aside className="lg:col-span-4">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-2xl shadow-brand-rose/5 border border-brand-rose/10 sticky top-32">
            <h2 className="text-2xl font-serif mb-8 text-brand-berry dark:text-brand-rose">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                  Subtotal
                </span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                  Shipping
                </span>
                <span className="text-brand-terracotta text-[10px] font-bold uppercase tracking-widest italic">
                  Free of Charge
                </span>
              </div>
              <div className="h-px bg-brand-rose/10 w-full my-4"></div>
              <div className="flex justify-between text-lg font-serif">
                <span>Grand Total</span>
                <span className="text-brand-berry dark:text-brand-rose">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-brand-berry dark:bg-brand-rose text-white dark:text-brand-berry py-5 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              Proceed to Checkout
            </button>

            <p className="text-[9px] text-center mt-6 text-gray-400 uppercase tracking-widest leading-relaxed">
              Secure checkout guaranteed. <br /> All luxury rituals include free
              returns.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
