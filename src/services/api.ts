// src/services/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000', // Ajusta según tu backend
  headers: {
    'Content-Type': 'application/json',
  },
})


