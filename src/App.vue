<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//用于帮助下面配置中文的
</script>

<template>
  <!-- 设置ele默认为中文 -->
  <el-config-provider :locale="zhCn">
    <router-view> </router-view>
  </el-config-provider>
</template>

<style scoped></style>
