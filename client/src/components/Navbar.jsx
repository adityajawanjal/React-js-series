import React from "react";
import {NavLink, useNavigate  } from "react-router-dom";
import { useToken } from "../services/AppProvider";

const Navbar = () => {
  const {token , setToken , setUser , user} = useToken();
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.clear();
    setToken();
    setUser();
    navigate('/login');
  }
  return (
    <div className=" flex items-center justify-between mx-10 h-full">
      <div className="flex items-center gap-5">
        <span className=" text-6xl">🛒</span>
        <h2 className=" inline text-3xl italic font-bold">Shoppy</h2>
      </div>
      <div className="flex items-center gap-5 text-xl">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/about'}>About</NavLink>
        {
          token ? <>
          <NavLink to={`${user?.admin === true ? `/admin` : `/user`}/dashboard`}>Dashboard</NavLink>
          {/* <select >Aditya <span>🔽</span></select> */}
          <button onClick={handleLogout}>Logout</button>
          </> : <>
           <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/signup'}>Sign Up</NavLink>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;
