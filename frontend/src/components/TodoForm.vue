<template>
    <div class="card shadow-sm mb-4">
    <div class="card-body">
    <form @submit.prevent="handleSubmit" class="row g-3">
    <!-- Input Title -->
    <div class="col-md-7">
    <input  
        v-model="title"
            type="text"
            class="form-control form-control-lg"
            placeholder="Apa yang ingin Anda kerjakan?"
            required
          />
        </div>
<!-- Select Priority -->
        <div class="col-md-3">
          <select v-model="priority" class="form-select form-select-lg">
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
        
        <!-- Submit Button -->
        <div class="col-md-2">
          <button 
            type="submit" 
            class="btn btn-primary btn-lg w-100"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <i v-else class="bi bi-plus-lg"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
 
// Props
const props = defineProps({
  loading: Boolean
})
 
// Emit events ke parent
const emit = defineEmits(['add'])
 
// State
const title = ref('')
const priority = ref('medium')
 
// Method
const handleSubmit = () => {
  if (!title.value.trim()) return
  
  // Emit event dengan data
  emit('add', {
    title: title.value,
    priority: priority.value
  })
  
  // Reset form
  title.value = ''
  priority.value = 'medium'
}
</script>





