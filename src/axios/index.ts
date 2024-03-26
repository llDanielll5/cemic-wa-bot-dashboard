import axios from "axios";
export const serverUrl = process.env.SERVER_URL;

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: serverUrl });
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || `Ocorreu um erro ${error}`
    )
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.baseURL = serverUrl;
    config.headers.Authorization = `Bearer ${process.env.STRAPI_KEY_ACCESS}`;
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
