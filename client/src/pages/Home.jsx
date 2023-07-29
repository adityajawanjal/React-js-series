import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { Prices } from "../components/Prices";
import {
  GetAllCategoryApi,
  ProductsFilterApi,
  ProductsPerPageApi,
  TotalProductsApi,
} from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [range, setRange] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchProducts = async () => {
    setLoading(true);
    const res = await ProductsPerPageApi(page);
    setLoading(false);
    setProducts( [...products , ...res?.products]);
  };

  const fetchTotal = async () => {
    const res = await TotalProductsApi();
    setTotal(res?.total);
  };

  const fetchAllCategories = async () => {
    const res = await GetAllCategoryApi();
    setCategories(res?.category);
  };

  const filterProducts = async () => {
    setLoading(true);
    const data = {
      checked,
      range,
    };
    const res = await ProductsFilterApi(data);
    if (res?.products) {
      setLoading(false);
      console.log(res.products);
      if (res.products.length < 1) {
        setProducts([]);
      } else {
        setProducts(res.products);
      }
    } else {
      setLoading(false);
      alert(res?.msg);
    }
  };

  const handleCategoryCheckbox = ({ e, id }) => {
    console.log(e, id);
    let all = [...checked];
    if (e) {
      all.push(id);
    } else {
      all = all.filter((e) => e !== id);
    }
    setChecked(all);
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchAllCategories();
    fetchProducts();
    fetchTotal();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    if (checked.length || range) {
      filterProducts();
    }
  }, [checked.length, range]);

  return (
    <Layout title={"Shoppy Karo ! Home "}>
      <div className="grid grid-flow-col gap-10 ">
        <div className=" col-span-3 border-2 border-red-600 p-4 rounded-3xl mx-1 my-5">
          <h3 className=" text-2xl text-center my-2 font-semibold">
            Search by Category
          </h3>
          <div className="my-2 p-4">
            {categories?.map((c) => {
              return (
                <div key={c._id} className="my-1">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className=" h-5 w-5"
                      onChange={(e) =>
                        handleCategoryCheckbox({
                          e: e.target.checked,
                          id: c._id,
                        })
                      }
                    />
                    <span className="text-gray-800">{c.name}</span>
                  </label>
                </div>
              );
            })}
            <div className="my-2 p-4 space-y-4">
              <h3 className=" text-2xl text-center my-2 font-semibold">
                Sort by Price
              </h3>
              {Prices?.map((e) => {
                return (
                  <div key={e.id}>
                    <label className=" flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="range"
                        value={e.array}
                        className=" h-5 w-5 text-blue-500"
                        onChange={(e) => {
                          setRange(e.target.value);
                        }}
                      />
                      <span className="text-gray-800">{e.name}</span>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="my-3 text-center">
              <button
                className=" bg-red-300 px-3 py-2 mr-2 "
                onClick={handleReset}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className=" my-5 col-span-9 ">
          {loading ? (
            <div className=" text-5xl">Loading...</div>
          ) : (
            <div className="flex flex-wrap">
              {products ? (
                products.length > 0 ? (
                  products.map((e) => {
                    return <ProductCard key={e._id} e={e} remove={false} />;
                  })
                ) : (
                  <div className=" text-5xl">No Product Found</div>
                )
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      {products && products.length < total && (
        <div className="my-4 text-center">
          <button
            className=" bg-green-300 px-6 py-3 rounded-xl text-xl mr-2 "
            onClick={() => setPage(page + 1)}
          >
            Load More...
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Home;
