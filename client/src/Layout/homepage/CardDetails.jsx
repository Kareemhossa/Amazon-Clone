import React from "react";

const CardDetails = ({ title, img, link }) => {
  return (
    <div className=" flex flex-col justify-around h-[420px] bg-white z-30 m-4 rounded-sm overflow-hidden transition duration-300 transform hover:shadow-lg hover:-translate-y-1 hover:scale-105  ">
      <div className="md:text-lg xl:text-xl font-semibold mx-4 mt-6">
        {title}
      </div>
      <div className="h-[300px] max-w-full  m-4">
        <img
          className="h-full w-full object-cover cursor-pointer"
          src={img}
          alt="Home card"
        />
      </div>
      <div className="text-xs xl:text-sm text-blue-400 mx-4 mb-4 cursor-pointer">
        {link}
      </div>
    </div>
  );
};

export default CardDetails;
