<template>
  <div class="card shadow-sm">
    <!-- Header -->
    <div class="card-header bg-white d-flex justify-content-between align-items-center">
      <div>
        <h5 class="mb-0">
          <i class="bi bi-list-check me-2"></i>
          Daftar Todo
        </h5>
        <small class="text-muted">
          {{ activeCount }} aktif, {{ completedCount }} selesai
        </small>
      </div>
      
      <!-- Filter Buttons -->
      <div class="btn-group btn-group-sm">
        <button
          v-for="f in ['All', 'Active', 'Done']"
          :key="f"
          @click="filter = f"
          :class="{ active: filter === f }"
          class="btn btn-outline-primary"
        >
          {{ f }}
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="card-body text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-2 mb-0">Memuat data...</p>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="filteredTodos.length === 0" class="card-body text-center py-5">
      <i class="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
      <p class="text-muted mb-0">{{ emptyMessage }}</p>
    </div>
    
    <!-- Todo Items -->
    <ul v-else class="list-group list-group-flush">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle', $event)"
        @delete="$emit('delete', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'

// Props
const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  },
  loading: Boolean
})

// Emit
defineEmits(['toggle', 'delete'])

// State
const filter = ref('All')

// Computed
const filteredTodos = computed(() => {
  if (filter.value === 'Active') {
    return props.todos.filter(t => !t.completed)
  }
  if (filter.value === 'Done') {
    return props.todos.filter(t => t.completed)
  }
  return props.todos
})

const activeCount = computed(() => 
  props.todos.filter(t => !t.completed).length
)

const completedCount = computed(() => 
  props.todos.filter(t => t.completed).length
)

const emptyMessage = computed(() => {
  if (filter.value === 'Active') return 'Tidak ada todo aktif 🎉'
  if (filter.value === 'Done') return 'Belum ada yang selesai 💪'
  return 'Belum ada todo. Tambahkan satu!'
})
</script>