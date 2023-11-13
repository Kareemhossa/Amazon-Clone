import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// Call Api
import { callAPI } from "../../utils/CallApi";

const Category = () => {
  const [dataCatogory, setDataCatogory] = useState([]);

  useEffect(() => {
    callAPI(`category`)
      .then((response) => {
        setDataCatogory(response);
        // console.log(response);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <section className="bg-white m-4 ">
      <div className="text-2xl font-semibold p-4">Shop by Category</div>
      <div className="mx-8 pb-6">
        <Swiper
          slidesPerView={5}
          spaceBetween={25} //between items
          navigation={true}
          modules={[Navigation]}
        >
          {dataCatogory.map(({ img, id, title }) => (
            <SwiperSlide key={id} className="cursor-pointer">
              <Link to={`/category/${title}`}>
                <img
                  src={img}
                  alt="Deal category"
                  className=" transition duration-300 transform hover:shadow-lg hover:-translate-y-1 hover:scale-110"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
