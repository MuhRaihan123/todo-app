<template>
  <li class="list-group-item d-flex align-items-center justify-content-between">
    
    <!-- Checkbox -->
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="form-check-input me-3"
      style="transform: scale(1.3);"
    />

    <!-- Content -->
    <div class="flex-grow-1">
      <span
        :class="{
          'text-decoration-line-through text-muted': todo.completed
        }"
      >
        {{ todo.title }}
      </span>
      <br />
      <small class="text-muted">
        <i class="bi bi-clock me-1"></i>
        {{ formatDate(todo.createdAt) }}
      </small>
    </div>

    <!-- Priority Badge -->
    <span :class="['badge', badgeClass]" class="me-3">
      {{ todo.priority }}
    </span>

    <!-- Delete Button -->
    <button
      @click="$emit('delete', todo.id)"
      class="btn btn-outline-danger btn-sm"
    >
      <i class="bi bi-trash"></i>
    </button>

  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'delete'])

const badgeClass = computed(() => {
  const classes = {
    low: 'bg-success',
    medium: 'bg-warning text-dark',
    high: 'bg-danger'
  }
  return classes[props.todo.priority] || 'bg-secondary'
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.list-group-item:hover {
  background-color: #f8f9fa;
}

.form-check-input {
  cursor: pointer;
}
</style>
