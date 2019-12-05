import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './Home.vue'
import Task1 from './Task1.vue'
import Task2 from './Task2.vue'
import TasksDescription from './TasksDescription.vue'
import QA from './QA.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/task1', component: Task1 },
    { path: '/task2', component: Task2 },
    { path: '/tasks-description', component: TasksDescription },
    { path: '/qa', component: QA}
  ]
})

new Vue({
  router,
  render: h => h(Home),
}).$mount('#app')
