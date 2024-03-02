<template>
  <div class="login1">
    <span>账号：admin，密码：111111</span>
    <el-row>
      <el-col :span="12" :xs="0"> </el-col>
      <el-col :span="12" :xs="24">
        <!-- 表单 -->
        <el-form class="form1" :model="formdata" :rules="rules" ref="logindata">
          <h1>欢迎来到后台管理系统</h1>
          <h2>登录</h2>
          <div class="divinput">
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="formdata.username"
                placeholder="Please input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passsword">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="formdata.password"
                show-password
                placeholder="Please input"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="default"
                class="inputlogin"
                :loading="loading"
                @click="login"
                >登录</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/getTime'
import { Lock, User } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// const shuju = reactive({
//     username: '',
//     passsword: ''
// })
const loading = ref(false)
const router = useRouter()
const route = useRoute()
//获取数据
const formdata = ref({
  username: '',
  password: ''
})
const logindata = ref()
//使用user.ts的数据和方法
let userStore = useUserStore()
const login = async function () {
  //保证表单验证全部通过再发请求
  await logindata.value.validate()
  //收集数据
  //加载效果
  loading.value = true
  const message = await userStore.login(formdata.value)
  if (message === true) {
    loading.value = false
    let topath = (route.query.redirect as string) || '/layout'
    router.push(topath)
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi,${getTime()}`
    })
  } else {
    loading.value = false
    alert(message)
  }
}
const rules = {
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 10, message: '应为3-10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ]
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'login'
}
</script>

<style scoped lang="scss">
.login1 {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  /*实现背景图全覆盖的*/
  .form1 {
    width: 80%;
    position: relative;
    top: 30vh;
    // background-image: url(@/assets/images/login_form.png);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    padding: 40px;
    border-image-source: url(@/assets/images/login_form.png);
    border-image-slice: 40 fill;
    border-image-width: 40px;

    .divinput {
      width: 90%;
      margin: auto;
    }

    .inputlogin {
      width: 100%;
    }

    h1 {
      color: white;
      margin: 20px 0px;
    }

    h2 {
      margin: 20px 0px;
      color: white;
    }
  }
}
</style>
