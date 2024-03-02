//用于规范用户信息的ts数据类型
//响应的共有数据
export interface responseData {
  code: number
  message: string
  ok: boolean
}
//退出登录
export interface loginout extends responseData {
  data: string
}
//用户信息
export interface responseUserInfo extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
//登录数据
export interface login extends responseData {
  data: string
}
