import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import { getBrands } from "../../services/api";
import { useFilter } from "../../context/FilterContext";

/**
 * BrandIcon Component
 * Renders professional SVG logos for specific brands.
 * Inherits color from parent for maximum theme flexibility.
 */
const BrandIcon = ({ name }) => {
    const lowerName = name.toLowerCase();
    const iconColor = "currentColor";

    if (lowerName.includes("apple")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-10 h-10 sm:w-12 sm:h-12">
            <path d="M17.057 14.23c-.023 2.51 2.046 3.733 2.138 3.787-.018.062-.33 1.134-1.076 2.228-.646.945-1.317 1.887-2.373 1.906-1.037.019-1.373-.615-2.565-.615-1.19 0-1.564.615-2.565.654-1.037.038-1.782-.997-2.433-1.944-1.332-1.928-2.35-5.441-1.012-7.766.666-1.154 1.854-1.886 3.14-1.905 1.056-.019 2.053.712 2.697.712.643 0 1.638-.731 2.89-.604.526.022 1.99.213 2.933 1.589-.074.046-1.75.989-1.734 3.018zM14.503 5.4c.57-.69 1.15-1.63 1.05-2.58-.87.03-1.88.58-2.5 1.3-.55.63-1.04 1.59-.9 2.5.95.07 1.89-.52 2.35-1.22z" />
        </svg>
    );

    if (lowerName.includes("samsung")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-12 h-12 sm:w-16 sm:h-16">
            <path d="M23.854 10.97c0 1.89-4.854 3.424-10.842 3.424-5.989 0-10.842-1.534-10.842-3.424s4.853-3.424 10.842-3.424c5.988 0 10.842 1.534 10.842 3.424zm-14.825.293s-.036-.312.44-.452c.44-.128.528.096.528.096s.013.166-.4.249c-.413.083-.568-.142-.568-.142L9.03 11.263zm.91.561s0-.153.251-.235c.245-.08.434.026.434.026v.442s-.11.082-.3.125c-.19.043-.448-.041-.448-.041l.063-.317zm1.144-.755s0-.098.114-.144c.114-.045.242.015.242.015v.394s-.11.082-.3.125c-.191.043-.448-.042-.448-.042v-.039l.392-.309zm.497 1.096s0-.098.114-.144c.114-.045.242.015.242.015v.426s-.103.076-.28.115c-.176.039-.415-.039-.415-.039l.339-.373zm1.171-.913s0-.153.251-.235c.245-.081.434.026.434.026v.442s-.11.082-.3.125c-.191.043-.448-.041-.448-.041l.063-.317zm1.378.106s-.043-.4.375-.5c.414-.1.6-.013.6-.013l.035.158s-.116-.039-.304-.007c-.188.032-.236.19-.236.19v.033h.521l.024.139h-.545v.317c0 .16-.144.209-.276.225-.132.016-.318-.04-.318-.04l.147-.502zM12.7 10.511s-.066-.37.382-.416c.159-.016.312.02.312.02l-.089.442s-.05.039-.245.039c-.195 0-.36-.085-.36-.085z" />
        </svg>
    );

    if (lowerName.includes("dell")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-10 h-10 sm:w-12 sm:h-12">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 21.086c-5.01 0-9.086-4.076-9.086-9.086 0-5.01 4.076-9.086 9.086-9.086 5.01 0 9.086 4.076 9.086 9.086 0 5.01-4.076 9.086-9.086 9.086zM6.915 9.086v5.828H8.8v-.6h.029c.142.228.314.4.514.514s.457.171.742.171c.428 0 .785-.1.1-.314s.543-.5.714-.857c.185-.371.272-.785.272-1.257s-.087-.885-.272-1.257-.442-.672-.771-.885-.728-.314-1.185-.314c-.328 0-.614.071-.857.2-.243.128-.429.3-.557.528H7.6l.872-3.143zM9.4 12.028c0-.6.128-1 .386-1.257s.585-.386.971-.386c.357 0 .642.142.871.4.228.257.342.614.342 1.057s-.114.814-.342 1.085-.514.414-.871.414c-.386 0-.714-.128-.971-.4s-.386-.628-.386-1.128zm3.628-2.942v5.828h2.942v-1.171H14.2v-1.171h1.171v-1.171H14.2v-1.144h1.771V9.086zm3.314 0v5.828h1.171V10.257h1.772v1.171h1.171V9.086zm3.314 0v5.828h1.171V10.257h1.772v1.171h1.171V9.086z" />
        </svg>
    );

    if (lowerName.includes("hp")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-10 h-10 sm:w-12 sm:h-12">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.92 18.04l-.5 2.14a8.68 8.68 0 0 1-5.69-2.31l1.72-7.39h1.16l-.37 1.58c.42-.62.91-1.07 1.48-1.34s1.23-.41 1.95-.41c1.23 0 2.22.38 2.97 1.14c.75.76 1.12 1.83 1.12 3.2c0 .94-.17 1.8-.52 2.58a5.2 5.2 0 0 1-1.44 1.87a5.57 5.57 0 0 1-2.12 1.08c-.7.18-1.28.27-1.76.27l-.5 2.16L12 24.5a12.5 12.5 0 0 1-5.18-1.12l.5-2.12L12 22a10 10 0 0 0 3.75-.75L12 21.25zM15.42 12a3.81 3.81 0 0 0-1.2-2.33c-.7-.6-1.63-.9-2.77-.9a6.08 6.08 0 0 0-1.85.29c-.61.19-1.11.45-1.51.77l-.98 4.22c.21.36.5.65.86.86a3.83 3.83 0 0 0 1.95.53c1.02 0 1.85-.28 2.5-.83c.64-.55 1.14-1.29 1.5-2.22c.36-.93.53-1.73.53-2.39h-.03zm1.16-1.58l.5-2.14a8.68 8.68 0 0 1 5.69 2.31l-1.72 7.39h-1.16l.37-1.58c-.42.62-.91 1.07-1.48 1.34s-1.23.41-1.95.41c-1.23 0-2.22-.38-2.97-1.14c-.75-.76-1.12-1.83-1.12-3.2c0-.94.17-1.8.52-2.58s.84-1.44 1.44-1.87s1.3-.72 2.12-1.08c.7-.18 1.28-.27 1.76-.27z" />
        </svg>
    );

    if (lowerName.includes("sony")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-12 h-12 sm:w-16 sm:h-16">
            <path d="M0 8.04v7.92h2.88v-1.12H1.2v-2h1.68v-1.12H1.2v-1.68h1.68V8.04H0zm3.84 0v7.92H6.72V8.04H3.84zm1.2 1.12h.48v5.68h-.48V9.16zM7.68 8.04v7.92h3.12v-1.12h-1.92v-2h1.8v-1.12h-1.8v-1.68h1.92V8.04H7.68zm3.84 0v7.92h1.2v-7.92h-1.2zm2.4 0v7.92h1.2l1.68-4.32l1.68 4.32h1.2V8.04h-1.2v5.16l-1.68-4.32h-.48l-1.68 4.32V8.04h-1.2z" />
        </svg>
    );

    if (lowerName.includes("logitech")) return (
        <svg viewBox="0 0 24 24" fill={iconColor} className="w-10 h-10 sm:w-12 sm:h-12">
            <path d="M11.967.08c-6.52.12-11.83 5.38-11.83 11.93 0 6.63 5.37 12 12 12 3.65 0 6.94-1.63 9.17-4.21-.49.07-.98.11-1.49.11-5.52 0-10-4.48-10-10 0-3.34 1.63-6.29 4.14-8.1-.65-.11-1.32-.17-1.99-.17zm5.53 1.95c.57.51 1.07 1.1 1.49 1.75l-.36.21c-.41-.63-.91-1.2-1.46-1.7l.33-.26zm2.34 3.03c.35.66.62 1.36.81 2.1l-.39.11c-.18-.7-.44-1.37-.77-2l.35-.21zm1.24 3.33c.11.8.17 1.62.17 2.45h-.41c0-.81-.06-1.61-.17-2.39l.41-.06zm.26 3.61c-.08.83-.24 1.64-.47 2.42l-.39-.12c.22-.75.38-1.53.46-2.33l.4-.04l-.04.07zm-.73 3.49c-.31.8-.73 1.55-1.22 2.24l-.33-.25c.47-.67.87-1.38 1.17-2.15l.38.16z" />
        </svg>
    );

    if (lowerName.includes("bose")) return (
        <div className="font-black italic text-xl sm:text-2xl tracking-tighter scale-y-75 uppercase">BOSE</div>
    );

    if (lowerName.includes("canon")) return (
        <div className="font-serif italic font-black text-xl sm:text-2xl tracking-tighter uppercase">Canon</div>
    );

    if (lowerName.includes("lenovo")) return (
        <div className="font-bold text-base sm:text-lg uppercase italic border-2 border-current px-2 py-0.5 rounded-sm">Lenovo</div>
    );

    if (lowerName.includes("asus")) return (
        <div className="font-black italic text-2xl sm:text-3xl tracking-widest uppercase">ASUS</div>
    );

    return <Cpu size={32} className="opacity-40" />;
};

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setBrand } = useFilter();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data || []);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const handleBrandClick = (brandName) => {
        setBrand(brandName);
        navigate("/products");
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 5 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 2 }
            }
        ]
    };

    if (loading || brands.length === 0) return null;

    return (
        <section className="bg-[#FFF3E0] py-12 sm:py-16 lg:py-20 overflow-hidden border-y-2 border-[#FF6F20]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header - Mirrored from Featured Products */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent drop-shadow-sm">
                        Available Brands
                    </h2>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] mx-auto rounded-full mb-3 sm:mb-4" />
                    <p className="text-[#4A4A4A] text-sm sm:text-base lg:text-lg font-bold px-4">
                        Discover products from the world's most trusted technology leaders
                    </p>
                </motion.div>

                {/* Brands Slider */}
                <div className="brands-slider-container">
                    <Slider {...settings}>
                        {brands.map((brand, index) => (
                            <div key={index} className="px-3 py-2">
                                <motion.button
                                    onClick={() => handleBrandClick(brand)}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full h-36 sm:h-40 flex flex-col items-center justify-center p-6 bg-white border-2 border-[#FF6F20]/10 hover:border-[#FF6F20] rounded-2xl shadow-xl hover:shadow-[#FF6F20]/20 transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white to-[#FFF3E0] opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="text-[#4A4A4A]/50 group-hover:text-[#FF6F20] transition-all duration-500 transform group-hover:scale-110 flex items-center justify-center min-h-[70px] relative z-10">
                                        <BrandIcon name={brand} />
                                    </div>
                                    <span className="text-[10px] sm:text-xs font-black text-[#4A4A4A]/40 uppercase tracking-[0.2em] mt-3 group-hover:text-[#4A4A4A] transition-colors relative z-10">
                                        {brand}
                                    </span>
                                </motion.button>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style jsx global>{`
                .brands-slider-container .slick-track {
                    display: flex !important;
                    align-items: center !important;
                }
                .brands-slider-container .slick-slide {
                    height: inherit !important;
                }
            `}</style>
        </section>
    );
};

export default Brands;
