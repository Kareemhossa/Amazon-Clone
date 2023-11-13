import React, { useEffect, useState } from "react";
// Call Api
import { callAPI } from "../utils/CallApi";
//React Router and Redux
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
//componants and Img
import ProductPageDetails from "../Layout/Prouduct/ProductPageDetails";
import CarouselProduct from "../Layout/Prouduct/CarouselProuduct";
import { toast } from "react-toastify";
import { GB_CURRENCY } from "../GlobalState";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    callAPI(`product`)
      .then((result) => {
        setProduct(result[id]);
        // console.log(result[id]);
      })
      .catch((error) => console.error("Error fetching data: ", error));
    // eslint-disable-next-line
  }, [id]);

  // handler to addcart in redux
  const addCartHandler = () => {
    const addQuantity = () => {
      // setProduct((product.quantity = quantity));
      return { ...product, quantity: quantity };
    };
    dispatch(addToCart(addQuantity()));
    toast.success("Product add successfuly ");
  };

  if (!product?.title)
    return <h1 className="text-center text-2xl">Loading Product ...</h1>;

  return (
    product && (
      <section className="h-screen">
        <main className="min-w-[1000px] max-w-[1600px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2 m-3">
            {/* Left */}
            <article className="col-span-3 p-8 h-full w-full rounded bg-white m-auto">
              <img
                src={product.img}
                alt="Main product"
                className="h-full w-full max-w-[400px] max-h-[550px]"
              />
            </article>
            {/* Middle */}
            <article className="col-span-5 p-6 rounded bg-white divide-y divide-gray-400">
              <div className="mb-3">
                <ProductPageDetails item={product} />
              </div>
              <p className="text-base xl:text-lg mt-4 pt-4">
                {product.description}
              </p>
            </article>
            {/* Right */}
            <aside className="col-span-2 p-6 rounded bg-white flex flex-col justify-evenly">
              {/* Top */}
              <div className="my-4">
                <div className="text-2xl xl:text-6xl text-red-700 text-center font-semibold">
                  {GB_CURRENCY.format(product.price)}
                </div>
                <div className="text-base xl:text-lg text-gray-500 text-center font-semibold mt-2">
                  RRP:
                  <span className="line-through">
                    {GB_CURRENCY.format(product.oldPrice)}
                  </span>
                </div>
                <div className="text-sm xl:text-base text-blue-500 font-semibold mt-8">
                  FREE Returns
                </div>
                <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                  FREE Delivery
                </div>
                <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                  In Stock
                </div>
              </div>
              {/* center */}
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
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
              {/* button */}
              <div className="flex flex-col justify-between items-center gap-4 my-2 ">
                <button
                  onClick={addCartHandler}
                  className="w-full bg-amazonclone-yellow2 hover:bg-yellow-600 font-medium py-3 px-6 rounded-md"
                >
                  Add to Cart
                </button>
                <Link to={"/checkout"} className="w-full">
                  <button
                    onClick={addCartHandler}
                    className="w-full bg-amazonclone-yellow2 hover:bg-yellow-600 font-medium py-3 px-6 rounded-md"
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </aside>
          </div>
          <CarouselProduct />
        </main>
      </section>
    )
  );
};

export default ProductPage;
