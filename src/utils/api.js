import axios from "axios";


const api = axios.create({
  // baseURL:'https://pzmmapi.a10s.in/api/',
  baseURL:'http://localhost:5001/api/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});


export default api;
