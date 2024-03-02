import request from '@/utils/request'
import {
  Adduser,
  ReqGetUser,
  ReqToAssign,
  UserChange,
  doAssignParams
} from './type'

// 用户管理相关的接口
export enum API {
  getUser_URL = '/admin/acl/user', //获取账号信息  GET方法 /admin/acl/user/{page}/{limit}
  saveUser_URL = '/admin/acl/user/save', //添加用户 POST方法 /admin/acl/user/save(需要携带参数)
  updateUser_URl = '/admin/acl/user/update', //更新用户信息 PUT方法 /admin/acl/user/update（需要携带参数）
  toAssign_URL = '/admin/acl/user/toAssign', //获取分配角色的数据  GET方法 /admin/acl/user/toAssign/{adminId}
  doAssignRole_URL = '/admin/acl/user/doAssignRole', //修改分配角色 POST方法 /admin/acl/user/doAssignRole（参数为用户id加checkbox id）
  deleteUser_URL = '/admin/acl/user/remove', //删除单个角色 DELETE方法 /admin/acl/user/remove/{id}
  deleteSomeUser_URL = '/admin/acl/user/batchRemove' // 批量删除角色 DELETE方法 /admin/acl/user/batchRemove
  //搜索方法 GET方法 /admin/acl/user/{page}/{limit}
}
// 获取用户信息或者搜索的方法
export const reqGetUser = (
  page: number,
  limit: number,
  username: string = ''
) => {
  return request.get<unknown, ReqGetUser>(
    `${API.getUser_URL}/${page}/${limit}/?username=${username}`
  )
}
// 添加或者修改用户信息的方法
export const reqSaveAndUpdateUser = (data: Adduser) => {
  // 根据有无id判断为添加或者修改
  if (data.id) {
    return request.put<unknown, UserChange>(API.updateUser_URl, data)
  } else {
    return request.post<unknown, UserChange>(API.saveUser_URL, data)
  }
}
// 获取分配用户的数据方法
export const reqToAssign = (id: number) => {
  return request.get<unknown, ReqToAssign>(`${API.toAssign_URL}/${id}`)
}
// 修改分配用户的数据方法
export const reqDoAssignRole = (data: doAssignParams) => {
  return request.post<unknown, UserChange>(API.doAssignRole_URL, data)
}
// 删除单个用户的数据方法
export const reqDeleteUser = (id: number) => {
  return request.delete<unknown, UserChange>(`${API.deleteUser_URL}/${id}`)
}
// 批量删除的方法
export const reqDeleteSomeUser = (roleIdList: number[]) => {
  return request.delete<unknown, UserChange>(API.deleteSomeUser_URL, {
    data: roleIdList
  })
}
