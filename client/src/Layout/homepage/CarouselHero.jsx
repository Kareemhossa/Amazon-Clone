import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
//images
import home1 from "../../Assets/Home1.jpg";
import home2 from "../../Assets/Home2.jpg";
import home3 from "../../Assets/Home3.jpg";
import home4 from "../../Assets/Home4.jpg";

const CarouselHero = () => {
  return (
    <div className="h-[650px] bg-white ">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={0}
        navigation={true}
        autoplay={{ delay: 5000 }}
        className="h-[60%]"
      >
        <SwiperSlide>
          <img src={home1} alt="AmazoneImg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={home2} alt="AmazoneImg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={home3} alt="AmazoneImg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={home4} alt="AmazoneImg" />
        </SwiperSlide>
      </Swiper>
      <div className="h-[50%] bg-gradient-to-b from-[#effafa] to-[#EAEDED]" />
    </div>
  );
};

export default CarouselHero;
