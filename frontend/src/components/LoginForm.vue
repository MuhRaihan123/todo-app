<template>
    <div class="card shadow-lg" style="max-width: 400px; margin: 0 auto;">
        <div class="text-card-body p-4">
        <h3 class="text-center mb-4">
            {{ isLogin ? 'login' : 'Register' }}
            </h3>


            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form @submit.prevent="handleSubmit">
                <div v-if="!isLogin" class="mb-3">
                <label class="form-label">Nama</label>
                <input v-model="form.name" type="text" class="form-control" required />
                </div>

                <div class="mb-3">
                   <label class="form-label">Email</label>
                   <input v-model="form.email" type="email" class="form-control" required />
                    </div>

                <div class="mb-4">
                    <label class="form-label">Password</label>
                    <input v-model="form.password" type="password" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>
      
      <hr class="my-4">
      
      <p class="text-center mb-0">
        {{ isLogin ? 'Belum punya akun?' : 'Sudah punya akun?' }}
        <a href="#" @click.prevent="isLogin = !isLogin" class="text-primary">
          {{ isLogin ? 'Register' : 'Login' }}
        </a>
      </p>
    </div>
  </div>
</template>
 
<script setup>
import { ref, reactive } from 'vue'
import { login, register } from '../services/api'
 
const emit = defineEmits(['success'])
 
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')
const form = reactive({ name: '', email: '', password: '' })
 
const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const action = isLogin.value ? login : register
    const response = await action(form)
    
    if (isLogin.value) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      emit('success', response.data.user)
    } else {
      isLogin.value = true
      error.value = ''
      alert('Registrasi berhasil! Silakan login.')
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}
</script>