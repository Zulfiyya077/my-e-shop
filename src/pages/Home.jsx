import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import jblImg from "../assets/jbl.jpg";


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
     customPaging: (i) => (
      <div className="w-3 h-3 rounded-full bg-gray-800 hover:scale-125 transition-transform duration-300"></div>
    ),
    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full flex justify-center gap-3">
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
    buttons: [
      { text: "Shop Now", link: "/products" },
      { text: "View Deals", link: "/products" },
    ],
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out the latest products",
    image: jblImg,
    buttons: [
      { text: "Shop Now", link: "/products" },
      { text: "Explore", link: "/products" },
    ],
  },
  {
    id: 3,
    title: "Exclusive Offers",
    subtitle: "Limited time only!",
    image: jblImg,
    buttons: [
      { text: "Shop Now", link: "/products" },
      { text: "See More", link: "/products" },
    ],
  },
];

  return (
    <div className="w-full mt-4 overflow-hidden">
      <Slider {...settings}>
        {bannerData.map((banner) => (
          <div key={banner.id}>
            <div className="relative w-full h-full md:h-[32rem] overflow-hidden rounded">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 text-white ${banner.bgColor} bg-opacity-70`}
              >
                <h2 className="text-2xl text-black md:text-4xl font-bold mb-2">{banner.title}</h2>
                <p className="text-md text-black md:text-xl mb-4">{banner.subtitle}</p>

                {/* Buttons */}
                <div className="flex gap-4">
                  {banner.buttons.map((btn, idx) => (
                    <Link
                      key={idx}
                      to={btn.link}
                      className="bg-black text-whitefont-semibold py-2 px-4 rounded hover:bg-gray-100 transition"
                    >
                      {btn.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
