import React from "react";
// component
import CarouselHero from "../Layout/homepage/CarouselHero";
import CarouselCard from "../Layout/homepage/CarouselCard";
import CarouselProuduct from "../Layout/Prouduct/CarouselProuduct";
import Category from "../Layout/Category/Category";
import Discover from "../Layout/homepage/Discover";
import CarouselCardB from "../Layout/homepage/CarouselCardB";
import Footer from "../Layout/homepage/Footer";
//image
import bannerImage from "../Assets/Banner advertising.jpg";

const HomePage = () => {
  return (
    <div className="bg-amazonclone-background">
      <div className=" min-w-[1000px] max-w-[1600px] m-auto">
        {/**hero section */}
        <CarouselHero />
        {/**card section  */}
        <CarouselCard />
        {/**Discover section  */}
        <CarouselProuduct />
        {/**Discover section  */}
        <Discover />
        {/**advertising Area */}
        <div className="mx-3 my-4 ">
          <img
            className=" h-[250px] w-full cursor-pointer transition duration-300 transform hover:shadow-lg "
            src={bannerImage}
            alt="Banner advertising"
          />
        </div>
        {/**cardB section   */}
        <CarouselCardB />
        {/**catogry section  */}
        <Category />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
