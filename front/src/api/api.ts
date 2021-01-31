import axios from 'axios';
import { apiURL } from './constants';

const api = axios.create({
  baseURL: apiURL,
});

export default api;
