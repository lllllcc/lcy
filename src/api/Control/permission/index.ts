// 菜单管理相关的请求与接口
import request from '@/utils/request'
import { GetPermission, Params, ReqAddPermission } from './type'
export enum API {
  getPermission_URL = '/admin/acl/permission', //获取菜单 GET /admin/acl/permission
  addPermission_URL = '/admin/acl/permission/save', //添加菜单 POST方法 /admin/acl/permission/save
  updatePermission_URL = '/admin/acl/permission/update', //修改菜单 PUT方法 /admin/acl/permission/update
  deletePermission_URL = '/admin/acl/permission/remove' //删除菜单 DELETE方法 /admin/acl/permission/remove/{id}
}
// 获取菜单的方法
export const reqGetPermission = () => {
  return request.get<unknown, GetPermission>(API.getPermission_URL)
}
// 新增或修改菜单得方法
export const reqAddOrUpdate = (data: Params) => {
  if (data.id) {
    // 修改
    return request.put<unknown, ReqAddPermission>(
      API.updatePermission_URL,
      data
    )
  } else {
    // 添加
    return request.post<unknown, ReqAddPermission>(API.addPermission_URL, data)
  }
}
// 删除菜单得方法
export const reqDeletePermission = (id: number) => {
  return request.delete<unknown, ReqAddPermission>(
    `${API.deletePermission_URL}/${id}`
  )
}
