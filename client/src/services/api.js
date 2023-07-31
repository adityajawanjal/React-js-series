import axios from "axios";

export const BACKEND_URL = `http://localhost:5000`;

const key = localStorage.getItem("token");
const token = JSON.parse(key);

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    Authorization: token ? token : "",
  },
});

export const SignupApi = async (e) => {
  try {
    const res = await API.post(`/auth/signup`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const LoginApi = async (e) => {
  try {
    const res = await API.post(`/auth/login`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const AdminProtectedApi = async () => {
  try {
    const res = await API.get(`/admin-protected`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const UserProtectedApi = async () => {
  try {
    const res = await API.get(`/user-protected`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const CreateCategoryApi = async (e) => {
  try {
    const res = await API.post(`/category`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetAllCategoryApi = async () => {
  try {
    const res = await API.get(`/category`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const UpdateCategoryApi = async ({ slug, e }) => {
  try {
    const res = await API.put(`/category/${slug}`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const DeleteCategoryApi = async (id) => {
  try {
    const res = await API.delete(`/category/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetAllProductsApi = async () => {
  try {
    const res = await API.get(`/products`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetSingleProductApi = async (slug) => {
  try {
    const res = await API.get(`/products/${slug}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const AddProductApi = async (e) => {
  try {
    const res = await API.post(`/products`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const UpdateProductApi = async ({ slug, e }) => {
  try {
    const res = await API.put(`/products/${slug}`, e);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const DeleteProductApi = async (id) => {
  try {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const ProductsFilterApi = async (data) => {
  try {
    const res = await API.post(`/products/filter`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const TotalProductsApi = async () => {
  try {
    const res = await API.get(`/products/total/count`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const ProductsPerPageApi = async (page) => {
  try {
    const res = await API.get(`/products/perpage/${page}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const ProductSearchApi = async (keyword) => {
  try {
    const res = await API.get(`/products/search/${keyword}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetPhotoApi = async (id) => {
  try {
    const res = await API.get(`/product/photo/${id}`, { responseType: "blob" });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const GetBraintreeToken = async (id) => {
  try {
    const res = await API.get(`/braintree/token`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const BraintreePayment = async (data) => {
  try {
    const res = await API.post(`/braintree/payment` , data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const AllOrders = async () => {
  try {
    const res = await API.get(`/orders`);
    return res.data;
  } catch (err) {
    return err;
  }
};
