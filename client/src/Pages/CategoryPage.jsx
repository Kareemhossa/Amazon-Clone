import React, { useEffect, useState } from "react";
// Call Api
import { callAPI } from "../utils/CallApi";
//React Router and Reudx
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
//componants
import ProductPageDetails from "../Layout/Prouduct/ProductPageDetails";
import { GB_CURRENCY } from "../GlobalState";

const CategoryPage = () => {
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    callAPI(`search`)
      .then((result) => {
        if (result[title]) {
          setCategory(result[title]);
          // console.log(result[title]);
        } else {
          setCategory(null);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [title]);

  // handler to addcart in redux
  const addCartHandler = () => {
    const addQuantity = () => {
      return { ...category, quantity: quantity };
    };
    dispatch(addToCart(addQuantity()));
  };

  if (!category) {
    return <h1 className="text-center text-2xl">Loading category ...</h1>;
  }

  return (
    <section className="min-w-[1000px] max-w-[1200px] m-auto ">
      {category &&
        category.map((category) => (
          <section
            key={category.id}
            className="my-6 border bg-gray-50 rounded-md shadow-sm transition duration-300 transform hover:shadow-lg  "
          >
            <div className="h-[250px] flex justify-between items-center my-3">
              {/** left */}
              <div className="flex-none p-4">
                <img
                  className="h-full rounded-md   max-h-[220px]  max-w-[200px]"
                  src={category.img}
                  alt="Search result product"
                />
              </div>
              {/** center */}
              <div className="flex-auto pl-4h-[200px]  bg-gray-100 rounded-md">
                <div className="font-medium text-black p-2">
                  <ProductPageDetails item={category} />
                  <div className="text-xl xl:text-2xl pt-1">
                    {GB_CURRENCY.format(category.price)}
                  </div>
                </div>
              </div>
              {/** rgiht**/}
              <div className="flex-none flex flex-col justify-between items-center gap-4 px-4 my-2">
                <div className="text-base xl:text-lg mt-1">
                  Quantity:
                  <select
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-2 mx-4 bg-white border rounded-md focus:border-indigo-600"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                {/* button */}
                <div className="flex flex-col justify-between items-center gap-4 my-2 ">
                  <button
                    onClick={addCartHandler}
                    className="w-full bg-amazonclone-yellow hover:bg-yellow-600 font-medium py-3 px-6 rounded-md"
                  >
                    Add to Cart
                  </button>
                  <Link to={"/checkout"} className="w-full">
                    <button
                      onClick={addCartHandler}
                      className="w-full bg-amazonclone-yellow2 hover:bg-yellow-700  font-medium py-3 px-6 rounded-md"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
    </section>
  );
};

export default CategoryPage;
