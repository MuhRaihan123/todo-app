<template>
<div>
   <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
   <div class="container">
   <a class="navbar-brand fw-bold" href="#">
      <i class="bi bi-check-circle-fill text-primary me-2"></i>
      TodoApp
      </a>
      <div class="d-flex gap-2">
          <a href="#" @click.prevent="$emit('login')" class="btn btn-outline-primary">Login</a>
          <a href="#" @click.prevent="$emit('register')" class="btn btn-primary">Register</a>
          </div>
          </div>
          </nav>

          <heroSection />
          <FeatureSection />

          <!-- Footer -->
          <footer class="bg-dark text-white py-4">
            <div class="mb-0">&copy; 2026 TodoApp. Made with Vue.js + Express.js</p>
            </div>
          </footer>
          </div>
          </template>

          <script setup>
          import HeroSection from' ./landing/HeroSection.vue'
          import FeaturesSection from './landing/FeaturesSection.vue'

          defineEmits(['login', 'register'])
          </script>
















