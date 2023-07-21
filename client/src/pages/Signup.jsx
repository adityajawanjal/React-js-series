import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { SignupApi } from "../services/api";
import { useToken } from "../services/AppProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {setToken , token , setUser} = useToken();

  const handleSignup = async () => {
    const data = {
      name,
      email,
      password,
    };
    const res = await SignupApi(data);
    if (res?.token) {
      const key = JSON.stringify(res.token);
      const user = JSON.stringify(res.user);
      localStorage.setItem("token", key);
      localStorage.setItem("user", user);
      setToken(res?.token);
      setUser(res?.user);
      alert(res.msg);
      navigate('/');
    }
    alert(res.msg);
  };

  useEffect(()=>{ 
    if(token){
      navigate("/");
    }
   },[])

  return (
    <Layout>
      <div className=" flex w-7/12 my-10 py-10 px-5 border-2 border-gray-600 rounded-3xl shadow-slate-600 shadow-2xl mx-auto">
        <div className="flex justify-center self-center items-center flex-col gap-7 w-full">
          <h3 className=" text-5xl italic mb-5 pb-5 border-b-2 border-black">
            Sign Up
          </h3>
          <div className=" flex justify-center w-full">
            <input
              type="text"
              placeholder="Enter Name..."
              className="w-7/12 outline-none border-2 border-blue-400 h-10 px-4 py-5 text-lg rounded-lg"
              onChange={(e) => setName(e.target.value)}
              value={name ? name : ""}
            />
          </div>
          <div className=" flex justify-center w-full">
            <input
              type="email"
              placeholder="Enter Email..."
              className="w-7/12 outline-none border-2 border-blue-400 h-10 px-4 py-5 text-lg rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email ? email : ""}
            />
          </div>
          <div className=" flex justify-center w-full">
            <input
              type="password"
              placeholder="Enter Password..."
              className="w-7/12 outline-none border-2 border-blue-400 h-10 px-4 py-5 text-lg rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              value={password ? password : ""}
            />
          </div>
          <div className=" flex justify-center w-full">
            <button
              className=" bg-green-400 hover:cursor-pointer hover:bg-orange-400 w-7/12  text-xl py-3 rounded-full"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
          <div>
            <span>Already have an account ? </span>
            <span className=" pb-1 text-red-600 text-xl border-b-2 border-blue-500">
              <NavLink to={"/login"}>Login</NavLink>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
