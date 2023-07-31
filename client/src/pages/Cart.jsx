import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../services/AppProvider";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cartItems, token } = useCart();

  return (
    <Layout title={"Shoppy Karo ! Cart"}>
      {cartItems.length < 1 ? (
        <div className=" text-4xl text-center my-10">No items in Cart !</div>
      ) : (
        ""
      )}
      <div className=" flex flex-wrap w-10/12 mx-auto my-10">
        {cartItems?.map((e) => {
          return <ProductCard key={e._id} e={e} remove={true} />;
        })}
      </div>
      {
        cartItems?.length > 0 ? <div className=" w-10/12 text-center mx-auto my-5">
        <NavLink to={"/user/payment"}>
          <button className=" bg-red-300 px-6 py-3 rounded-3xl hover:cursor-pointer hover:bg-green-300">
            {token ? "Proceed to Checkout" : "Login "}
          </button>
        </NavLink>
      </div> :''
      }
    </Layout>
  );
};

export default Cart;
