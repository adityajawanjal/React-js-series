import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useCart, useToken } from "../services/AppProvider";
import { NavLink } from "react-router-dom";
import { BraintreePayment, GetBraintreeToken } from "../services/api";
import DropIn from "braintree-web-drop-in-react";

const Payment = () => {
  const [total, setTotal] = useState(0);
  const [clientTokenBraintree, setClientTokenBraintree] = useState();
  const [instance, setInstance] = useState();
  const [loading, setLoading] = useState(false);

  const { token, user } = useToken();
  const { cartItems, setCartItems } = useCart();

  const getTotal = () => {
    if (cartItems?.length > 0) {
      let sum = 0;
      cartItems?.map((e) => {
        return (sum = sum + e.price * e.qty);
      });
      setTotal(sum);
    }
  };

  const getToken = async () => {
    const res = await GetBraintreeToken();
    setClientTokenBraintree(res?.clientToken);
  };

  const handlePayment = async () => {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const data = {
      cart:cartItems,
      nonce,
    };
    const res = await BraintreePayment(data);
    setLoading(false);
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  useEffect(() => {
    getTotal();
  }, [cartItems?.length]);

  useEffect(() => {
    getToken();
  }, [token, user]);

  return (
    <Layout>
      <div className=" grid grid-flow-col gap-5 my-10 mx-5">
        {cartItems?.length > 0 ? (
          <>
            <div className=" col-span-4 flex flex-col border-2 border-red-500 rounded-xl p-5 ">
              <h2 className=" text-3xl text-center font-bold border-b-2 pb-4 border-black ">
                Order Summary{" "}
              </h2>
              <h3 className=" text-2xl my-5 font-semibold ">Cart Items :</h3>
              <div className="flex flex-col">
                <table className=" ">
                  <thead>
                    <tr className=" bg-gray-300">
                      <th className=" text-left py-3">Sr. No</th>
                      <th className=" text-left py-3">Name</th>
                      <th className=" text-left py-3">Price</th>
                      <th className=" text-left py-3">Qty</th>
                      <th className=" text-left py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className=" w-full max-w-full overflow-auto">
                    {cartItems
                      ? cartItems.length > 0
                        ? cartItems?.map((e, i) => {
                            return (
                              <tr
                                key={e._id}
                                className="hover:bg-green-100 hover:cursor-pointer"
                              >
                                <td className=" text-left py-4">{i + 1} </td>
                                <td className=" text-left py-4 ">
                                  {e?.name.length > 20
                                    ? `${e.name.substring(0, 21)}...`
                                    : e.name}
                                </td>
                                <td className=" text-left py-4">$ {e.price}</td>
                                <td className=" text-left py-4">{e.qty}</td>
                                <td className=" text-left py-4">
                                  $ {e.price * e.qty}
                                </td>
                              </tr>
                            );
                          })
                        : ""
                      : ""}
                  </tbody>
                </table>
                <div className="my-5 text-right bg-blue-100 px-6 py-3 text-2xl text-pink-800">
                  Total : $ {total}
                </div>
              </div>
            </div>
            <div className=" col-span-8 w-7/12 mx-auto " >
              <DropIn
                options={{
                  authorization: "sandbox_mfttgwg8_kgytsnj4d49xs929",
                  paypal:{
                    flow:'vault'
                  },
          
                }}
              
                onInstance={(i) => setInstance(i)}
                onError={(err) => console.log(err)}
              />

              <button
                className=" bg-green-300 my-5 px-6 py-3 rounded-lg "
                onClick={handlePayment}
              >
                {loading ? "Loading..." : "Make Payment"}
              </button>
            </div>
          </>
        ) : (
          <div className=" text-center">
            <h2 className="mb-7">No Products in Cart !</h2>
            <NavLink to={`/`}>
              <button className=" bg-blue-300 px-6 py-3 rounded-lg ">
                Shop Now
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Payment;
