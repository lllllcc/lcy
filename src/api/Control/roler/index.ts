import request from '@/utils/request'
import type {
  ReqAddRole,
  ReqGetRole,
  ReqToAssignAll,
  roleParams1
} from './type'

// 角色管理相关的接口
export enum API {
  getRole_URL = '/admin/acl/role', //获取角色列表 GET方法 /admin/acl/role/{page}/{limit}
  addRole_URL = '/admin/acl/role/save', //新增角色 POST方法 /admin/acl/role/save（需要携带参数）
  updateRole_URL = '/admin/acl/role/update', //更新角色 PUT方法 /admin/acl/role/update
  deleteRole_URL = '/admin/acl/role/remove', //删除角色  DELETE方法 /admin/acl/role/remove/{id}
  toAssign_URL = '/admin/acl/permission/toAssign', //根据角色获取菜单 GET方法 /admin/acl/permission/toAssign/{roleId}
  doAssignAcl_URL = '/admin/acl/permission/doAssignAcl' //给角色分配权限 POST方法 /admin/acl/permission/doAssignAcl
}
// 获取或者查询角色列表的方法
export const reqGetRole = (
  page: number,
  limit: number,
  roleName: string = ''
) => {
  return request.get<unknown, ReqGetRole>(
    `${API.getRole_URL}/${page}/${limit}/?roleName=${roleName}`
  )
}
// 新增或者更新角色的方法
export const reqAddOrUpdateRole = (data: roleParams1) => {
  if (data.id) {
    return request.put<unknown, ReqAddRole>(API.updateRole_URL, data)
  } else {
    return request.post<unknown, ReqAddRole>(API.addRole_URL, data)
  }
}
// 删除角色的方法
export const reqDeleteRole = (id: number) => {
  return request.delete<unknown, ReqAddRole>(`${API.deleteRole_URL}/${id}`)
}
// 根据角色获取菜单的方法
export const reqToAssignAll = (roleId: number) => {
  return request.get<unknown, ReqToAssignAll>(`${API.toAssign_URL}/${roleId}`)
}
// 给角色分配权限
export const reqDoAssignAcl = (data: {
  permissionIdList: number[]
  roleId: number
}) => {
  return request.post<unknown, ReqAddRole>(API.doAssignAcl_URL, data)
}
