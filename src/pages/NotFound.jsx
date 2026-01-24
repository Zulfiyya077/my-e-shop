import React from "react";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const suggestions = [
    { icon: Home, text: "Go to Homepage", link: "/", color: "from-[#FF6F20] to-[#FFB300]" },
    { icon: ShoppingBag, text: "Browse Products", link: "/products", color: "from-[#FFB300] to-[#FF7043]" },
    { icon: Search, text: "Search", link: "/products", color: "from-[#FF7043] to-[#FF6F20]" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF3E0] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#FF6F20]/20 to-[#FFB300]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#FFB300]/20 to-[#FF7043]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-[#FF6F20]/15 to-[#FFB300]/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <motion.div variants={floatingVariants} animate="animate" className="mb-8">
          <motion.h1
            variants={itemVariants}
            className="text-[200px] md:text-[280px] font-black leading-none bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent drop-shadow-2xl"
            style={{ textShadow: "0 0 100px rgba(255, 111, 32, 0.3)" }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-full blur-xl opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-r from-[#FF6F20] to-[#FFB300] p-6 rounded-full">
              <AlertCircle size={64} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl font-black mb-6 text-[#FF6F20]"
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          The page you're looking for seems to have gone on a shopping spree and can't be found!
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <a key={index} href={suggestion.link}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-[#FF6F20] hover:border-[#FFB300] group"
                >
                  <div className={`inline-block p-4 bg-gradient-to-r ${suggestion.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <suggestion.icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#4A4A4A] group-hover:text-[#FF6F20] transition-all">
                    {suggestion.text}
                  </h3>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <a href="/">
            <motion.button
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 111, 32, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform relative z-10" />
              <span className="relative z-10">Back to Home</span>
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;