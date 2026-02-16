<template>
 <section class="py-5">
   <div class="container py-5">
     <div class="text-center mb-5">
       <h2 class="display-6 fw-bold">Features</h2>
       <p class="text-muted">Everything you need to stay productive</p>
       </div>

       <div class="row g-4">
          <div v-for="feature in feature" :key="feature.icon" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm text-center p-4">
          <i :class="feature.icon + ' text-primary mb-3'" style="font-size: ;"></i>
          <h5>{{ feature.title }}</h5>
          <p class="text-muted mb-0">{{ feature.description }}</p>
          </div>
          </div>
          </div>
          </div>
          </section>
          </template>

          <script setup>
          import { ref, onMounted } from 'vue'
          import api from '../../services/api'

          const features = ref([
            { icon: 'bi-check-circle', title: 'Easy to Use', description: 'Simple and intuitive interface'},
            { icon: 'bi-shield-check', title: 'secure', description: 'your data is encrypted' },
            { icon: 'bi-phone', title: 'Responve', description: 'Works on all devices' }
          
          ])

          onMounted(async () => {
            try {
                const response = await api.get('/cms/features')
                if (response.data.data?.items) {
                    features.value = response.data.data.items

                }
            }catch (error) {
                // Use default
            }
          })
          </script>