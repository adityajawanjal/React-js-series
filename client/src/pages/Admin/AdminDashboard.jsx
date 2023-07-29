import React from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {

  return (
    <Layout>
      <AdminLayout>
        <div>
          <table className=" border-2 border-red-500 w-full">
            <thead className=" bg-gray-100">
              <tr className=" border-b-2 border-red-600 ">
                <th className="py-3  text-left px-6 w-1/12">Sr.No</th>
                <th className="py-3 text-left px-6 w-2/12">Name</th>
                <th className="py-3 text-left px-6 w-3/12">Description</th>
                <th className="py-3 text-left px-6 w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b-2 border-red-600">
                <td className="py-3  text-left px-6 w-1/12">1. </td>
                <td className="py-3 text-left px-6 w-2/12">Name</td>
                <td className="py-3 text-left px-6 w-3/12">adi@gmail.com</td>
                <td className="py-3 text-left px-6 w-2/12">
                  <button className=" bg-red-300 px-3 py-2 hover:cursor-pointer">
                    Admin
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminDashboard;
