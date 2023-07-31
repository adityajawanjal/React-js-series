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
  productsFilter,
  productsPerPage,
  totalNoOfProducts,
  searchProduct,
  similarproducts,
} = require("./controllers/product-controller");
const formidable = require("express-formidable");
const { braintreeToken, braintreePayment, allOrders } = require("./controllers/order-controller");

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
router.post(`/products/filter`, productsFilter);
router.get(`/products/total/count`, totalNoOfProducts);
router.get(`/products/perpage/:page`, productsPerPage);
router.get(`/products/search/:keyword`, searchProduct);

router.get(`/product/photo/:id`, auth, admin, getProductPhoto);

router.get(`/braintree/token` ,auth, braintreeToken);
router.post(`/braintree/payment` , auth , braintreePayment);

router.get(`/orders` , auth ,admin, allOrders);

module.exports = router;
