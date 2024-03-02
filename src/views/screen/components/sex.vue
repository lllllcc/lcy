<template>
  <div class="sex1">
    <div class="title">
      <p>男女比例</p>
      <img src="../images/dataScreen-title.png" alt="加载失败" />
    </div>
    <div class="box">
      <div class="man">
        <img src="../images/man.png" alt="失败" />
      </div>
      <div class="women">
        <img src="../images/woman.png" alt="失败" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
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
      text: '男女比例',
      textStyle: {
        color: 'skyblue'
      },
      left: '40%'
    },
    // x轴组件
    xAxis: {
      show: false,
      // x轴隐藏
      min: 0,
      max: 100
    },
    // y轴组件
    yAxis: {
      show: false,
      // y轴隐藏
      type: 'category'
    },
    // 系列，决定你展示什么样的图形图标
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    // 数组可以多放
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
.sex1 {
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .box {
    display: flex;
    justify-content: center;
    .man {
      width: 111px;
      height: 115px;
      margin: 20px;
      background: url('../images/man-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .women {
      width: 111px;
      height: 115px;
      margin: 20px;
      background: url('../images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-around;
    color: white;
  }
  .charts {
    height: 100px;
  }
}
</style>
