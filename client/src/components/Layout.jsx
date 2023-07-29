import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Layout = ({ children , title , description , keywords  }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="description"
          content={description}
        />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Aditya Jawanjal" />
      </Helmet>
      <div className=" flex flex-col justify-between min-h-screen overflow-x-hidden">
        <div>
          <nav className=" bg-green-200 h-24">
            <Navbar />
          </nav>
          <main>{children}</main>
        </div>
        <footer className=" bg-blue-200 h-28 w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
};

Layout.defaultProps = {
  title:'Shoppy Karo !',
  description:'Amazing shopping website.',
  keywords:'mern , react , ecommerce'
}

export default Layout;
