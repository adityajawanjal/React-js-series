import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminProtected from "./pages/Admin/AdminProtected";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCategory from "./pages/Admin/AdminCategory";
import UserProtected from "./pages/User/UserProtected";
import UserOrders from "./pages/User/UserOrders";
import UserDashboard from "./pages/User/UserDashboard";
import AdminAddNewProduct from "./pages/Admin/AdminAddNewProduct";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUpdateProduct from "./pages/Admin/AdminUpdateProduct";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Payment from "./pages/Payment";
import AdminOrders from "./pages/Admin/AdminOrders";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:slug" element={<SingleProduct />} />
          <Route exact path="/products/search/:keyword" element={<Search />} />
          <Route path="/admin" element={<AdminProtected />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="category" element={<AdminCategory />} />
            <Route path="product" element={<AdminProducts />} />
            <Route path="product/:slug" element={<AdminUpdateProduct />} />
            <Route path="new-product" element={<AdminAddNewProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route path="/user" element={<UserProtected />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
