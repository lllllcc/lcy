//创建用户登录等接口
//会用到axios，所以引入
import type { login, loginout, responseUserInfo } from '@/api/user/type'
import request from '@/utils/request'
// const enum API {
//   loginUrl = '/login', //登录接口
//   userInfo = '/userInfo' //用户信息接口
// }
export const userInfo = () => {
  return request.get<
    unknown,
    { code: number; data: { username: string; avatar: string } }
  >('/userInfo')
} //这是假接口的方法
// //暴露请求方法
export enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGINOUT_URL = '/admin/acl/index/logout'
}
//下面是网友提供的接口
// export enum API {
//   LOGIN_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/login',
//   USERINFO_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/info',
//   LOGINOUT_URL = 'http://114.115.179.162:8022/prod-api/admin/acl/index/logout'
// }
//登录接口
export const reqlogin = (data: { name: string; password: string }) => {
  return request.post<unknown, login>(API.LOGIN_URL, data)
}
//获取登录信息的方法
export const requserInfo = () => {
  return request.get<
    unknown,
    responseUserInfo,
    // {
    //   data: {
    //     name: string
    //     avatar: string
    //   }
    //   code: number
    // },
    unknown
  >(API.USERINFO_URL)
}
//退出登录
export const reqloginout = () => {
  return request.post<unknown, loginout>(API.LOGINOUT_URL)
  // {
  //   code: number
  //   data: object
  //   message: string
  //   ok: boolean
  // }
}
