import axios from "axios";
import { storage } from "./storage";
import { IInitialRegistration, ILogin, IProducts } from "@interfaces/index";

const url = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({ baseURL: url });

axiosClient.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${storage.getToken()}`;
  return config;
});

const login = (payload: ILogin) => {
  const axiosLogin = axios.create({ baseURL: url });
  return axiosLogin.post("/user/signin", payload);
};

const createUser = (payload: IInitialRegistration) => {
  return axiosClient.post("/users", payload);
};

const createUserProduct = (payload: IProducts) => {
  return axiosClient.post("/products", payload);
};

const editProduct = (payload: IProducts, productId: string) => {
  return axiosClient.put(`/products/${productId}`, payload);
};

export const client = {
  login,
  createUser,
  createUserProduct,
  editProduct,
  delete: axiosClient.delete,
  get: axiosClient.get,
  post: axiosClient.post,
  put: axiosClient.put,
  patch: axiosClient.patch,
};
