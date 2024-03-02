//属性相关的api,例如分类等
import request from '@/utils/request'
//引入类型
import type {
  AttrDelete,
  C1,
  C2,
  C3,
  attr,
  resAddOrUpdate,
  tAttr
} from '@/api/product/attr/type'
export enum API {
  C1_URL = '/admin/product/getCategory1', //一级分类 get方法 /admin/product/getCategory1
  C2_URL = '/admin/product/getCategory2', //二级分类 get方法 /admin/product/getCategory2/{category1Id}
  C3_URL = '/admin/product/getCategory3', //三级分类 get方法 /admin/product/getCategory3/{category2Id}
  attrInfoList_URL = '/admin/product/attrInfoList', //获取下方card属性 get方法 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
  addOrUpdateAttr_URL = '/admin/product/saveAttrInfo', //保存或者修改三级分类（通过传递的参数是否有id判断是修改 还是保存） POST方法 /admin/product/saveAttrInfo
  attrDelete_URL = '/admin/product/deleteAttr' //删除下部属性 DELETE方法 /admin/product/deleteAttr/{attrId}
}
//一级分类请求
export const reqC1 = () => {
  return request.get<unknown, C1>(API.C1_URL)
}
//二级分类请求
export const reqC2 = (category1Id: number | string) => {
  return request.get<unknown, C2>(`${API.C2_URL}/${category1Id}`)
}
//三级分类请求
export const reqC3 = (category2Id: number | string) => {
  return request.get<unknown, C3>(`${API.C3_URL}/${category2Id}`)
}
//获取card属性
export const reqattrInfoList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) => {
  return request.get<unknown, attr>(
    `${API.attrInfoList_URL}/${category1Id}/${category2Id}/${category3Id}`
  )
}
//新增或者修改已有的属性
export const reqAddOrUpdateAttr = (data: tAttr) => {
  return request.post<unknown, resAddOrUpdate>(API.addOrUpdateAttr_URL, data)
}
//删除方法
export const reqAttrDelete = (attrId: number) => {
  return request.delete<unknown, AttrDelete>(`${API.attrDelete_URL}/${attrId}`)
}
