import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Zap, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-[#1877f2]" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-[#e4405f]" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-[#1da1f2]" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-[#0077b5]" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-white text-gray-600 overflow-hidden border-t-2 border-[#FF6F20]">
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB300] to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-10 h-10 text-[#FF6F20]" />
              </motion.div>
              <span className="text-2xl font-black text-[#FF6F20] group-hover:text-[#FFB300] transition-colors">
                ZIpTech
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your premium destination for cutting-edge electronics, innovative gadgets, and premium accessories.
            </p>
            <div className="flex gap-2 pt-2">
              <motion.div
                className="w-2 h-2 bg-[#FF6F20] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-[#FFB300] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="w-2 h-2 bg-[#FF7043] rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-black text-[#FF6F20] flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FF6F20] to-[#FFB300] rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#FF6F20] transition-colors"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 bg-[#FFB300] rounded-full"
                      whileHover={{ scale: 1.5, backgroundColor: "#FF6F20" }}
                    />
                    <span className="relative">
                      {link.name}
                      <motion.div
                        className="absolute -bottom-0.5 left-0 h-px bg-[#FF6F20]"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-black text-[#FF6F20] flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FF6F20] to-[#FFB300] rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start gap-3 text-sm"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-[#FF6F20] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@ZIpTech.com" className="hover:text-[#FF6F20] transition-colors">
                  info@ZIpTech.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-sm"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-[#FF6F20] mt-0.5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-[#FF6F20] transition-colors">
                  +1 (234) 567-890
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-sm"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-[#FF6F20] mt-0.5 flex-shrink-0" />
                <span className="hover:text-[#FF6F20] transition-colors">
                  123 Tech Street, Digital City
                </span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-black text-[#FF6F20] flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FF6F20] to-[#FFB300] rounded-full" />
              Follow Us
            </h3>
            <p className="text-sm text-gray-600">
              Stay connected for the latest updates and exclusive deals!
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-3 bg-[#FFF3E0] border-2 border-[#FF6F20] rounded-xl text-[#FF6F20] ${social.color} transition-all`}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    backgroundColor: "#FFE8C5",
                    borderColor: "#FFB300"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-[#FF6F20]/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-sm text-gray-600"
              whileHover={{ color: "#FF6F20" }}
            >
              &copy; {new Date().getFullYear()} ZIpTech. All rights reserved.
            </motion.p>
            
            <div className="flex gap-6 text-sm">
              <motion.a
                href="#"
                className="text-gray-600 hover:text-[#FF6F20] transition-colors relative"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-px bg-[#FF6F20]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-[#FF6F20] transition-colors relative"
                whileHover={{ y: -2 }}
              >
                Terms of Service
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-px bg-[#FF6F20]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 opacity-5"
        style={{
          background: "radial-gradient(circle at 20% 80%, #FF6F20 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFB300 0%, transparent 50%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </footer>
  );
};

export default Footer;