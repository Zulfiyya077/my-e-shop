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
    { icon: Home, text: "Go to Homepage", link: "/", color: "from-[#314B6E] to-[#607EA2]" },
    { icon: ShoppingBag, text: "Browse Products", link: "/products", color: "from-[#607EA2] to-[#8197AC]" },
    { icon: Search, text: "Search", link: "/products", color: "from-[#8197AC] to-[#607EA2]" }
  ];

  return (
    <div className="min-h-screen bg-[#0E141C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#314B6E]/30 to-[#607EA2]/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#607EA2]/30 to-[#8197AC]/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-[#314B6E]/20 to-[#607EA2]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center"
      >
        {/* 404 Number - Animated */}
        <motion.div variants={floatingVariants} animate="animate" className="mb-8">
          <motion.h1
            variants={itemVariants}
            className="text-[200px] md:text-[280px] font-black leading-none bg-gradient-to-r from-[#607EA2] via-[#8197AC] to-[#EDE3A3] bg-clip-text text-transparent drop-shadow-2xl"
            style={{ textShadow: "0 0 100px rgba(96, 126, 162, 0.3)" }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Icon */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-full blur-xl opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-r from-[#607EA2] to-[#8197AC] p-6 rounded-full">
              <AlertCircle size={64} className="text-[#EDE3A3]" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl font-black mb-6 text-[#EDE3A3]"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-[#8197AC] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          The page you're looking for seems to have gone on a shopping spree and can't be found!
        </motion.p>

        {/* Suggestion Cards */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <a key={index} href={suggestion.link}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-[#314B6E]/50 hover:border-[#607EA2] group backdrop-blur-sm"
                >
                  <div className={`inline-block p-4 bg-gradient-to-r ${suggestion.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <suggestion.icon size={32} className="text-[#EDE3A3]" />
                  </div>
                  <h3 className="font-bold text-[#EDE3A3] group-hover:text-[#8197AC] transition-all">
                    {suggestion.text}
                  </h3>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Main Action Button */}
        <motion.div variants={itemVariants}>
          <a href="/">
            <motion.button
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#607EA2] via-[#8197AC] to-[#607EA2] text-[#0E141C] font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(96, 126, 162, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EDE3A3] to-transparent opacity-0 group-hover:opacity-30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform relative z-10 mb-2" />
              <span className="relative z-10">Back to Home</span>
            </motion.button>
          </a>
        </motion.div>

   
      </motion.div>
    </div>
  );
};

export default NotFound;