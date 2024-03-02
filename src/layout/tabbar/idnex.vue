<template>
  <div class="tabbar">
    <div class="tabbarLeft">
      <!-- 左侧 -->
      <el-icon style="margin-right: 10px" @click="tabbarChange">
        <component :is="tabbarStore.iconChange ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          v-show="item.meta.title"
          :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--右侧 -->
    <div class="tabbarRight">
      <!-- 右侧圆钮 -->
      <el-button
        type="success"
        size="small"
        icon="Refresh"
        @click="updateRefsh"
        circle
      ></el-button>
      <el-button
        type="info"
        size="small"
        icon="FullScreen"
        @click="fullScreen"
        circle
      ></el-button>

      <el-popover
        placement="bottom"
        title="主题设置"
        trigger="hover"
        :width="300"
      >
        <!-- 表单元素 -->
        <el-form>
          <el-form-item label="主题颜色">
            <!-- 取色器 -->
            <el-color-picker
              :teleported="false"
              v-model="color"
              @change="setColor"
              show-alpha
              :predefine="predefineColors"
          /></el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="value2"
              @change="changeDark"
              style="
                --el-switch-on-color: #0d0e0c;
                --el-switch-off-color: #cbeb58;
              "
              active-icon="MoonNight"
              inactive-icon="sunny"
            />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button
            type="warning"
            size="small"
            icon="Setting"
            circle
          ></el-button>
        </template>
      </el-popover>
      <!-- 头像 -->
      <!-- <img src="@/assets/images/logo.jpg" alt="logo" /> -->
      <img :src="userInfo.avatar" alt="logo" />
      <!-- 下拉菜单 -->
      <el-dropdown>
        <el-button>
          {{ userInfo.username }}<el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import useSettingStore from '@/store/modules/setting' //获取数据
import useUserStore from '@/store/modules/user'
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { ref } from 'vue'
const userInfo = useUserStore()
const $route = useRoute()
const $router = useRouter()
const tabbarStore = useSettingStore()
// 取色器的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
// 主题颜色切换的函数
const setColor = () => {
  // 获取节点
  const domHtml = document.documentElement
  // 修改样式
  domHtml.style.setProperty('--el-color-primary', color.value)
}
// switch的数据
const value2 = ref(false)
const tabbarChange = () => {
  tabbarStore.iconChange = !tabbarStore.iconChange //控制折叠
}
// 切换黑暗模式事件
const changeDark = () => {
  // 获取html根节点
  const domHtml = document.documentElement
  // 根据switch的状态去判断是否添加类名
  value2.value ? (domHtml.className = 'dark') : (domHtml.className = '')
}
const updateRefsh = () => {
  tabbarStore.refsh = !tabbarStore.refsh //控制折叠的函数
}
//控制全屏的函数
const fullScreen = () => {
  let full = document.fullscreenElement //用于判断浏览器是否为全屏，是的话会返回ture，不是的话则会返回null（false）
  //切换逻辑的判断
  if (!full) {
    document.documentElement.requestFullscreen() //文档根提供的浏览器切换全屏的方法
  } else {
    document.exitFullscreen() //提供的关闭全屏的方法
  }
}
//
//浏览器全屏的关闭与开启，存在兼容性问题。
//市场上有插件解决兼容性问题------fullscreen
//

//退出登录
const loginout = async () => {
  //需要完成3件事。
  //1.是向服务器发送请求，告诉服务器清除token 和用户数据等（这里没有退出登录接口，所以不写）
  //2.删除掉用户存储在小仓库得用户数据(浏览器本身存储得token同样需要删除)
  //3.跳回到登录页面
  await userInfo.userLoginOut()
  // userInfo.token = ''
  // userInfo.username = ''
  // userInfo.avatar = ''
  // //删除浏览器中存储的token
  // localStorage.removeItem('token')
  //实现跳转效果
  $router.push('/login')
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'layoutTabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0 -3em 3em rgba(253, 253, 253, 0.1),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  // background-image: linear-gradient(
  //   to right,
  //   rgb(216, 196, 196),
  //   rgb(182, 151, 151),
  //   rgb(128, 83, 83)
  // );
}
.tabbarRight {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    border-radius: 20px;
    margin: 0 10px 0 25px;
  }
}
.tabbarLeft {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

:deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
}

//折叠样式
</style>
