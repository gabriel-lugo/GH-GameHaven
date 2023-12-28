import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
     Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    'Client-ID': apiConfig.clientID,
    'Authorization': `Bearer ${apiConfig.authorization}`,
    "Content-Type": "application/json",
  },
//   params: {
//     api_key: apiConfig.apiKey,
//   },
} as AxiosRequestConfig);

// fields name,summary;
// where name = "Super Mario Bros. Wonder";


// axiosClient.interceptors.request.use(async (config) => config);

export const marioTest = async () => {
    const endpoint = "games";
    const body = `fields name, summary; where name = "Super Mario Bros. Wonder";`;
  
    try {
      const response = await axiosClient.post(endpoint, body);
      console.log(response);
    } catch (error) {
      console.error('Error making request:', error);
    }
  }


export default axiosClient;