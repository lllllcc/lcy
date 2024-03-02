<template>
  <div class="Inmap" ref="charts"></div>
</template>
<script setup lang="ts">
// 引入echarts
import chinaJson from '@/views/screen/components/china.json'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
// 获取图标节点
const charts = ref()
// 注册echarts中国地图
echarts.registerMap('china', chinaJson as any)
onMounted(() => {
  // 获取echarts的实例
  let mycharts = echarts.init(charts.value)

  // 设置实例配置项
  mycharts.setOption({
    geo: {
      map: 'china',
      roam: true,
      // 地图位置
      left: 50,
      right: 50,
      top: 100,
      bottom: 0,
      // 地图文字
      label: {
        show: true,
        color: 'white',
        fontSize: 14
      },
      // 地图高亮时得样式
      emphasis: {
        itemStyle: {
          color: 'red'
        },
        label: {
          fontSize: 40
        }
      },
      // 每个多边形样式
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
      }
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    series: {
      type: 'lines', //航线系列
      data: [
        {
          coords: [
            [116.405285, 39.904989], //起点
            [121.472644, 31.231706] //终点
          ]
        }
      ],
      // 是否显示特效
      effect: {
        show: true,
        symbol: 'arrow',
        color: 'black',
        symbolSize: 20
      },
      // 统一样式设置
      lineStyle: {
        color: 'yellow',
        width: 7
      }
    }
  })
})
</script>

<style scoped lang="scss"></style>
