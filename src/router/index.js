import { createRouter, createWebHistory } from 'vue-router'
import List from '../view/List.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:type/:id',
      name: 'detail',
      component: () => import('../view/Detail.vue')
    },
    {
      path: '/season/:tvId/:seasonId',
      name: 'season',
      component: () => import('../view/Season.vue')
    }
  ]
})

export default router
