import axios from "axios";


const axiosClient = axios.create({
  baseURL: 'https://bkmotel-api.onrender.com',
});



export default axiosClient;
