/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Truck,
  Package,
  ArrowRight,
  Download,
} from "lucide-react";

export default function OrderSuccess() {
  const [latestOrder, setLatestOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("luvia_orders")) || [];
    if (orders.length === 0) {
      navigate("/");
    } else {
      setLatestOrder(orders[orders.length - 1]);
    }
  }, [navigate]);

  if (!latestOrder) return null;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif text-brand-berry dark:text-brand-rose mb-4"
        >
          Your ritual is <span className="italic">on its way.</span>
        </motion.h1>
        <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
          Order Number: {latestOrder.orderNumber}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Delivery Timeline Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 shadow-xl shadow-brand-berry/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brand-rose/10 rounded-2xl flex items-center justify-center text-brand-rose">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Estimated Arrival
              </p>
              <p className="text-sm font-bold">{formattedDelivery}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-brand-rose"></div>
                <div className="w-px h-10 bg-brand-rose/20"></div>
              </div>
              <p className="text-xs font-medium">Order Confirmed</p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              </div>
              <p className="text-xs text-gray-400">Shipped from Warehouse</p>
            </div>
          </div>
        </motion.div>

        {/* Shipping Address Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-brand-rose/10 shadow-xl shadow-brand-berry/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-brand-rose/10 rounded-2xl flex items-center justify-center text-brand-rose">
              <Package size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                Shipping To
              </p>
              <p className="text-sm font-bold">
                {latestOrder.address.firstName} {latestOrder.address.lastName}
              </p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 italic">
            {latestOrder.address.address},<br />
            {latestOrder.address.city}, {latestOrder.address.state} —{" "}
            {latestOrder.address.postal}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/account"
          className="w-full sm:w-auto bg-brand-berry text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          Track My Order <ArrowRight size={14} />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto border border-brand-rose/20 px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-rose/5 transition"
        >
          Back to Collection
        </Link>
      </div>
    </div>
  );
}
