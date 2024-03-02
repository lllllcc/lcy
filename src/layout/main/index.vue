<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import useSettingStore from '@/store/modules/setting' //获取数据
import { nextTick, ref, watch } from 'vue'
let useStore = useSettingStore()
let flag = ref(true)
watch(
  () => useStore.refsh,
  () => {
    flag.value = !flag.value
    nextTick(() => {
      flag.value = !flag.value
    })
  }
)
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'layoutMain'
}
</script>
<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
