import axios from "axios";
import { server_url } from "../constants";
import { logout } from "../Modules/Auth/reducers/authSlice";

const axiosInstance = axios.create({
  baseURL: server_url,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("this error===>", error);

      if (error.response && error.response.status === 401) {
        store.dispatch(logout({ redirect: true }));
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
