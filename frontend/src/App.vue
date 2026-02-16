<template>
  <div class="min-vh-100 bg-light py-5">
    <div class="container" style="max-width: 800px;">
      <!-- Jika belum login -->
      <div v-if="!user">
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold">
            <i class="bi bi-check-circle-fill text-primary me-3"></i>
            Todo App
          </h1>
        </div>
        <LoginForm @success="handleLogin" />
      </div>
      
      <!-- Jika sudah login -->
      <div v-else>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 mb-0">
            <i class="bi bi-check-circle-fill text-primary me-2"></i>
            Halo, {{ user.name }}!
          </h1>
          <button @click="logout" class="btn btn-outline-danger btn-sm">
            <i class="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        </div>
        
        <TodoForm :loading="adding" @add="addTodo" />
        <TodoList :todos="todos" :loading="loading" @toggle="toggleTodo" @delete="deleteTodo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoginForm from './components/LoginForm.vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { getTodos, createTodo, updateTodo, deleteTodo as apiDeleteTodo } from './services/api'

const user = ref(null)
const todos = ref([])
const loading = ref(false)
const adding = ref(false)

// Check if already logged in
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    fetchTodos()
  }
})

const handleLogin = (userData) => {
  user.value = userData
  fetchTodos()
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  user.value = null
  todos.value = []
}

const fetchTodos = async () => {
  loading.value = true
  try {
    const response = await getTodos()
    todos.value = response.data.data
  } finally {
    loading.value = false
  }
}

// ... addTodo, toggleTodo, deleteTodo sama seperti sebelumnya
</script>