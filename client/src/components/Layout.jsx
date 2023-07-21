import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className=" flex flex-col justify-between min-h-screen overflow-x-hidden">
      <div>
      <nav className=" bg-green-200 h-24">
        <Navbar />
      </nav>
      <main >{children}</main>
      </div>
      <footer className=" bg-blue-200 h-28 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
