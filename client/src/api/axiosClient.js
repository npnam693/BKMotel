import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.BKMOTEL_APP_API_URL,
});

export const get = async (path, options = {}) => {
  const response = await axiosClient.get(path, options);
  return response.data;
};

export default axiosClient;
