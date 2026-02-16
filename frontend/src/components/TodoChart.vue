<template>
  <div class="card shadow-sm">
    <div class="card-header bg-white">
      <h6 class="mb-0">Statistik Todo</h6>
    </div>
    <div class="card-body">
      <canvas ref="chartRef" height="200"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  completed: { type: Number, default: 0 },
  pending: { type: Number, default: 0 }
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        data: [props.completed, props.pending],
        backgroundColor: ['#177567', '#ffc107']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  })
})

watch(() => [props.completed, props.pending], () => {
  if (chartInstance) {
    chartInstance.data.datasets[0].data = [
      props.completed,
      props.pending
    ]
    chartInstance.update()
  }
})
</script>
