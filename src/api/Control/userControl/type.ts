// 获取用户数据的响应类型
export type ReqGetUser = {
  code: number
  message: string
  data: {
    records: UserData[]
    total: number
    size: number
    current: number
    pages: number
  }
  ok: boolean
}
// row的类型
export type UserData = {
  id: number | string
  createTime: string
  updateTime: string
  username: string
  password: string
  name: string
  phone: null
  roleName: string
}
// 用户数据的类型
export type Adduser = {
  id?: number | string
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
// 添加和修改的响应类型
export type UserChange = {
  code: number
  message: string
  data: null | string
  ok: boolean
}
// 分配角色的响应类型
export type ReqToAssign = {
  code: number
  message: string
  data: {
    assignRoles: AssignItem[]
    allRolesList: AssignItem[]
  }
  ok: boolean
}
export type AssignItem = {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null | string
}
// 修改分配角色的参数类型
export type doAssignParams = {
  roleIdList: number[]
  userId: number
}
