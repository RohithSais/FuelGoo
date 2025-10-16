// src/services/api.js

import axios from 'axios';

// The base URL should just be the server address
const API_URL = 'http://10.0.2.2:5000';

const api = axios.create({
  baseURL: API_URL,
});

export default api;