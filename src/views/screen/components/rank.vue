<template>
  <div class="Inrank">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../images/dataScreen-title.png" alt="加载失败" />
    </div>
    <!-- 图表容器 -->
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
      text: '景区排行',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
      // 子标题
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'yellowgreen'
      },
      left: '50%'
    },
    // x轴组件
    xAxis: {
      type: 'category'
    },
    // y轴组件
    yAxis: {},
    // 系列，决定你展示什么样的图形图标
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        label: { show: true, position: 'insideTop', color: 'yellowgreen' },
        // 是否展示背景颜色
        showBackground: true,
        backgroundStyle: {
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
        // 柱条样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0]
        }
      }
    ],
    // 数组可以多放
    // 布局组件
    grid: {
      left: 20,
      right: 20,
      top: 60,
      bottom: 20
    }
  })
})
</script>

<style scoped lang="scss">
.Inrank {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    margin-top: 30px;
    height: calc(100% - 30px);
  }
}
</style>
