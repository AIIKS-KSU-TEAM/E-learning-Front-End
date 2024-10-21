import useToken from "@/composables/useToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const { accessToken } = useToken()

axiosInstance.interceptors.request.use((config) => {
  if (accessToken.value) {
    config.headers["Authorization"] = `Bearer ${accessToken.value}`;
  }
  return config;
});

export default axiosInstance;
