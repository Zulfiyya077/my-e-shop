import { motion } from "framer-motion";
import { Package, Award, Users, TrendingUp, Mail, Phone, MapPin, Shield, Zap, Heart } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "from-[#314B6E] to-[#607EA2]" },
    { icon: Package, value: "10K+", label: "Products Sold", color: "from-[#607EA2] to-[#8197AC]" },
    { icon: Award, value: "500+", label: "5-Star Reviews", color: "from-[#8197AC] to-[#607EA2]" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "from-[#607EA2] to-[#314B6E]" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product is thoroughly tested and verified to meet the highest standards of quality and performance.",
      gradient: "from-[#314B6E] to-[#607EA2]"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Lightning-fast shipping with real-time tracking. Most orders arrive within 2-3 business days.",
      gradient: "from-[#607EA2] to-[#8197AC]"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. 24/7 support team ready to help with any questions or concerns.",
      gradient: "from-[#8197AC] to-[#607EA2]"
    }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Michael Chen", role: "Tech Director", img: "https://i.pravatar.cc/150?img=13" },
    { name: "Emily Rodriguez", role: "Customer Success", img: "https://i.pravatar.cc/150?img=5" },
    { name: "David Park", role: "Product Manager", img: "https://i.pravatar.cc/150?img=12" }
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
            About My-e-shop
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Your trusted destination for cutting-edge technology and exceptional service since 2026
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 -mt-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl shadow-xl p-6 text-center border border-[#314B6E]/50 backdrop-blur-sm"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}>
                <stat.icon size={32} className="text-[#EDE3A3]" />
              </div>
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#EDE3A3] to-[#8197AC] bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-[#8197AC] font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-[#8197AC] leading-relaxed text-lg">
              Welcome to <span className="font-bold text-[#EDE3A3]">My-e-shop</span>! We are dedicated to providing the best electronic products with top-notch customer service. Our mission is to make shopping easy and enjoyable for everyone.
            </p>
            <p className="text-[#8197AC] leading-relaxed text-lg">
              Founded in 2026, our store focuses on high-quality devices, laptops, accessories, and tablets. We carefully select our products to ensure they meet our standards for reliability and performance.
            </p>
            <p className="text-[#8197AC] leading-relaxed text-lg">
              Our team is passionate about technology and committed to helping you find the perfect product that fits your needs. Customer satisfaction is our top priority.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#314B6E]/50">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Team" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E141C]/80 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] p-6 rounded-2xl shadow-2xl border-2 border-[#314B6E]"
            >
              <p className="text-4xl font-black">2026</p>
              <p className="text-sm font-semibold">Founded</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#314B6E]/10 to-[#0E141C] py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all border border-[#314B6E]/50 backdrop-blur-sm">
                  <div className={`inline-block p-4 bg-gradient-to-r ${value.gradient} rounded-xl mb-6`}>
                    <value.icon size={32} className="text-[#EDE3A3]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#EDE3A3]">{value.title}</h3>
                  <p className="text-[#8197AC] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-[#314B6E] to-[#607EA2] rounded-3xl p-12 text-[#EDE3A3] relative overflow-hidden border-2 border-[#607EA2]/50"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EDE3A3] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8197AC] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl font-black mb-6"
            >
              Our Vision
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl leading-relaxed opacity-90"
            >
              To become the most trusted online store for tech enthusiasts, providing seamless shopping experience, quality products, and excellent support. We envision a future where technology is accessible to everyone.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#314B6E]/10 to-[#0E141C] py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-[#314B6E]/50"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-[#EDE3A3]">{member.name}</h3>
                <p className="text-[#607EA2] font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Mail, label: "Email", value: "support@my-e-shop.com", color: "from-[#314B6E] to-[#607EA2]" },
            { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "from-[#607EA2] to-[#8197AC]" },
            { icon: MapPin, label: "Address", value: "123 Tech Street, Silicon Valley, CA", color: "from-[#8197AC] to-[#607EA2]" }
          ].map((contact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-8 shadow-lg text-center border border-[#314B6E]/50 backdrop-blur-sm"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${contact.color} rounded-xl mb-4`}>
                <contact.icon size={28} className="text-[#EDE3A3]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#EDE3A3]">{contact.label}</h3>
              <p className="text-[#607EA2] font-semibold">{contact.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;