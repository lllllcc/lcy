<template>
  <div class="Intourist">
    <div class="Intop">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量<span style="color: yellowgreen">99999</span>人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts用来展示图表的盒子 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
// 引入水球图
import 'echarts-liquidfill'
const people = ref('243252人')
// 水球图得dom节点
const charts = ref()
onMounted(() => {
  // 获取echarts的实例
  let mycharts = echarts.init(charts.value)
  // 设置实例配置项
  mycharts.setOption({
    // 标题组件
    title: {
      text: '水球图'
    },
    // x轴组件
    xAxis: {},
    // y轴组件
    yAxis: {},
    // 系列，决定你展示什么样的图形图标
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      radius: '100%'
    },

    // 布局组件
    grid: {
      left: 0,
      right: 0
    }
  })
})
</script>

<style scoped lang="scss">
.Intourist {
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  .Intop {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      font-size: 20px;
      color: white;
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url('../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
