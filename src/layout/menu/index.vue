<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="tiaozhuan"
      >
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 仅有一个子路由 -->
    <template v-else-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="tiaozhuan"
      >
        <el-icon><component :is="item.children[0].meta.icon" /></el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <template v-else>
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>

        <index :menu-list="item.children"></index> </el-sub-menu
    ></template>
  </template>
</template>
<script setup lang="ts">
import type { MenuItemRegistered } from 'element-plus'
import { useRouter } from 'vue-router'
defineProps(['menuList'])
const router = useRouter()
const tiaozhuan = (e: MenuItemRegistered) => {
  router.push(e.index)
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'layoutMenu'
}
</script>
<style scoped lang="scss"></style>
