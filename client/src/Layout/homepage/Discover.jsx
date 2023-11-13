import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Discover = () => {
  const [dataDiscover, setDataDiscover] = useState([]);
  const API_URL = "http://localhost:3005";
  useEffect(() => {
    axios
      .get(`${API_URL}/discover`)
      .then((response) => {
        setDataDiscover(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <section className="bg-white mx-3 my-4 ">
      <div className="text-2xl font-semibold p-4">Discover Amazon</div>
      <div className="mx-4 pb-6">
        <Swiper
          slidesPerView={5}
          spaceBetween={30} //between items
          navigation={true}
          modules={[Navigation]}
        >
          {dataDiscover.map(({ img, id }) => (
            <SwiperSlide key={id} className="cursor-pointer">
              <img
                src={img}
                alt="Deal category"
                className="transition duration-300 transform hover:shadow-lg hover:-translate-y-1 hover:scale-110"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Discover;
