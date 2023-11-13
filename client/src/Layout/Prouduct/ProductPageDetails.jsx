import React from "react";
//Icons
import { FaStar } from "react-icons/fa";

const ProductPageDetails = ({ item, avgRating, ratings }) => {
  const ProductBadge = () => {
    if (item.badge === "choice") {
      return (
        <span className="text-xs xl:text-sm bg-slate-800 text-white p-1">
          Amazon's <span className="text-orange-500">Choice</span>
        </span>
      );
    } else if (item.badge === "seller") {
      return (
        <span className="text-xs xl:text-sm bg-orange-500 text-white p-1">
          #1 Best Seller
        </span>
      );
    } else if (item.badge === "limited") {
      return (
        <span className="text-xs xl:text-sm bg-red-500 text-white p-1">
          Limited Time Deal
        </span>
      );
    }
  };

  return (
    <div className="mb-1 font-medium text-black ">
      {item.title && (
        <h2 className="text-xl xl:text-2xl font-medium mb-2">{item.title}</h2>
      )}
      {item.brand && (
        <p className="text-sm xl:text-base mb-2">
          by <span className="text-blue-500">{item.brand}</span>
        </p>
      )}
      {avgRating !== false && (
        <div className="flex items-center my-2">
          <span className="mr-3">{item.avgRating} </span>
          {Array.from({ length: item.avgRating }, (_, i) => (
            <FaStar key={i} className="fill-[#F1B61F] h-[30px] " />
          ))}
          {Array.from({ length: 5 - item.avgRating }, (_, i) => (
            <FaStar key={i} className=" fill-[#a8a8a8] h-[30px]" />
          ))}
        </div>
      )}
      {ratings !== false && (
        <div className="my-2 text-blue-500">{item.ratings} ratings</div>
      )}

      {item.attribute && (
        <p className="text-xs xl:text-sm font-bold mb-2">{item.attribute}</p>
      )}
      {item.badge && <div>{ProductBadge()}</div>}
    </div>
  );
};

export default ProductPageDetails;
