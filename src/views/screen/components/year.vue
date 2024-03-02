<template>
  <div class="year">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../images/dataScreen-title.png" alt="加载失败" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
// 引入echarts
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
// 获取图标节点
const charts = ref()
onMounted(() => {
  // 获取echarts的实例
  let mycharts = echarts.init(charts.value)
  // 设置实例配置项
  mycharts.setOption({
    // 标题组件
    title: {
      text: '散点图',
      textStyle: {
        color: 'white'
      },
      left: '40%'
    },
    // x轴组件
    xAxis: { type: 'category', show: false },
    // y轴组件
    yAxis: { show: false },
    // 系列，决定你展示什么样的图形图标
    series: {
      type: 'scatter',
      data: [33, 88, 9, 300, 604, 234, 254, 123],
      // 点的样式
      symbol: 'diamond',
      // 点的样式
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      symbolSize: 16,
      // 图文标签
      label: { show: true, position: 'top', color: 'yellowgreen' }
    },
    // 数组可以多放
    // 布局组件
    grid: {
      left: 20,
      right: 0,
      top: 20,
      bottom: 20
    }
  })
})
</script>

<style scoped lang="scss">
.year {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    p {
      color: white;
      font-size: 18px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
