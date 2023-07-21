import React from "react";
import { NavLink } from "react-router-dom";

const UserLayout = ({ children }) => {
  return (
    <div className=" p-5 w-screen grid grid-cols-12 gap-10">
      <div className=" col-span-3">
        <div className="flex flex-col gap-5 my-10">
          <NavLink to={"/user/orders"}>
            <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
              Orders
            </div>
          </NavLink>
          <NavLink to={"/user/dashboard"}>
            <div className=" border border-gray-500 rounded-2xl px-6 py-3 text-xl">
              DashBoard
            </div>
          </NavLink>
        </div>
      </div>
      <div className=" col-span-9 my-10">{children}</div>
    </div>
  );
};

export default UserLayout;
