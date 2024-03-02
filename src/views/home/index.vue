<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="头像加载失败了" class="avatar" />
      <div class="bottom">
        <h3>{{ getTime() }},{{ userStore.username }}</h3>
        <p>后台管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="img1">
    <img src="@/assets/icons/welcome.svg" alt="失败" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/getTime'
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'home'
}
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-top: 5px;
    margin-left: 10px;
    h3 {
      font-size: 30px;
      font-weight: 600;
    }
    p {
      margin-top: 15px;
      color: cadetblue;
    }
  }
}
.img1 {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  img {
    width: 70%;
    height: 60%;
  }
}
</style>
