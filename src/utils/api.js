import axios from "axios";


const api = axios.create({
  baseURL:'http://localhost:5001/api/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});


export default api;
