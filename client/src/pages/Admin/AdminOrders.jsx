import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminLayout from "./AdminLayout";
import { AllOrders } from "../../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await AllOrders();
    if(res?.orders){
        console.log(res.orders);
        setOrders(res.orders);
        return;
    }
    alert(res.msg);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout>
      <AdminLayout>
        <div className="">
          <table className=" border-2 border-red-500 w-full">
            <thead className=" bg-gray-100">
              <tr className=" border-b-2 border-red-600 w-full">
                <th className="py-3  text-left px-6 w-1/12">Sr.No</th>
                <th className="py-3 text-left px-6 w-3/12">Email</th>
                <th className="py-3 text-left px-6 w-5/12">Description</th>
                <th className="py-3 text-left px-6 w-1/12">Amount</th>
                <th className="py-3 text-left px-6 w-1/12">Edit</th>
                <th className="py-3 text-left px-6 w-1/12">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((e, i) => {
                return (
                  <tr
                    className=" w-full hover:cursor-pointer hover:bg-green-100"
                    key={e._id}
                  >
                    <td className="py-3  text-left px-6 w-1/12">{i + 1}. </td>
                    <td className="py-3 text-left px-6 w-3/12">{e.buyer.email}</td>
                    <td className="py-3 text-left px-6 w-5/12">
                      {e.products.map((p)=>{
                        return (
                          <div
                            key={parseFloat._id}
                            className=" mx-2 flex justify-between"
                          >
                            <span>
                              {p.name > 20
                                ? `${p.name.substring(0, 20)}...`
                                : p.name}
                            </span>
                            <span>{`$ ${p.price} X ${e.payment.transaction.amount/p.price}`}</span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-3 text-left px-6 w-1/12">{`$ ${e.payment.transaction.amount}`}</td>

                    <td className="py-3 text-left px-6 w-1/12">
                      Edit
                    </td>

                    <td className="py-3 text-left px-6 w-1/12">Delete</td>
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

export default AdminOrders;
