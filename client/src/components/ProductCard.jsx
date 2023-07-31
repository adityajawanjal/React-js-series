import React, { useEffect, useState } from "react";
import { GetPhotoApi } from "../services/api";
import { useCart } from "../services/AppProvider";
import { NavLink } from "react-router-dom";

const ProductCard = ({ e, remove }) => {
  const [pic, setPic] = useState();
  const { setCartItems, cartItems } = useCart();

  const addToCart = () => {
    const index = cartItems.findIndex((i) => i._id === e._id);
    let items = [...cartItems];
    if (index === -1) {
      e.qty = 1;
      items.push(e);
      localStorage.setItem("cart", JSON.stringify(items));
      setCartItems(items);
    } else {
      items[index].qty += 1;
      localStorage.setItem("cart", JSON.stringify(items));
      setCartItems(items);
    }
  };

  const removeFromCart = () => {
    let items = [...cartItems];
    const index = items.findIndex((i) => i._id === e._id);
    items.splice(index, 1);
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const fetchPhoto = async () => {
    const res = await GetPhotoApi(e._id);
    const url = URL.createObjectURL(res);
    setPic(url);
  };

  useEffect(() => {
    fetchPhoto();
  }, []);

  return (
    <div className="card w-72 border-2 border-red-400 m-4 p-4 flex flex-col  items-center bg-gray-100 shadow-slate-800 shadow-xl hover:scale-105 transition-all ease-in-out hover:cursor-pointer relative h-96">
      <h3 className=" text-center text-xl font-bold mb-2 line-clamp-1">
        {e.name}
      </h3>
      <img src={pic ? pic : ""} alt="pich" className="mb-2 w-11/12 h-40" />
      <p className=" text-justify mb-4 flex flex-col w-full">
        <span className=" line-clamp-3 self-center">{e.description}</span>{" "}
        <span className="flex absolute bottom-16">
          <span className=" text-cyan-900">
            {remove ? `QTY : ${e.qty}` : ""}
          </span>
          <NavLink to={`/product/${e.slug}`}>
            <span className=" text-red-600 border-b-2 border-blue-500 relative left-24">
              Read More...
            </span>
          </NavLink>
        </span>
      </p>
      <div className="flex absolute bottom-2">
        <button className=" bg-blue-300 px-3 py-2 mr-2 ">
          Price : ${e.price}
        </button>
        <button
          className=" bg-red-300 px-3 py-2 hover:cursor-pointer hover:bg-green-300"
          onClick={remove === true ? removeFromCart : addToCart}
        >
          {remove === true ? "Remove " : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
