import { createRouter, createWebHashHistory } from 'vue-router'
import TaskManager from '../views/TaskManager.vue'

const routes = [

  {
    path: '/',
    name: 'Task Manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TaskManager
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
