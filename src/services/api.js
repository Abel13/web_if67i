import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:3333",
});

axios.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
