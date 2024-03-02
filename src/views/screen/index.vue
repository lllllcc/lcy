<template>
  <div class="container">
    <!-- 数据大屏内容区 -->
    <div class="screen" ref="screen">
      <!-- 顶部 -->
      <Top class="top"></Top>
      <!-- 底部 -->
      <div class="bottom">
        <!-- 左侧 -->
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <!-- 中间 -->
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <rank class="rank"></rank>
          <year class="year"></year>
          <couter class="couter"></couter>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入顶部子组件
import Top from '@/views/screen/components/top.vue'
// 引入左侧组件
import Age from '@/views/screen/components/age.vue'
import Sex from '@/views/screen/components/sex.vue'
import Tourist from '@/views/screen/components/tourist.vue'
// 引入中间组件
import Line from '@/views/screen/components/line.vue'
import Map from '@/views/screen/components/map.vue'
// 引入右侧组件
import couter from './components/couter.vue'
import rank from './components/rank.vue'
import year from './components/year.vue'
// 获取展示盒子的dom元素
const screen = ref()
// 让其上来就进行适配
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
// 适配函数
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'screen'
}
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1980px;
    height: 1080px;
    transform-origin: top left;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .rank {
          flex: 1.2;
        }
        .year {
          flex: 1;
        }
        .couter {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        // margin-right: 20px;
        .age {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
        .tourist {
          flex: 1.2;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
