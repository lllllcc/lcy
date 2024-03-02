//sku管理方面的接口
import request from '@/utils/request'
//引入类型
import type {
  ReqCancelSale,
  ReqGetSkuById,
  typeReqGetSku
} from '@/api/product/sku/type'
enum API {
  getSku_URL = '/admin/product/list', //获取sku的展示数据 GET方法  /admin/product/list/{page}/{limit}
  cancelSale_URL = '/admin/product/cancelSale', //下架sku GET方法 /admin/product/cancelSale/{skuId}
  onSale_URL = '/admin/product/onSale', //上架sku GET方法 /admin/product/onSale/{skuId}
  getSkuById_URL = '/admin/product/getSkuInfo', //抽屉展示数据 GET方法 /admin/product/getSkuById/{skuId}
  deleteSku_URL = '/admin/product/deleteSku' //删除sku DELETE方法 /admin/product/deleteSku/{skuId}
}
// 获得sku数据的方法
export const reqGetSku = (page: number, limit: number) => {
  return request.get<unknown, typeReqGetSku>(
    `${API.getSku_URL}/${page}/${limit}`
  )
}
// 下架sku的方法
export const reqCancelSale = (skuId: number) => {
  return request.get<unknown, typeReqGetSku>(`${API.cancelSale_URL}/${skuId}`)
}
// 下架sku的方法
export const reqOnSale = (skuId: number) => {
  return request.get<unknown, typeReqGetSku>(`${API.onSale_URL}/${skuId}`)
}
// 获取抽屉展示数据的方法
export const reqGetSkuById = (skuId: number) => {
  return request.get<unknown, ReqGetSkuById>(`${API.getSkuById_URL}/${skuId}`)
}
// 删除sku的方法
export const reqDeleteSku = (skuId: number) => {
  return request.delete<unknown, ReqCancelSale>(`${API.deleteSku_URL}/${skuId}`)
}
