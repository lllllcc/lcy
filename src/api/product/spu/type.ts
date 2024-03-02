//spu相关的类型
export type BaseSpu = {
  code: number
  data: BaseSpuData
  message: string
  ok: boolean
}
//内部data
export type BaseSpuData = {
  current: number
  pages: number
  records: BaseSpuDataRecords
  searchCount: boolean
  size: number
  total: number
}
//data内部的record
export type BaseSpuDataRecords = {
  category3Id: string | number
  description: string
  id?: number | string
  spuImageList: RecordsSpuImageList[] //可能为null
  spuName: string
  spuSaleAttrList: getTrademarkList['data'] //可能为null
  tmId: number | string
}[]
export type RecordsSpuImageList = {
  id: number
  imgName: string
  imgUrl: string
  spuId: number
}
export type RecordsSpuSaleAttrList = {
  baseSaleAttrId: number
  id: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: {
    baseSaleAttrId: number
    id: number
    isChecked: string
    saleAttrName: string
    saleAttrValueName: string
    spuId: number
  }[]
}
export type getTrademarkList = {
  code: number
  data: {
    id: number
    logoUrl: string
    tmName: string
  }[]
  message: string
  ok: boolean
}
export type spuImage = {
  code: number
  data: {
    id: number
    imgName: string
    imgUrl: string
    spuId: number
  }[]
  message: string
  ok: boolean
}
export type spuAttr = {
  code: number
  data: spuAttrData
  message: string
  ok: boolean
}
//获取attrlist数据的类型
export type spuAttrData = {
  baseSaleAttrId: number
  id?: number
  saleAttrName: string
  spuId: number | string
  spuSaleAttrValueList: spuAttrList
  //用来存放销售属性的地方
  saleIdAndValueId?: string
}[]
//表格内容类型
export type spuAttrList = {
  baseSaleAttrId: number
  id?: number
  isChecked: string | null
  saleAttrName: string
  saleAttrValueName: string
  spuId: number | string
}[]
//全部数据响应类型
export type reqBaseAttr = {
  code: number
  data: {
    id: number
    name: string
  }[]
  message: string
  ok: boolean
}
//新增或修改的参数类型
export type addOrUpload = {
  spuName: string
  id?: number
  tmId: number | string
  category3Id: string | number
  description: string
  spuImageList: {
    id?: number
    imgName: string
    imgUrl: string
    spuId?: number
    createTime?: string
    updateTime?: string
  }[]
  spuSaleAttrList: spuAttrData
}
//新增或修改的响应类型
export interface reqAddOrUpdate {
  code: number
  data: null
  message: string
  ok: boolean
}
//下表格属性值的类型
export type AttrRow = {
  baseSaleAttrId: number
  createTime: null
  id?: number
  isChecked: null
  saleAttrName: string
  saleAttrValueName: string
  spuId: number
  updateTime: null
}
//全部属性的响应类型
export type BaseAttrList = {
  code: number
  data: {
    id: number
    name: string
  }[]
  message: string
  ok: boolean
}
// 添加sku的响应类型
export interface typeReqSaveInfo {
  code: number
  data: object
  message: string
  ok: boolean
}
//sku的请求参数类型
export type addSkuParams = {
  id?: number | string
  category3Id: number | string //三级分类id
  spuId: number | string //哪个三级分类下已有的spu的id
  tmId: number | string //spu品牌的id
  skuName: string //新增的sku名称
  price: number | string //新增的sku价格
  weight: number | string //新增sku的重量
  skuDesc: string //新增sku的描述
  //两个数组是必要的，只是为了防止ts报错而加问号
  //平台属性的收集
  skuAttrValueList?: skuAttr[]
  //销售属性
  skuSaleAttrValueList?: skuValue[]
  skuDefaultImg: string //图片地址
}
//addSkuParams下的平台属性类型
export interface skuAttr {
  attrId: number | string //平台属性的id
  valueId: number | string //平台属性值的id
}
//addSkuParams下的销售属性类型
export interface skuValue {
  saleAttrId: number | string //属性id
  saleAttrValueId: number | string //属性值id
}
//获取sku的响应类型
export type typeReqFindsku = {
  code: 200
  message: string
  data: addSkuParams[]
  // {
  //   id: number | string
  //   spuId: number | string
  //   price: number | string
  //   skuName: string
  //   skuDesc: string
  //   weight: string
  //   tmId: number
  //   category3Id: number
  //   skuDefaultImg: string
  //   isSale: number
  //   createTime: string
  //   skuImageList: null
  //   skuAttrValueList: null
  //   skuSaleAttrValueList: null
  // }[]
  ok: boolean
}
// 删除sku类型
export type ReqDeleteSku = {
  code: number
  message: string
  data: null | string
  ok: true
}
