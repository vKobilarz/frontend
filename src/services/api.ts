import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-solidaria.herokuapp.com',
});

export default api;
