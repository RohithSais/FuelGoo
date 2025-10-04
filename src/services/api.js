// src/services/api.js

import axios from 'axios';

// The special IP address for the Android emulator to connect to your host machine's localhost
const API_URL = 'http://10.0.2.2:5000/api/users';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
