// sku的类型
// sku的共有请求类型
export type typeReqGetSku = {
  code: number
  message: string
  data: {
    records: skuData
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
  ok: boolean
}
// sku数据类型
export type skuData = {
  id: number
  spuId: number
  price: number
  skuName: string
  skuDesc: string
  weight: number
  tmId: number
  category3Id: number
  skuDefaultImg: string
  isSale: number
  createTime: string
  skuImageList: null
  skuAttrValueList: null
  skuSaleAttrValueList: null
}[]
// 下架 上架sku得响应类型
export type ReqCancelSale = {
  code: number
  message: string
  data: string | null
  ok: boolean
}
// 获取抽屉数据的请求类型
export type ReqGetSkuById = {
  code: number
  message: string
  data: {
    id?: number
    spuId: number | string
    price: number | string
    skuName: string
    skuDesc: string
    weight: string | string
    tmId: number
    category3Id: number
    skuDefaultImg: string
    isSale?: number
    createTime: string
    skuImageList: {
      id: number
      skuId: number
      imgName: string
      imgUrl: string
      spuImgId: number
      isDefault: string
    }[]
    skuAttrValueList: {
      id: number
      attrId: number
      valueId: number
      skuId: number
      attrName: string
      valueName: string
    }[]
    skuSaleAttrValueList: {
      id: number
      skuId: number
      spuId: number
      saleAttrValueId: number
      saleAttrId: number
      saleAttrName: string
      saleAttrValueName: string
    }[]
  }
  ok: boolean
}
