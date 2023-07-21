import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";
import { CreateCategoryApi, DeleteCategoryApi, GetAllCategoryApi, UpdateCategoryApi } from "../../services/api";

const AdminCategory = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleGetAllCategories = async () => {
    const res = await GetAllCategoryApi();
    setCategories(res?.category);
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const handleCreateCategory = async () => {
    const data = {
      name: name,
    };
    const res = await CreateCategoryApi(data);
    if (res.category) {
      setName();
      handleGetAllCategories();
      alert(res.msg);
    }
    alert(res.msg);
  };

  const handleEditCategory = (e) =>{
    setSelectedCategory(e);
    setEdit(true);
    setName(e?.name);
  }

  const handleUpdateCategory = async () =>{
    const data = {
      name: name,
    };
    const res = await UpdateCategoryApi({slug:selectedCategory?.slug , e:data});
    if (res.category) {
      setName();
      setEdit(false);
      handleGetAllCategories();
      alert(res.msg);
    }
    alert(res.msg);
  }

  const handleDeleteCategory = async (id) =>{
    const res = await DeleteCategoryApi(id);
    handleGetAllCategories();
    alert(res?.msg);
  }

  return (
    <Layout>
      <AdminLayout>
        <div className=" grid grid-cols-12 gap-5">
          <div className=" col-span-5 flex flex-col mx-20 mb-16">
            <h2 className=" text-3xl font-bold mb-10 underline-offset-8 underline ">
              Add new Category
            </h2>
            <div className=" mb-8">
              <input
                type="text"
                placeholder="Enter Category name ..."
                className=" px-4 py-2 text-lg border-2 border-blue-400 outline-none"
                onChange={(e) => setName(e.target.value)}
                value={name ? name : ""}
              />
            </div>
            <button
              className=" bg-blue-300 w-60 h-10 hover:cursor-pointer hover:bg-green-300 rounded-lg "
              onClick={edit ? ()=>handleUpdateCategory() : ()=>handleCreateCategory()}
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
          <div className=" col-span-7">
            <table className=" border-2 border-red-500">
              <thead className=" bg-gray-100">
                <tr className=" border-b-2 border-red-600 w-full">
                  <th className="py-3  text-left px-6 w-2/12">Sr.No</th>
                  <th className="py-3 text-left px-6 w-6/12">Name</th>
                  <th className="py-3 text-left px-6 w-2/12">Edit</th>
                  <th className="py-3 text-left px-6 w-2/12">Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((e, i) => {
                  return (
                    <tr
                      className=" hover:bg-green-100 cursor-pointer"
                      key={e._id}
                    >
                      <td className="py-3 px-6 text-left">{i + 1}. </td>
                      <td className="py-3 px-6 text-left">{e.name}</td>
                      <td className="py-3 px-6 text-left" onClick={()=>handleEditCategory(e)}>edit</td>
                      <td className="py-3 px-6 text-left" onClick={()=>handleDeleteCategory(e._id)}>delete</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminCategory;
