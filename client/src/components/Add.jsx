import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUsers } from "../services/AppProvider";
import { BASE_URL } from "../main";

const Add = () => {
  const {user , setUsers , setUser} = useUsers();

  const [name , setName] = useState('');
  const [email , setEmail] = useState('');

  useEffect(()=>{
    if(user){
      setName(user.name);
    setEmail(user.email);
    }
  },[user])

  const updateUser = async() =>{
    const data = {
      name:name,
      email:email
    }
    try {
      await axios.put(`${BASE_URL}/${user.id}`,data);
      setName('');
      setEmail('');
      setUser();
      const res = await axios.get(`${BASE_URL}`);
      setUsers(res?.data);
    } catch (err) {
      console.log(err);
    }

  }

  const addUser = async () =>{
    const data = {
      name:name,
      email:email
    }
    try {
      await axios.post(`${BASE_URL}`,data);
      setName('');
      setEmail('');
      const res = await axios.get(`${BASE_URL}`);
      setUsers(res?.data);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className=" w-10/12 mx-auto mt-8 px-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border border-blue-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your Name"
            onChange={(e)=>setName(e.target.value)}
            value={ name ? name : ''}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border  border-blue-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
            value={ email ? email : ''}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={user ? updateUser : addUser}
          >
            {user ? "Update " : `Add Person`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
