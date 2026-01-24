import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Zap, Package, Award, Users, Star, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProducts, getCategories } from "../services/api";
import ProductCarousel from "../components/carusel/ProductCarusel";
import Brands from "../components/home/Brands";

const Home = () => {
  const [bannerProducts, setBannerProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productsResponse = await getProducts({ limit: 3, sort: 'rating', order: 'desc' });
        setBannerProducts(productsResponse.data || []);

        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse || []);

        // OPTIMIZATION: Fetch a small number of products but use the global 'count' from the metadata
        const statsResponse = await getProducts({ limit: 10 });
        const productsForStats = statsResponse.data || [];
        const totalRating = productsForStats.reduce((sum, p) => sum + (p.rating || 0), 0);

        setStats({
          totalProducts: statsResponse.count || productsForStats.length,
          categories: categoriesResponse?.length || 0,
          avgRating: productsForStats.length > 0 ? (totalRating / productsForStats.length).toFixed(1) : 0
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="w-3 h-3 rounded-full bg-[#FF6F20]/50 hover:bg-[#FFB300] hover:scale-125 transition-all duration-300"></div>
    ),
    appendDots: (dots) => (
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-20">
        <ul className="flex gap-3">{dots}</ul>
      </div>
    ),
  };

  const gradients = [
    "from-[#FF6F20]/40 via-[#FFB300]/30 to-[#FF7043]/40",
    "from-[#FF7043]/40 via-[#FF6F20]/30 to-[#FFB300]/40",
    "from-[#FFB300]/40 via-[#FF7043]/30 to-[#FF6F20]/40"
  ];

  const statsData = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "from-[#FF6F20] to-[#FFB300]" },
    { icon: Package, value: `${stats.totalProducts}+`, label: "Products", color: "from-[#FFB300] to-[#FF7043]" },
    { icon: Award, value: stats.avgRating, label: "Avg Rating", color: "from-[#FF7043] to-[#FF6F20]" },
    { icon: TrendingUp, value: `${stats.categories}+`, label: "Categories", color: "from-[#FF6F20] to-[#FF7043]" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
      gradient: "from-[#FF6F20] to-[#FFB300]"
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "100% authentic guaranteed",
      gradient: "from-[#FFB300] to-[#FF7043]"
    },
    {
      icon: ShoppingBag,
      title: "Easy Returns",
      description: "30-day return policy",
      gradient: "from-[#FF7043] to-[#FF6F20]"
    },
    {
      icon: Star,
      title: "Best Prices",
      description: "Competitive pricing always",
      gradient: "from-[#FF6F20] to-[#FFB300]"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF3E0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF6F20] border-t-[#FFB300] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#FF6F20] text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E0]">
      {/* Hero Slider */}
      <div className="w-full overflow-hidden">
        <Slider {...settings}>
          {bannerProducts.map((product, index) => {
            const discount = product.discount || 0;
            const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);

            return (
              <div key={product.id}>
                <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-white">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FFF3E0]">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-contain md:object-cover scale-90 md:scale-100"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600?text=Product+Image';
                      }}
                    />
                    {/* Lighter Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} mix-blend-multiply opacity-60`} />
                    {/* Bottom fade for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Animated Shapes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute top-20 right-20 w-64 h-64 bg-[#FFB300]/10 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-20 left-20 w-96 h-96 bg-[#FF7043]/10 rounded-full blur-3xl"
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
                      {discount > 0 && (
                        <div className="inline-block bg-[#FF6F20] text-white font-black px-6 py-2 rounded-full mb-4 shadow-lg border-2 border-white">
                          {discount}% OFF
                        </div>
                      )}
                      <h2 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl text-white">
                        {product.title}
                      </h2>
                      <p className="text-xl md:text-3xl mb-4 font-bold opacity-95 drop-shadow-lg text-white">
                        {product.category || 'Premium Quality'}
                      </p>

                      {/* Buttons */}
                      <div className="flex gap-4 flex-wrap">
                        <Link
                          to={`/products/${product.id}`}
                          className="group relative overflow-hidden bg-white text-[#FF6F20] hover:bg-[#FF6F20] hover:text-white font-black py-4 px-8 rounded-xl transition-all shadow-2xl hover:shadow-[#FFB300]/50 flex items-center gap-2"
                        >
                          <span className="relative z-10">Shop Now</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#FFB300] to-[#FF6F20] opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </Link>
                        <Link
                          to="/products"
                          className="bg-black/20 backdrop-blur-md text-white hover:bg-black/40 border-2 border-white font-black py-4 px-8 rounded-xl transition-all shadow-2xl hover:shadow-black/50 flex items-center gap-2"
                        >
                          <span>View All</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
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
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white border-2 border-[#FF6F20]/20 rounded-2xl shadow-xl shadow-[#FF6F20]/5 p-6 text-center"
            >
              <div className={`inline-block p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-3 shadow-lg`}>
                <stat.icon size={28} className="text-white" />
              </div>
              <h3 className="text-3xl font-black text-[#4A4A4A] mb-1">{stat.value}</h3>
              <p className="text-[#FF6F20] font-bold text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Brands Slider */}
      <Brands />

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: "#FF6F20" }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-[#FF6F20]/10 transition-all border-2 border-[#FF6F20]/10 hover:border-[#FF6F20]"
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 shadow-lg`}>
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-[#4A4A4A] mb-3">{feature.title}</h3>
              <p className="text-[#4A4A4A]/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] py-20 relative overflow-hidden border-y-4 border-[#FF6F20]"
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-5xl font-black mb-6 text-white">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 text-white font-semibold">
              Discover amazing deals on your favorite tech products
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-white text-[#FF6F20] font-black py-5 px-10 rounded-xl hover:bg-[#FFF3E0] transition-all shadow-2xl hover:shadow-white/50 group"
            >
              Browse Products
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <div className="h-20 bg-gradient-to-b from-[#FFF3E0] to-white" />
    </div>
  );
};

export default Home;