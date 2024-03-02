// 菜单相关的类型
export type GetPermission = {
  code: number
  message: string
  data: {
    id: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: string | null
    toCode: null | string
    type: number
    status: null
    level: number
    children?: GetPermission1
    select: boolean
  }[]
  ok: boolean
}
export type GetPermission1 = GetPermission['data']
// 添加菜单得响应类型
export type ReqAddPermission = {
  code: number
  data: null | string
  message: string
  ok: boolean
}
// 添加或者修改得参数类型
export type Params = {
  id?: number | string //id
  name: string //菜单名字
  level: number //几级菜单
  pid: number //菜单id
  code: string //权限数值
}
