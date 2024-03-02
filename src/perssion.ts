//路由鉴权,就是你的路由能不能被正常访问的权限(什么条件下可以访问 什么条件下不可以被访问)
//需要在main.ts下引入，否则无意义
import router from '@/router/index'
import nprogress from 'nprogress' //不是ts版本而报错 不影响
import 'nprogress/nprogress.css' //引入进度条样式
import { ref } from 'vue'
import pinia from './store'
import useUserStore from './store/modules/user'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia) //不引入pinia就会报错，因为在外部组件中要先有大仓库 再有小仓库
const username = ref(userStore.username)
//路由守卫就是任意路由切换时都会触发的两个钩子
//前置路由守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start() //开启进度条
  // next()
  const token = userStore.token
  // 根据有无token判断有没有登录
  if (token) {
    if (to.path === '/login') {
      next({ path: from.path })
    } else {
      if (username.value) {
        next()
      } else {
        if (await userStore.userInfo()) {
          next()
        } else {
          userStore.token = ''
          localStorage.removeItem('token')
          next({ path: '/login' })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path //把想去但不能去的路由按照参数的形式传递出去
        }
      })
    }
  }
})
// //后置路由守卫
router.afterEach((to) => {
  nprogress.done() //关闭进度条
  document.title = '后台管理系统-' + to.meta.title
})

//关于路由切换进度条问题，需要引入nprogress
//pnpm i nprogress 使用时需要引入
//最后还需要引入进度条样式，否则没有样式变化
