import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// React Router
import { Link } from "react-router-dom";
// Call Api
import { callAPI } from "../../utils/CallApi";

const CarouselProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    callAPI(`product`)
      .then((response) => {
        setDataProduct(response);
        // console.log(response);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <section className="bg-white px-8  m-3">
      <div className="text-2xl font-semibold  p-3">Best Sellers</div>
      <div className=" pb-6">
        <Swiper
          slidesPerView={5}
          spaceBetween={25} //between items
          navigation={true}
          modules={[Navigation]}
        >
          {dataProduct.slice(0, 8).map(({ img, id }) => (
            <SwiperSlide className="cursor-pointer   " key={id}>
              <Link to={`/product/${id}`}>
                <img
                  src={img}
                  alt="product"
                  className=" max-h-[250px]  transition duration-300  transform hover:shadow-lg hover:-translate-y-1 hover:scale-110"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CarouselProduct;
