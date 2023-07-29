import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";
import { useParams } from "react-router-dom";
import { GetAllCategoryApi, GetPhotoApi, GetSingleProductApi, UpdateProductApi } from "../../services/api";

const AdminUpdateProduct = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [options, setOptions] = useState([]);
  const [id, setId] = useState();
  const [pic, setPic] = useState();

  const handleGetAllCategories = async () => {
    const res = await GetAllCategoryApi();
    setOptions(res?.category);
  };


  const params = useParams();

  const handleGetSingleProduct = async () => {
    const res = await GetSingleProductApi(params?.slug);
    if (res?.product) {
      setName(res.product.name);
      setDescription(res.product.description);
      setPrice(res.product.price);
      setCategory(res.product.category);
      setId(res.product._id);
    }
  };

  const handleGetSinglePhoto = async () =>{
    const res = await GetPhotoApi(id);
    const url = URL.createObjectURL(res);
    setPic(url);
  }

  useEffect(()=>{
    if(id){
      handleGetSinglePhoto();
    }
  },[id])

  useEffect(() => {
    handleGetSingleProduct();
    handleGetAllCategories();
  }, []);

  const handleUpdateProduct = async() => {
    const data = new FormData();
    data.append('name',name);
    data.append('description',description);
    data.append('price',price);
    data.append('category', category);
    data.append('photo',photo);
    const res = await UpdateProductApi({slug:params.slug , e:data});
    if(res?.product){
      alert(res.msg);
    }
    alert(res.msg);
  };

  return (
    <Layout>
      <AdminLayout>
        <div className="">
          <h2 className=" text-3xl mb-5">Update Product</h2>
          <div className="my-5">
            <input
              type="text"
              placeholder="Enter Product Name..."
              className=" w-7/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6 "
              onChange={(e) => setName(e.target.value)}
              value={name ? name : ""}
            />
          </div>
          <div className="my-5">
            <textarea
              cols={20}
              rows={3}
              placeholder="Enter Product Description..."
              className=" w-7/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6 "
              onChange={(e) => setDescription(e.target.value)}
              value={description ? description : ""}
            />
          </div>
          <div className="my-5">
            <input
              type="text"
              placeholder="Price..."
              className=" w-2/12 py-2 text-lg outline-none border-2 border-blue-400 rounded-lg px-6  "
              onChange={(e) => setPrice(e.target.value)}
              value={price ? price : ""}
            />
          </div>
          <div className="my-5">
            <select
              className="w-4/12 outline-none border-2 border-blue-400 py-2 px-3 hover:cursor-pointer "
              onChange={(e) => setCategory(e.target.value)}
              value={category ? category._id : ""}
            >
              <option value={category ? category._id : ""}>
                {category ? category.name : ""}
              </option>
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
              onClick={handleUpdateProduct}
            >
              Update Product
            </button>
          </div>
         
            <div className="my-5">
              <h3 className=" pb-2 border-b-4 mb-5"> Image Preview</h3>
              <img
                src={photo ? URL.createObjectURL(photo) : pic ? pic : ''}
                alt="image"
                width={"200px"}
                height={"auto"}
              />
            </div>
          
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminUpdateProduct;
