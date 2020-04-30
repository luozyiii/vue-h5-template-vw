export default [
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  },
  { path: '*', redirect: '/404' }
]
