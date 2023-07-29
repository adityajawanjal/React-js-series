import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { GetPhotoApi, GetSingleProductApi } from "../services/api";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [pic, setPic] = useState();

  const params = useParams();

  const fetchPhoto = async (id) => {
    const res = await GetPhotoApi(id);
    const url = URL.createObjectURL(res);
    setPic(url);
  };

  const fetchProductDetails = async () => {
    const res = await GetSingleProductApi(params.slug);
    if (res?.product) {
      setProduct(res.product);
      fetchPhoto(res.product._id);
      return;
    }
    alert(res.msg);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <Layout>
      <div className="flex w-7/12 mx-auto">
        <img src={pic ? pic : ""} alt="picture" className=" w-96 h-auto" />
        <div className=" m-10 flex flex-col">
          <h3 className="mb-5 text-4xl font-semibold text-orange-300">{product?.name}</h3>
          <p className="mb-5 text-2xl underline">{product?.category.name}</p>
          
          <p className="mb-5">{product?.description}</p>
          <div className="flex mb-5">
            <button className=" bg-blue-300 px-3 py-2 mr-2 ">
              Price : ${product?.price}
            </button>
            <button className=" bg-red-300 px-3 py-2 hover:cursor-pointer hover:bg-green-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
