//品牌管理方面的接口
import request from '@/utils/request'
//引入类型
import type {
  responseAddTrademark,
  responseDeleteTrademark,
  responseTrademark,
  responseUpdateTrademark
} from '@/api/product/trademark/type'
enum API {
  //获取已有品牌
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌（post）
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌(put)
  UPDATERADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除品牌（delete）
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove'
}
//获取已有品牌的方法
//其需要传递两个参数给地址
//1 page：获取第几页
//2 limit：获取几个已有品牌的数据
export const reqGetTrademark = (page: number, limit: number) =>
  request.get<unknown, responseTrademark>(
    API.TRADEMARK_URL + `${page}/${limit}`
  )
//添加品牌函数
export const reqAddOrUpdateTrademark = (data: responseUpdateTrademark) => {
  if (data.id) {
    //修改品牌函数
    return request.put<unknown, responseAddTrademark>(
      API.UPDATERADEMARK_URL,
      data
    )
  } else {
    return request.post<unknown, responseAddTrademark>(
      API.ADDTRADEMARK_URL,
      data
    )
  }
}

//删除品牌数据
export const reqDeleteTrademark = (id: number) => {
  return request.delete<unknown, responseDeleteTrademark>(
    `${API.DELETETRADEMARK_URL}/${id}`
  )
}
