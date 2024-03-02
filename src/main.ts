import '@/style/style.css' //设置全局样式，因为有scope，所以app各种组件的样式无法作用全局。所以使用外部引入文件
import ElementPlus from 'element-plus' //引入element plus
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //引用路由配置
import pinia from './store' //引入pinia
//引入注册全局组件
import gloalComponent from '@/components'
//引入路由鉴权
import Category from '@/components/Category/index.vue' //注册全局组件Category
import '@/perssion'
// 引入ele暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.component('Category', Category)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
//只要使用了app.use就会触发文件里的install方法
app.use(gloalComponent)
app.mount('#app')
