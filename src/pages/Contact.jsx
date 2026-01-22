import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "support@ZIpTech.com", color: "from-[#314B6E] to-[#607EA2]" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "from-[#607EA2] to-[#8197AC]" },
    { icon: MapPin, label: "Address", value: "123 Tech Street, Silicon Valley, CA", color: "from-[#8197AC] to-[#607EA2]" }
  ];

  return (
    <div className="min-h-screen bg-[#0E141C]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#314B6E] via-[#607EA2] to-[#314B6E] text-[#EDE3A3] py-24"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-[#EDE3A3] rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#8197AC] rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-6xl font-black mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Have a question or feedback? We'd love to hear from you.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 -mt-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl shadow-xl p-8 text-center border border-[#314B6E]/50 backdrop-blur-sm"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${info.color} rounded-xl mb-4`}>
                <info.icon size={32} className="text-[#EDE3A3]" />
              </div>
              <h3 className="text-xl font-bold text-[#EDE3A3] mb-2">{info.label}</h3>
              <p className="text-[#8197AC] font-semibold text-sm break-all">{info.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-full" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#8197AC] mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User size={20} className="text-[#607EA2]" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#314B6E]/50 bg-[#0E141C] rounded-xl focus:border-[#607EA2] focus:ring-4 focus:ring-[#607EA2]/20 focus:outline-none transition-all text-[#EDE3A3] placeholder-[#607EA2]"
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#8197AC] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail size={20} className="text-[#607EA2]" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#314B6E]/50 bg-[#0E141C] rounded-xl focus:border-[#607EA2] focus:ring-4 focus:ring-[#607EA2]/20 focus:outline-none transition-all text-[#EDE3A3] placeholder-[#607EA2]"
                  />
                </div>
              </motion.div>

              {/* Message Textarea */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#8197AC] mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-5">
                    <MessageSquare size={20} className="text-[#607EA2]" />
                  </div>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us what's on your mind..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#314B6E]/50 bg-[#0E141C] rounded-xl focus:border-[#607EA2] focus:ring-4 focus:ring-[#607EA2]/20 focus:outline-none transition-all resize-none text-[#EDE3A3] placeholder-[#607EA2]"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-[#607EA2] via-[#8197AC] to-[#607EA2] text-[#0E141C] py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl relative overflow-hidden group"
                whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EDE3A3] to-transparent opacity-0 group-hover:opacity-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 relative z-10"
                    >
                      <CheckCircle size={24} />
                      Message Sent Successfully!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 relative z-10"
                    >
                      <Send size={20} />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Map & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
                Visit Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-full" />
            </motion.div>

            {/* Map */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl overflow-hidden shadow-xl border-2 border-[#314B6E]/50 h-96"
            >
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6395455334823!2d-122.08424908469231!3d37.42199997982505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </motion.div>

            {/* Office Hours */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-8 border-2 border-[#314B6E]/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-[#EDE3A3] mb-4">Office Hours</h3>
              <div className="space-y-2 text-[#8197AC]">
                <p className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span className="text-red-400 font-semibold">Closed</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#314B6E]/10 to-[#0E141C] py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { q: "What are your business hours?", a: "We're available Monday to Friday, 9 AM - 6 PM EST.", color: "from-[#314B6E] to-[#607EA2]" },
              { q: "How fast do you respond?", a: "We aim to respond to all inquiries within 24 hours.", color: "from-[#607EA2] to-[#8197AC]" },
              { q: "Do you offer phone support?", a: "Yes! Call us at +1 (555) 123-4567 during business hours.", color: "from-[#8197AC] to-[#607EA2]" },
              { q: "Where are you located?", a: "Our headquarters is in Silicon Valley, California.", color: "from-[#607EA2] to-[#314B6E]" }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group border border-[#314B6E]/50 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${faq.color}`} />
                <h3 className="font-bold text-[#EDE3A3] mb-3 text-lg pl-4">{faq.q}</h3>
                <p className="text-[#8197AC] leading-relaxed pl-4">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;