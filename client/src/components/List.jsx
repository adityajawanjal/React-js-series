import React from "react";
import axios from "axios";
import { useUsers } from "../services/AppProvider";
import { BASE_URL } from "../main";

const List = () => {
  const { users, setUsers, setUser } = useUsers();

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      const res = await axios.get(`${BASE_URL}`);
      setUsers(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleUser = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-10/12 mx-auto my-10 table-auto border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 text-left text-gray-600">Sr. No</th>
            <th className="px-4 py-3 text-left text-gray-600">Name</th>
            <th className="px-4 py-3 text-left text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-gray-600">Edit</th>
            <th className="px-4 py-3 text-left text-gray-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((e, i) => {
            return (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-3  font-medium text-gray-900">
                  {i + 1}{" "}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {e.name}
                </td>
                <td className="px-4 py-3  text-gray-600">{e.email}</td>
                <td
                  className="px-4 py-3  text-gray-600"
                  onClick={() => getSingleUser(e.id)}
                >
                  <button className=" px-5 py-2 rounded-3xl bg-blue-300 hover:bg-red-300">Edit</button>
                </td>
                <td
                  className="px-4 py-3  text-gray-600"
                  onClick={() => deleteUser(e.id)}
                >
                  <button className=" px-5 py-2 rounded-3xl bg-blue-300 hover:bg-red-300">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
