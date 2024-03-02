<template>
  <div class="Inline">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
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
    title: {
      text: '访问量'
    },
    grid: {
      top: 0,
      left: 40,
      right: 0,
      bottom: 40
    },
    xAxis: {
      type: 'category',
      // x轴两侧不留白
      boundaryGap: false,
      // 线得设置
      splitLine: {
        show: false
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'line',
        data: [120, 940, 66, 560, 321, 890, 1200],
        // 平滑曲线得设置
        smooth: true,
        areaStyle: {
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
            ]
          }
        }
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.Inline {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 97% 100%;
  margin: 0 20px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
