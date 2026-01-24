import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, MinusCircle } from "lucide-react";

/**
 * AI Support Component
 * Provides a floating chat widget with simulated AI responses in English.
 */
const AISupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: "bot", text: "Hello! I'm your ZIpTech AI Assistant. How can I help you today?", time: new Date() }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: "user",
            text: inputValue,
            time: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulated AI Logic
        setTimeout(() => {
            const botResponse = getAIResponse(inputValue.toLowerCase());
            const botMessage = {
                id: Date.now() + 1,
                type: "bot",
                text: botResponse,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getAIResponse = (query) => {
        // Greetings
        if (/hi|hello|hey|greetings/i.test(query)) {
            return "Greetings! I'm here to assist you with any questions about ZIpTech products, orders, or services. What's on your mind?";
        }

        // Products
        if (/product|stock|inventory|buy|item/i.test(query)) {
            return "We offer a premium selection of high-performance tech including laptops, smartphones, and professional accessories. You can explore our full catalog on the 'Products' page. Are you looking for something specific?";
        }

        // Shipping
        if (/ship|delivery|track|order status|arrival/i.test(query)) {
            return "Local deliveries are typically processed within 24 hours. International shipping can take 5-7 business days. Standard shipping fee is $15.00 for express delivery.";
        }

        // Warranty & Quality
        if (/warranty|guarantee|quality|repair/i.test(query)) {
            return "Quality is our priority. Every ZIpTech product comes with a 1-year comprehensive manufacturer's warranty. We also offer a 30-day money-back guarantee if you're not satisfied.";
        }

        // Payment
        if (/pay|card|checkout|credit|cash/i.test(query)) {
            return "We accept all major credit cards through our secure, encrypted checkout process. We also support Apple Pay and Google Pay for your convenience.";
        }

        // Specific Brand/Models (Simulated knowledge)
        if (/apple|iphone|macbook|laptop/i.test(query)) {
            return "Great choice! Our Apple inventory and high-end laptops are among our top-rated products. Check the 'Products' page and use the 'Category' filter to see the latest models.";
        }

        // Discounts
        if (/sale|discount|promo|deal/i.test(query)) {
            return "You're in luck! We're currently having a seasonal tech sale with up to 20% off on selected high-performance laptops. Check the products with the orange sale badges!";
        }

        // Help/Contact
        if (/contact|support|help|human|person/i.test(query)) {
            return "While I'm an AI, I can certainly help with most inquiries. If you need even more assistance, you can visit our 'Contact' page to reach our support team via email or phone.";
        }

        // Default
        return "That's an interesting question! While I'm still learning, I'd suggest checking our Products or FAQ sections. Is there anything specific about our gadgets I can help you find?";
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border-2 border-[#FF6F20]/10 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="p-5 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                                        <Bot size={22} />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm">ZIpTech Support</h3>
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">AI Concierge Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-black/10 rounded-xl transition-all"
                            >
                                <MinusCircle size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFDFD]"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-2 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${msg.type === "user" ? "bg-[#FF6F20] text-white" : "bg-gray-100 text-[#FF6F20]"}`}>
                                            {msg.type === "user" ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm font-bold shadow-sm ${msg.type === "user"
                                            ? "bg-[#4A4A4A] text-white rounded-tr-none"
                                            : "bg-white border border-gray-100 text-[#4A4A4A] rounded-tl-none"
                                            }`}>
                                            {msg.text}
                                            <p className={`text-[9px] mt-1 opacity-50 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                                                {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-[#FF6F20] rounded-full" />
                                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#FF6F20] rounded-full" />
                                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#FF6F20] rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-50 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#FF6F20]/20 focus:bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none transition-all placeholder-gray-300"
                            />
                            <button
                                type="submit"
                                className="bg-[#FF6F20] text-white p-3 rounded-2xl shadow-lg shadow-[#FF6F20]/20 hover:bg-[#FFB300] transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-full flex items-center justify-center text-white shadow-2xl relative group overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div key="msg" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <MessageCircle size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1"
                    >
                        <Sparkles size={20} className="text-white fill-[#FFB300]" />
                    </motion.div>
                )}
            </motion.button>
        </div>
    );
};

export default AISupport;
