const express = require("express");
const {
  signup,
  login,
  adminProtected,
  userProtected,
} = require("./controllers/user-controller");
const { auth, admin } = require("./middlewares/auth");
const {
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers/category-controller");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductPhoto,
} = require("./controllers/product-controller");
const formidable = require("express-formidable");

const router = express.Router();

router.post(`/auth/signup`, signup);
router.post(`/auth/login`, login);

router.get(`/user-protected`, auth, userProtected);
router.get(`/admin-protected`, auth, admin, adminProtected);

router.get(`/category`, getAllCategory);
router.post(`/category`, auth, admin, addCategory);
router.put(`/category/:slug`, auth, admin, updateCategory);
router.delete(`/category/:id`, auth, admin, deleteCategory);

router.get(`/products`, getAllProducts);
router.get(`/products/:slug`, getSingleProduct);
router.post(`/products`, auth, admin, formidable(), addProduct);
router.put(`/products/:slug`, auth, admin, formidable(), updateProduct);
router.delete(`/products/:id`, auth, admin, deleteProduct);

router.get(`/product/photo/:id`, auth, admin, getProductPhoto);

module.exports = router;
