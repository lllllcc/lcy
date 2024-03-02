// 获取或者搜索的响应类型
export type ReqGetRole = {
  code: number
  message: string
  data: {
    records: roleParams1[]
    total: number
    size: number
    current: number
    orders?: []
    optimizeCountSql?: true
    hitCount: number
    countId: null
    maxLimit: null
    searchCount: number
    pages: number
  }
  ok: number
}
export type roleParams1 = {
  id?: number | string
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
// 新增角色的响应类型
export type ReqAddRole = {
  code: number
  message: string
  data: null | string
  ok: boolean
}
// 根据角色获取菜单的响应类型
export type ReqToAssignAll = {
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
    children?: ToAssignChild
    select: boolean
  }[]
  ok: boolean
}
// 下级类型
export type ToAssignChild = ReqToAssignAll['data']
