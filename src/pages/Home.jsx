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
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white hover:scale-125 transition-all duration-300"></div>
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
      gradient: "from-blue-600 via-purple-600 to-pink-600",
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
      gradient: "from-green-500 via-teal-500 to-blue-500",
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
      gradient: "from-orange-500 via-red-500 to-pink-500",
      buttons: [
        { text: "Shop Now", link: "/products", primary: true },
        { text: "See More", link: "/products", primary: false },
      ],
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "from-blue-500 to-blue-600" },
    { icon: Package, value: "10K+", label: "Products", color: "from-green-500 to-green-600" },
    { icon: Award, value: "500+", label: "5-Star Reviews", color: "from-purple-500 to-purple-600" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction", color: "from-orange-500 to-orange-600" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "100% authentic guaranteed",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingBag,
      title: "Easy Returns",
      description: "30-day return policy",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Star,
      title: "Best Prices",
      description: "Competitive pricing always",
      gradient: "from-green-500 to-emerald-500"
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
    <div className="min-h-screen bg-white">
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
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-80`} />
                </div>

                {/* Animated Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
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
                    <h2 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-3xl mb-8 font-semibold opacity-90 drop-shadow-lg">
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
                              ? "bg-white text-gray-900 hover:bg-gray-100"
                              : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-2 border-white"
                          } font-bold py-4 px-8 rounded-xl transition-all shadow-2xl hover:shadow-3xl flex items-center gap-2`}
                        >
                          <span className="relative z-10">{btn.text}</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          {btn.primary && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
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
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className={`inline-block p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-3`}>
                <stat.icon size={28} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-semibold text-sm">{stat.label}</p>
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
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 shadow-lg`}>
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden"
      >
        {/* Animated Background */}
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-black mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing deals on your favorite tech products
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold py-5 px-10 rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl group"
          >
            Browse Products
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;