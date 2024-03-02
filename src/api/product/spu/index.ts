import type {
  BaseAttrList,
  BaseSpu,
  ReqDeleteSku,
  addOrUpload,
  addSkuParams,
  getTrademarkList,
  reqAddOrUpdate,
  spuAttr,
  spuImage,
  typeReqFindsku,
  typeReqSaveInfo
} from '@/api/product/spu/type'
import request from '@/utils/request'
export enum API {
  GETSPU_URL = '/admin/product', //获取spu方法 GET方法 /admin/product/{page}/{limit}?{C3id}
  GETSPUTrademark_URL = '/admin/product/baseTrademark/getTrademarkList', //获取spu品牌列表 GET方法 /admin/product/baseTrademark/getTrademarkList
  spuImageList_URL = '/admin/product/spuImageList', //获取sku图片的方法 GET方法 /admin/product/spuImageList/{spuId}
  spuAttrList_URL = '/admin/product/spuSaleAttrList', //获得某一个spu下已有的销售属性 GET方法 /admin/product/spuSaleAttrList/{spuId}
  baseSaleAttrList_URL = '/admin/product/baseSaleAttrList', //获得整个项目的销售属性【颜色，尺码，版本】 GET方法 /admin/product/baseSaleAttrList
  saveSpuInfo_URL = '/admin/product/saveSpuInfo', //添加spu POST方法 /admin/product/saveSpuInfo 需要一个数据为参数，内无id
  updateSpuInfo_URL = '/admin/product/updateSpuInfo', //修改spu POST方法 /admin/product/updateSpuInfo 需要一个数据为参数，内有id
  saveSkuInfo_URL = '/admin/product/saveSkuInfo', // 添加sku的方法 POST方法 /admin/product/saveSkuInfo
  findSku_URL = '/admin/product/findBySpuId', //获取sku的方法，用于展示sku GET方法 /admin/product/findBySpuId/{spuId}
  deleteSpu_URL = '/admin/product/deleteSpu' //删除spu DELETE方法 /admin/product/deleteSpu/{spuId}
}
//spu展示列表的方法
export const getSpu = (page: number, limit: number, C3id: string | number) => {
  return request.get<unknown, BaseSpu>(
    `${API.GETSPU_URL}/${page}/${limit}?category3Id=${C3id}`
  )
}
//获取品牌列表的方法
export const getSPUTrademark = () => {
  return request.get<unknown, getTrademarkList>(API.GETSPUTrademark_URL)
}
//获取SKU图片的方法
export const spuImageList = (spuId: number | string) => {
  return request.get<unknown, spuImage>(`${API.spuImageList_URL}/${spuId}`)
}
//获取获得某一个spu下已有的销售属性的方法
export const spuAttrList = (spuId: number | string) => {
  return request.get<unknown, spuAttr>(`${API.spuAttrList_URL}/${spuId}`)
}
//获取全部的销售属性的方法
export const reqBaseAttrList = () => {
  return request.get<unknown, BaseAttrList>(API.baseSaleAttrList_URL)
}
//添加spu的方法
export const reqAddSpu = (data: addOrUpload) => {
  return request.post<unknown, reqAddOrUpdate>(API.saveSpuInfo_URL, data)
}
//修改spu的方法
export const reqUploadSpu = (data: addOrUpload) => {
  return request.post<unknown, reqAddOrUpdate>(API.updateSpuInfo_URL, data)
}
//添加sku的方法
export const reqSaveInfo = (data: addSkuParams) => {
  return request.post<unknown, typeReqSaveInfo>(API.saveSkuInfo_URL, data)
}
//展示sku的方法
export const reqFindSku = (spuId: number | string) => {
  return request.get<unknown, typeReqFindsku>(`${API.findSku_URL}/${spuId}`)
}
//删除sku得方法
export const reqDeleteSku = (spuId: number | string) => {
  return request.delete<unknown, ReqDeleteSku>(`${API.deleteSpu_URL}/${spuId}`)
}
