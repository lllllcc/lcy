<template>
  <div class="Inage">
    <div class="title">
      <p>年龄比例</p>
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
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 40,
      right: 5,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '娱乐' },
          { value: 580, name: '新闻' },
          { value: 484, name: '财经' },
          { value: 300, name: '直播' }
        ]
      }
    ],
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
})
</script>

<style scoped lang="scss">
.Inage {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png');
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
