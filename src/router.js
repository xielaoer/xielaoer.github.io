import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  //mode: 'history', 打包不能用找个
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/history.vue')
    },
  ]
})
