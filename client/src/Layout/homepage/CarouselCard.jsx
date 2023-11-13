import React, { useEffect, useState } from "react";
import axios from "axios";
// import component and Iamge
import CardDetails from "./CardDetails";
import banner_image from "../../Assets/banner_image_2.jpg";

const CarouselCard = () => {
  const [dataCard, setDataCard] = useState([]);
  const API_URL = "http://localhost:3005";
  useEffect(() => {
    axios
      .get(`${API_URL}/card`)
      .then((response) => {
        setDataCard(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 xl:-mb-10 -mt-80">
      {dataCard.map(({ id, title, img, link }) => (
        <CardDetails key={id} title={title} img={img} link={link} />
      ))}
      <div className="m-4 pt-2 ">
        <img
          className="xl:hidden h-[400px] rounded-l"
          src={banner_image}
          alt="Banner 1"
        />
      </div>
    </section>
  );
};

export default CarouselCard;
