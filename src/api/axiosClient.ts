import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import apiConfig from "./apiConfig";

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Client-ID": apiConfig.clientID,
    Authorization: `Bearer ${apiConfig.authorization}`,
    "Content-Type": "text/plain",
  },
} as AxiosRequestConfig);

export default axiosClient;
