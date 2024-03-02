<template>
  <div class="top">
    <div class="left"><span class="btn1" @click="goHome">首页</span></div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ nowTime }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
// 跳转首页函数
const goHome = () => {
  $router.push('/home')
}
// 定时器（存储数字类型）
const timer = ref(0)
onMounted(() => {
  // 挂载完毕就调用定时器
  timer.value = setInterval(() => {
    nowTime.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  // 组件销毁前关闭定时器
  clearInterval(timer.value)
})
// 当前时间的数据
const nowTime = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1.5;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    text-align: center;
    line-height: 40px;
    color: #29fcff;
    .btn1 {
      width: 130px;
      height: 40px;
      float: right;
      background: url('../images/dataScreen-header-btn-bg-l.png');
      background-size: cover;
      font-size: 20px;
    }
  }
  .center {
    flex: 2;
    background: url('../images/dataScreen-header-center-bg.png') no-repeat;
    background-size: cover;
    .title {
      width: 100%;
      height: 74px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: cover;
      font-size: 30px;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
    }
  }
  .right {
    flex: 1.5;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
    .time {
      color: #29fcff;
      line-height: 40px;
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>
