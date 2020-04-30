import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import defaultRouter from './default' // 默认路由

// 合并业务路由和默认路由
const newRouter = routes.concat(defaultRouter)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: newRouter
})

export default router
