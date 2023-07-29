import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { ProductSearchApi } from "../services/api";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  const fetchSearchDetails = async () => {
    const res = await ProductSearchApi(params.keyword);
    if (res?.products) {
      if (res.products.length > 0) {
        setProducts(res.products);
      }
    }
  };

  useEffect(() => {
    fetchSearchDetails();
  }, []);

  return (
    <Layout>
      <div className=" my-5 mx-5 flex flex-wrap">
        {products ? (
          products.length > 0 ? (
            products.map((e) => {
              return <ProductCard key={e._id} e={e} remove={false} />;
            })
          ) : (
            <div className=" text-center text-2xl">No Product Found !</div>
          )
        ) : (
          <div className=" text-center text-2xl">No Product Found !</div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
