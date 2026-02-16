<template>
  <section class="hero-section py-5 bg-primary text-white">
  <div class="container py-5">
    <div class="row align-items-center">
    <div class="col-lg-6">
      <h1 class="display-4 fw-bold mb-4">
       {{ content.title || 'welcome' }}
       </h1>
       <p class="lead mb-4">
          {{ content.subtitle || 'Your awesome todo app' }}
          </p>
          <a :href="content.ctalink || '/register'" class= "btn btn-light btn-lg">
          {{ content.ctaText || 'Get Started' }}
          <i class="bi bi-arrow-right ms-2"></i>
          </a>
          </div>
          <div class="col-lg-6 text-center">
             <i class="bi bi-check-circle fs-1" style="font-size: ; opacity:0,2"></i>
             </div>
            </div>
         </div>
        </section>
     </template>

     <script setup>
     import { ref, onMounted } from 'vue'
     import api from '../../services/api'

    const content = ref({})

    onMounted(async () => {
        try {
            const response = await api.get('/cms/hero')
            content.value = response.data.data
        } catch (error) {

        }
    })
    </script>

    <style scoped>
    .hero-section {
        min-height: ;
        display: flex;
        align-items: center;
    
    }
    </style>


