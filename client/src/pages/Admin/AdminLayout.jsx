import React from "react";
import { NavLink } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className=" p-5 w-screen grid grid-cols-12 gap-10 ">
      <div className=" col-span-3">
        <div className="flex flex-col gap-5 my-10">
            <NavLink to={'/admin/category'}>
          <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
            Category
          </div>
          </NavLink>
          <NavLink to={'/admin/product'}>
          <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
            Products
          </div>
          </NavLink>
          <NavLink to={'/admin/new-product'}>
          <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
            Add new Product
          </div>
          </NavLink>
          <NavLink to={'/admin/dashboard'}>
          <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
            DashBoard
          </div>
          </NavLink>
          <NavLink to={'/admin/orders'}>
          <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
            Orders
          </div>
          </NavLink>
        </div>
      </div>
      <div className=" col-span-9 my-10">{children}</div>
    </div>
  );
};

export default AdminLayout;
