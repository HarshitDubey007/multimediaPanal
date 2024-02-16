import axios from "axios";


const api = axios.create({
  baseURL:'https://pzmmapi.a10s.in/api/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});


export default api;
