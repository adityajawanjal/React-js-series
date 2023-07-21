import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";
import { DeleteProductApi, GetAllProductsApi } from "../../services/api";
import { NavLink, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleGetAllProducts = async () => {
    const res = await GetAllProductsApi();
    setProducts(res?.products);
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleDeleteProduct = async (id) =>{
    const res = await DeleteProductApi(id);
    handleGetAllProducts();
    alert(res?.msg);
  }
  return (
    <Layout>
      <AdminLayout>
        <div className="">
          <table className=" border-2 border-red-500 w-full">
            <thead className=" bg-gray-100">
              <tr className=" border-b-2 border-red-600 w-full">
                <th className="py-3  text-left px-6 w-1/12">Sr.No</th>
                <th className="py-3 text-left px-6 w-3/12">Name</th>
                <th className="py-3 text-left px-6 w-5/12">Description</th>
                <th className="py-3 text-left px-6 w-1/12">Price</th>
                <th className="py-3 text-left px-6 w-1/12">Edit</th>
                <th className="py-3 text-left px-6 w-1/12">Delete</th>
            
              </tr>
            </thead>
            <tbody>
              {products?.map((e, i) => {
                return (
                  <tr
                    className=" w-full hover:cursor-pointer hover:bg-green-100"
                    key={e._id}
                  >
                    <td className="py-3  text-left px-6 w-1/12">{i + 1}. </td>
                    <td className="py-3 text-left px-6 w-3/12">{e.name}</td>
                    <td className="py-3 text-left px-6 w-5/12">
                      {e.description}
                    </td>
                    <td className="py-3 text-left px-6 w-1/12">{e.price}</td>
                    
                    <td className="py-3 text-left px-6 w-1/12"><NavLink to={`/admin/product/${e.slug}`}>Edit</NavLink></td>
                    
                    <td className="py-3 text-left px-6 w-1/12" onClick={()=>handleDeleteProduct(e._id)}>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminProducts;
