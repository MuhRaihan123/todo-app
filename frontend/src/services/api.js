import axios from 'axios'

// Gunakan environment variable atau fallback ke localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000
})

// Interceptor: tambahkan token ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

// ===== AUTH API =====
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)

// ===== TODO API =====
export const getTodos = () => api.get('/todos')
export const createTodo = (data) => api.post('/todos', data)
export const updateTodo = (id, data) => api.put('/todos/' + id, data)
export const deleteTodo = (id) => api.delete('/todos/' + id)

export default api