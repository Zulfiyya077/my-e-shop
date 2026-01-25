import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, Truck, ShoppingBag, ChevronLeft, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            const val = value.replace(/\D/g, "").slice(0, 16);
            setFormData(prev => ({ ...prev, [name]: val }));
            return;
        }

        if (name === "expiry") {
            let val = value.replace(/\D/g, "").slice(0, 4);
            if (val.length > 2) {
                val = val.slice(0, 2) + "/" + val.slice(2);
            }
            setFormData(prev => ({ ...prev, [name]: val }));
            return;
        }

        if (name === "cvv") {
            const val = value.replace(/\D/g, "").slice(0, 4);
            setFormData(prev => ({ ...prev, [name]: val }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validatePayment = () => {
        const { cardNumber, expiry, cvv, cardName } = formData;

        if (!/^\d{16}$/.test(cardNumber)) {
            toast.error("Please enter a valid 16-digit card number");
            return false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            toast.error("Please enter a valid expiry date (MM/YY)");
            return false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            toast.error("Please enter a valid CVV (3 or 4 digits)");
            return false;
        }

        if (cardName.length < 3) {
            toast.error("Please enter the full name on the card");
            return false;
        }

        return true;
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!validatePayment()) return;

        // Save order to localStorage
        const order = {
            id: Date.now(),
            items: [...cartItems],
            total: finalTotal,
            date: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

        toast.success("Order Placed Successfully! 🎉", {
            style: { background: "#FF6F20", color: "white" }
        });
        clearCart();
        setStep(3);
        window.scrollTo(0, 0);
    };

    const shipping = 15.00;
    const finalTotal = totalPrice + shipping;

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-[#FFF3E0] flex flex-col items-center justify-center p-6 text-center pt-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-[#FF6F20]/5 border-2 border-[#FF6F20]/5"
                >
                    <div className="w-20 h-20 bg-[#FFF3E0] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#FF6F20]/10">
                        <ShoppingBag size={36} className="text-[#FF6F20]" />
                    </div>
                    <h2 className="text-2xl font-black text-[#4A4A4A] mb-2">Your cart is empty</h2>
                    <p className="text-gray-400 mb-8 font-bold text-sm">Add some tech gear to proceed with the checkout.</p>
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white px-8 py-4 rounded-xl font-black shadow-lg shadow-[#FF6F20]/20 transition-all w-full"
                        >
                            Start Shopping
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF3E0] pt-24 pb-16 sm:pt-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {step < 3 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Main Content */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            <button
                                onClick={() => step === 2 ? setStep(1) : navigate(-1)}
                                className="flex items-center gap-2 text-[#4A4A4A]/60 hover:text-[#FF6F20] transition-colors mb-6 font-black text-[10px] uppercase tracking-widest group"
                            >
                                <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                                {step === 2 ? "Back to Shipping" : "Back to Store"}
                            </button>

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 15 }}
                                        className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-[#FF6F20]/5 border border-gray-100"
                                    >
                                        <header className="mb-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-0.5 bg-[#FF6F20] rounded-full" />
                                                <span className="text-[10px] font-black text-[#FF6F20] uppercase tracking-[0.2em]">Step 1</span>
                                            </div>
                                            <h1 className="text-3xl font-black text-[#4A4A4A] mb-1 tracking-tight">Shipping Info</h1>
                                            <p className="text-gray-400 font-bold text-xs">Enter your delivery details below.</p>
                                        </header>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInput} />
                                            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInput} />
                                            <div className="md:col-span-2">
                                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInput} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <InputField label="Address" name="address" value={formData.address} onChange={handleInput} />
                                            </div>
                                            <InputField label="City" name="city" value={formData.city} onChange={handleInput} />
                                            <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInput} />
                                        </div>

                                        <motion.button
                                            onClick={() => setStep(2)}
                                            className="w-full mt-10 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-4 rounded-xl font-black shadow-lg shadow-[#FF6F20]/20 hover:shadow-[#FF6F20]/40 transition-all flex items-center justify-center gap-2 group"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continue to Payment
                                            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 15 }}
                                        className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-[#FF6F20]/5 border border-gray-100"
                                    >
                                        <header className="mb-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-0.5 bg-[#FF6F20] rounded-full" />
                                                <span className="text-[10px] font-black text-[#FF6F20] uppercase tracking-[0.2em]">Step 2</span>
                                            </div>
                                            <h1 className="text-3xl font-black text-[#4A4A4A] mb-1 tracking-tight">Payment Detail</h1>
                                            <p className="text-gray-400 font-bold text-xs">Your payment is safe and encrypted.</p>
                                        </header>

                                        {/* Professional Minimal Card */}
                                        <div className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden max-w-[340px] mx-auto w-full aspect-[1.58/1] flex flex-col justify-between group mb-8 border border-white/5">
                                            <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Zap size={120} className="fill-white" />
                                            </div>

                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="w-12 h-10 bg-gradient-to-br from-[#FFB300] to-[#FF6F20] rounded-lg shadow-inner border border-white/10" />
                                                <CreditCard size={28} className="opacity-40" />
                                            </div>

                                            <div className="relative z-10">
                                                <p className="text-lg sm:text-xl font-mono tracking-widest mb-4">
                                                    {formData.cardNumber ? formData.cardNumber.replace(/(.{4})/g, '$1 ').trim() : "•••• •••• •••• ••••"}
                                                </p>
                                                <div className="flex justify-between items-end">
                                                    <div className="max-w-[150px]">
                                                        <p className="text-[8px] uppercase opacity-40 font-black mb-0.5 tracking-widest">Holder</p>
                                                        <p className="font-bold text-xs truncate uppercase tracking-widest">{formData.cardName || "Full Name"}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[8px] uppercase opacity-40 font-black mb-0.5 tracking-widest">Exp</p>
                                                        <p className="font-bold text-xs tracking-widest">{formData.expiry || "MM/YY"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <form onSubmit={handleCheckout} className="space-y-4">
                                            <InputField label="Name on Card" name="cardName" value={formData.cardName} onChange={handleInput} />
                                            <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInput} maxLength="16" inputMode="numeric" placeholder="1234123412341234" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField label="Expiry" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInput} maxLength="5" inputMode="numeric" />
                                                <InputField label="CVV" name="cvv" type="password" value={formData.cvv} onChange={handleInput} maxLength="4" inputMode="numeric" />
                                            </div>

                                            <div className="flex items-center gap-3 p-4 bg-[#FFF3E0]/30 rounded-xl border border-[#FF6F20]/5 mt-2">
                                                <ShieldCheck className="text-[#FF6F20]" size={18} />
                                                <p className="text-[10px] font-bold text-[#4A4A4A]/60">Secure 256-bit SSL Encrypted Payment</p>
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-4 rounded-xl font-black shadow-lg shadow-[#FF6F20]/20 hover:shadow-[#FF6F20]/40 transition-all"
                                                whileHover={{ y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Pay ${finalTotal.toFixed(2)}
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary - More Compact */}
                        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#FF6F20]/5 border border-gray-100">
                                <h3 className="text-lg font-black text-[#4A4A4A] mb-6 flex items-center gap-2">
                                    <ShoppingBag size={18} className="text-[#FF6F20]" />
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-8 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center group">
                                            <div className="w-14 h-14 bg-[#FFF3E0]/30 rounded-xl p-2 shrink-0 border border-[#FF6F20]/5">
                                                <img src={item.images?.[0]} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-[#4A4A4A] text-xs truncate group-hover:text-[#FF6F20] transition-colors">{item.title}</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-[9px] text-[#4A4A4A]/50 font-black uppercase tracking-widest">Qty: {item.quantity}</p>
                                                    <p className="text-xs font-black text-[#4A4A4A]">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-[#4A4A4A]">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-[#4A4A4A]">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                                        <span className="text-md font-black text-[#4A4A4A]">Total</span>
                                        <span className="text-xl font-black text-[#FF6F20]">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    /* Success Step */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto py-12 text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#FF6F20]/5 border border-gray-100"
                    >
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#4A4A4A] mb-3 tracking-tight">Order Confirmed!</h2>
                        <p className="text-gray-400 font-bold mb-8 max-w-xs mx-auto text-sm">
                            Thank you! Your order is being processed.
                        </p>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#4A4A4A] text-white px-10 py-4 rounded-xl font-black shadow-lg shadow-black/10 hover:bg-[#333] transition-all uppercase tracking-widest text-xs"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", value, onChange, placeholder, maxLength, inputMode }) => (
    <div className="space-y-1.5">
        <label className="text-[9px] font-black text-[#4A4A4A]/50 uppercase tracking-widest ml-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={inputMode}
            required
            className="w-full px-4 py-3 bg-[#FFF3E0]/15 border-2 border-transparent focus:border-[#FF6F20]/20 rounded-xl text-[#4A4A4A] font-bold text-xs sm:text-sm outline-none transition-all placeholder-[#494949]/20"
        />
    </div>
);

export default Checkout;
