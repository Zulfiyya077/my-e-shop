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

    // Save message to localStorage
    const messageRecord = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString()
    };

    const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    localStorage.setItem("contactMessages", JSON.stringify([...existingMessages, messageRecord]));

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
    { icon: Mail, label: "Email", value: "support@ZIpTech.com", color: "from-[#FF6F20] to-[#FFB300]" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "from-[#FFB300] to-[#FF7043]" },
    { icon: MapPin, label: "Address", value: "123 Tech Street, Silicon Valley, CA", color: "from-[#FF7043] to-[#FF6F20]" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] text-white py-24"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
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
            className="text-xl max-w-3xl mx-auto leading-relaxed opacity-95"
          >
            Have a question or feedback? We'd love to hear from you.
          </motion.p>
        </div>
      </motion.section>

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
              className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-[#FF6F20]"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${info.color} rounded-xl mb-4`}>
                <info.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">{info.label}</h3>
              <p className="text-[#FF6F20] font-semibold text-sm break-all">{info.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-full" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#4A4A4A] mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User size={20} className="text-[#FF6F20]" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#FF6F20] bg-white rounded-xl focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/20 focus:outline-none transition-all text-[#4A4A4A] placeholder-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#4A4A4A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail size={20} className="text-[#FF6F20]" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#FF6F20] bg-white rounded-xl focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/20 focus:outline-none transition-all text-[#4A4A4A] placeholder-gray-400"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-bold text-[#4A4A4A] mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-5">
                    <MessageSquare size={20} className="text-[#FF6F20]" />
                  </div>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us what's on your mind..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#FF6F20] bg-white rounded-xl focus:border-[#FFB300] focus:ring-4 focus:ring-[#FFB300]/20 focus:outline-none transition-all resize-none text-[#4A4A4A] placeholder-gray-400"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] text-white py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl relative overflow-hidden group"
                whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent">
                Visit Us
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-full" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-[#FF6F20] h-96"
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

            <motion.div
              variants={itemVariants}
              className="bg-[#FFF3E0] rounded-2xl p-8 border-2 border-[#FF6F20]"
            >
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
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
                  <span className="text-red-500 font-semibold">Closed</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { q: "What are your business hours?", a: "We're available Monday to Friday, 9 AM - 6 PM EST.", color: "from-[#FF6F20] to-[#FFB300]" },
              { q: "How fast do you respond?", a: "We aim to respond to all inquiries within 24 hours.", color: "from-[#FFB300] to-[#FF7043]" },
              { q: "Do you offer phone support?", a: "Yes! Call us at +1 (555) 123-4567 during business hours.", color: "from-[#FF7043] to-[#FF6F20]" },
              { q: "Where are you located?", a: "Our headquarters is in Silicon Valley, California.", color: "from-[#FF6F20] to-[#FFB300]" }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-[#FFF3E0] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group border-2 border-[#FF6F20]"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${faq.color}`} />
                <h3 className="font-bold text-[#4A4A4A] mb-3 text-lg pl-4">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed pl-4">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;