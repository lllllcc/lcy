// 通过vue-router配置登录路由模板
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constanroutes } from './routes'
const router = createRouter({
  history: createWebHashHistory(),
  routes: constanroutes as RouteRecordRaw[]
})

export default router
