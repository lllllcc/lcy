import { API, reqloginout, requserInfo } from '@/api/user/index'
import { constanroutes } from '@/router/routes'
import request from '@/utils/request'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('token'),
      menuRoutes: constanroutes,
      username: '',
      avatar: ''
    }
  },
  actions: {
    login: async function (data: { username: string; password: string }) {
      const result = (await request({
        url: API.LOGIN_URL,
        method: 'post',
        data
      })) as {
        code: number
        data: string
        message: string
      }
      // console.log(result.message)
      if (result.code == 200) {
        this.token = result.data
        localStorage.setItem('token', result.data)
        return true
      } else if (result.code == 201) {
        console.log(result.data)
        return result.message
      }
    },

    //获取用户信息的方法
    userInfo: async function () {
      const result = await requserInfo() //在api下的请求方法
      // console.log(result)
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return true
      } else {
        console.log('error,获取用户信息请求失败了')
        return false
      }
    },
    userLoginOut: async function () {
      const result = await reqloginout()
      console.log(result)
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        //删除浏览器中存储的token
        localStorage.removeItem('token')
      } else {
        alert('退出失败')
      }
      return true
    }
  },
  getters: {}
})
export default useUserStore
