import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";
import { AddProductApi, GetAllCategoryApi } from "../../services/api";

const AdminAddNewProduct = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [options, setOptions] = useState([]);

  const handleGetAllCategories = async () => {
    const res = await GetAllCategoryApi();
    setOptions(res?.category);
  };

  useEffect(()=>{
    handleGetAllCategories();
  },[])

  const handleAddProduct = async () => {
    const data = new FormData();
    data.append('name',name);
    data.append('description',description);
    data.append('price',price);
    data.append('category',category);
    data.append('photo',photo);
    const res = await AddProductApi(data);
    console.log(res);
    if (res?.product) {
      setName();
      setDescription();
      setPrice();
      setCategory();
      setPhoto();
      alert(res.msg);
    }
    alert(res.msg);
  };

  return (
    <Layout>
      <AdminLayout>
        <div className="">
          <h2 className=" text-3xl mb-5">Add New Product</h2>
          <div className="my-5">
            <input
              type="text"
              placeholder="Enter Product Name..."
              className=" w-7/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6 "
              onChange={(e) => setName(e.target.value)}
              value={name ? name : ''}
            />
          </div>
          <div className="my-5">
            <textarea
              cols={20}
              rows={3}
              placeholder="Enter Product Description..."
              className=" w-7/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6 "
              onChange={(e) => setDescription(e.target.value)}
              value={description ? description : ''}
            />
          </div>
          <div className="my-5">
            <input
              type="text"
              placeholder="Price..."
              className=" w-2/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6  "
              onChange={(e) => setPrice(e.target.value)}
              value={price ? price : ''}
            />
          </div>
          <div className="my-5">
            <select
              className="w-4/12 outline-none border-2 border-blue-400 py-2 px-3 hover:cursor-pointer "
              onChange={(e) => setCategory(e.target.value)}
              value={category ? category : ''}
            >
              <option value="">Select a Category</option>
              {
                options?.map((e)=>{
                  return(
                    <option value={e._id} key={e._id}>{e.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="my-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            
            />
          </div>
          <div className="my-5">
            <button
              className=" px-6 py-2 rounded-sm bg-green-200 hover:cursor-pointer hover:bg-red-200"
              onClick={()=>handleAddProduct()}
            >
              Add Product
            </button>
          </div>
          {photo ? (
            <div className="my-5">
              <h3 className=" pb-2 border-b-4 mb-5"> Image Preview</h3>
              <img
                src={photo ? URL.createObjectURL(photo) : ""}
                alt="image"
                width={"200px"}
                height={"auto"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminAddNewProduct;
