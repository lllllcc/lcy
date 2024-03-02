<template>
  <div class="layout_big">
    <!-- 左侧导航栏 -->
    <div
      class="layout_left"
      :class="{ layoutFold: tabbarStore.iconChange ? true : false }"
    >
      <h1>后台管理</h1>
      <el-scrollbar class="el-scrollbar">
        <el-menu
          :default-active="$useRoute.path"
          text-color="white"
          background-color="#001529"
          :collapse="tabbarStore.iconChange"
        >
          <layoutMenu :menu-list="UserStore.menuRoutes"></layoutMenu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div
      class="divWidth"
      :class="{ layoutFold01: tabbarStore.iconChange ? true : false }"
    >
      <!-- 顶部导航 -->
      <div class="layout_top">
        <layoutTabbar></layoutTabbar>
      </div>
      <!-- 内容展示 -->
      <div class="layout_main"><layoutMain></layoutMain></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import layoutMain from '@/layout/main/index.vue'
import layoutMenu from '@/layout/menu/index.vue'
import layoutTabbar from '@/layout/tabbar/idnex.vue'
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
const UserStore = useUserStore()
const $useRoute = useRoute()
const tabbarStore = useSettingStore()
</script>

<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'layout'
}
</script>
<style scoped lang="scss">
@import '@/style/layout.scss';
.layout_big {
  width: 100%;
  height: 100vh;
  display: flex;
}
.layout_left {
  width: $base-menu-width;
  height: 100vh;
  background-color: $base-menu-background-color;
  transition: all 0.3s;
  h1 {
    text-align: center;
    color: white;
    height: 41px;
    background-color: $base-menu-background-color;
  }
  .el-scrollbar {
    height: calc(100vh - 41px);
    .el-menu {
      border-right: none;
    }
  }
  &.layoutFold {
    width: 55px;
  }
}
.divWidth {
  width: calc(100% - $base-menu-width);
  transition: all 0.3s;
  &.layoutFold01 {
    width: calc(100% - 55px);
  }
}
.layout_top {
  height: 60px;
}
.layout_main {
  height: calc($base-menu-height + 20px);
  padding: 10px;
  overflow: auto;
}
</style>
