<template>
    <div>
        <!-- Stats Cards -->
         <div class="row g-4 mb-4">
           <div class=-"col-md-3"v-for="stat in stats" :key="stat.title">
             <div class="card border-0 shadow-sm h-100">
               <div class="card-body">
                 <div class"d-flex justify-content-between">
                   <div>
                     <p class="d-text-muted mb-1">{{ stat.title }}</p>
                     <h3 class="mb-0">{{ stat.value }}<//h3>
                    </div>
                       <p> class="text-muted mb-1">{{ stat.title }}</p>
                       <h3 class="mb-0">{{ stat.value }}</h3>
                       </div>
                       <div :class="'p-3 rounded bg-' + stat.color + '-subtle'">
                         <i :class="stat.icon + 'fs-4 text-' + stat.color"></i>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  

                <!-- Data Table -->
                <div class="card shadow-sm">
                 <div class="card-header bg-white">
                   <h5 class="mb-0">Semua Todo</h5>
                   </div>
                     <div class="table-responsive">
                      <div class="table table-hover mb-0">  
                        <table class="table-light">
                          <tr>
                          <th>ID</th>
                          <th> Title</th>
                          <th>User</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Created</th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr v-for="todo in todos"  :key="todo.id">
                              <td>{{ todo.id }}</td>
                              <td>{{ todo.title }}</td>
                              <td>{{ todo.user?.name || '-'  }}</td>
                               <td>
                                  <span :class="todo.completed ? 'badge bg-success' : 'badge bg-warning'">
                                    {{ todo.completed ? 'Done' : 'pending' }}
                                    </span>
                                    </td>
                                    <td>
                                    </tbody>
                                 </table>
                               </div>
                             </div>
                            </div>
                          </template>
                    
                    <script setup>
                    import { ref, onMounted, computed } from 'vue'
                    import api from '../services/api'

                    const statsData = ref(null)
                    const todos = ref([])

                    const stats = computed(() => [
                        { title: 'Total Users', value: statData.value?.totalUsers || 0, icon: 'bi-people', color: 'primary'},
                        {title: 'Total Todos', value: statData.value?.totalTodos || 0, icon: 'bi-list-check', color: 'success'},
                        { title: 'Completed', value: statsData.value?.completedTodos || 0, icon: 'bi-check-circle', color: 'info' },
                        { title: 'Pending', value: statsData.value?.pendingTodos || 0, icon: 'bi-clock', color: 'warning' },
                    ])

                    const proirityClass = (priority) =>{
                        const classes = { low: 'badge bg-success', medium: 'badge bg-warning text-dark', high: 'badge bg-danger' }
                        return classes[priority]
                    }

                    const formatDate = (date) => new Date(date).tolocaleDateString('id-ID')

                    onMounted(async() => {
                      try {
                        const [statsRes, todosRes] = await promise.all([
                            api.get('/dashboard/stats'),
                            api.get('/dashboard)
                        ])
                        statsData.value = statsRes.data.data
                        todos.value = todosRes.data.data
                      } catch (error) {
                        console.error(error)
                      }
                    })
             </script>




