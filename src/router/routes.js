import Home from '../views/Home.vue'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true // 当前路由页面需要缓存
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
