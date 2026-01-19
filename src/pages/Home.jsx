// src/pages/Home.jsx
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Zap, Package, Award, Users, Star, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import jblImg from "../assets/jbl.jpg";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    customPaging: (i) => (
      <div className="w-3 h-3 rounded-full bg-[#607EA2]/50 hover:bg-[#DDE3A3] hover:scale-125 transition-all duration-300"></div>
    ),
    appendDots: (dots) => (
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
        <ul className="flex gap-3">{dots}</ul>
      </div>
    ),
  };

  const bannerData = [
    {
      id: 1,
      title: "Summer Sale 50% Off",
      subtitle: "Grab your favorite gadgets now!",
      image: jblImg,
      gradient: "from-[#314B6E] via-[#607EA2] to-[#8197AC]",
      buttons: [
        { text: "Shop Now", link: "/products", primary: true },
        { text: "View Deals", link: "/products", primary: false },
      ],
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Check out the latest products",
      image: jblImg,
      gradient: "from-[#1a2332] via-[#314B6E] to-[#607EA2]",
      buttons: [
        { text: "Shop Now", link: "/products", primary: true },
        { text: "Explore", link: "/products", primary: false },
      ],
    },
    {
      id: 3,
      title: "Exclusive Offers",
      subtitle: "Limited time only!",
      image: jblImg,
      gradient: "from-[#607EA2] via-[#8197AC] to-[#DDE3A3]",
      buttons: [
        { text: "Shop Now", link: "/products", primary: true },
        { text: "See More", link: "/products", primary: false },
      ],
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "from-[#607EA2] to-[#8197AC]" },
    { icon: Package, value: "10K+", label: "Products", color: "from-[#314B6E] to-[#607EA2]" },
    { icon: Award, value: "500+", label: "5-Star Reviews", color: "from-[#8197AC] to-[#DDE3A3]" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction", color: "from-[#607EA2] to-[#DDE3A3]" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
      gradient: "from-[#607EA2] to-[#8197AC]"
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "100% authentic guaranteed",
      gradient: "from-[#314B6E] to-[#607EA2]"
    },
    {
      icon: ShoppingBag,
      title: "Easy Returns",
      description: "30-day return policy",
      gradient: "from-[#8197AC] to-[#DDE3A3]"
    },
    {
      icon: Star,
      title: "Best Prices",
      description: "Competitive pricing always",
      gradient: "from-[#607EA2] to-[#DDE3A3]"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0E141C]">
      {/* Hero Slider */}
      <div className="w-full overflow-hidden">
        <Slider {...settings}>
          {bannerData.map((banner) => (
            <div key={banner.id}>
              <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`} />
                </div>

                {/* Animated Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-20 right-20 w-64 h-64 bg-[#DDE3A3]/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-[#DDE3A3]/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-6xl mx-auto px-6 md:px-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl text-[#DDE3A3]">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-3xl mb-8 font-bold opacity-90 drop-shadow-lg text-white">
                      {banner.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 flex-wrap">
                      {banner.buttons.map((btn, idx) => (
                        <Link
                          key={idx}
                          to={btn.link}
                          className={`group relative overflow-hidden ${
                            btn.primary
                              ? "bg-[#DDE3A3] text-[#0E141C] hover:bg-white"
                              : "bg-[#314B6E]/60 backdrop-blur-sm text-[#DDE3A3] hover:bg-[#314B6E] border-2 border-[#607EA2]"
                          } font-black py-4 px-8 rounded-xl transition-all shadow-2xl hover:shadow-[#607EA2]/50 flex items-center gap-2`}
                        >
                          <span className="relative z-10">{btn.text}</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          {btn.primary && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 -mt-20 relative z-20 mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#314B6E]/40 to-[#1a2332] border border-[#314B6E] rounded-2xl shadow-xl shadow-[#314B6E]/30 p-6 text-center backdrop-blur-sm"
            >
              <div className={`inline-block p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-3 shadow-lg`}>
                <stat.icon size={28} className="text-[#0E141C]" />
              </div>
              <h3 className="text-3xl font-black text-[#DDE3A3] mb-1">{stat.value}</h3>
              <p className="text-[#8197AC] font-bold text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 text-[#DDE3A3]">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: "#607EA2" }}
              className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-[#314B6E]/40 transition-all border-2 border-[#314B6E]/50 backdrop-blur-sm"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 shadow-lg`}>
                <feature.icon size={32} className="text-[#0E141C]" />
              </div>
              <h3 className="text-xl font-black text-[#DDE3A3] mb-3">{feature.title}</h3>
              <p className="text-[#8197AC] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#314B6E] via-[#607EA2] to-[#8197AC] py-20 relative overflow-hidden border-y border-[#314B6E]"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-[#DDE3A3]/30 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#DDE3A3]/30 rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-5xl font-black mb-6 text-[#DDE3A3]">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 text-white font-semibold">
              Discover amazing deals on your favorite tech products
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-[#DDE3A3] text-[#0E141C] font-black py-5 px-10 rounded-xl hover:bg-white transition-all shadow-2xl hover:shadow-[#DDE3A3]/50 group"
            >
              Browse Products
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Additional decorative section */}
      <div className="h-20 bg-gradient-to-b from-[#0E141C] to-[#1a2332]" />
    </div>
  );
};

export default Home;