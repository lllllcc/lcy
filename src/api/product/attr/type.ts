//一级分类请求类型
export interface C1 {
  code: number
  data: {
    id: number
    createTime: string
    updateTime: string
    name: string
  }[]
  message: string
  ok: boolean
}
//响应数据的类型
export type tC1arr = {
  id: number
  name: string
}[]
//二级分类请求类型
export type C2 = {
  code: number
  data: {
    id: number
    category1Id: number
    name: string
  }[]
  message: string
  ok: boolean
}
export type tC2arr = C2['data']
//三级分类请求类型
export type C3 = {
  code: number
  data: {
    id: number
    category2Id: number
    name: string
  }[]
  message: string
  ok: boolean
}
export type tC3arr = C3['data']
//分类请求响应的类型
export type attr = {
  code: number
  message: string
  data: tAttr[]
  ok: boolean
}
//请求数据的类型
export type tAttr = {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: attrValue[]
  //用来存放添加sku平台属性的变量类型
  attrIdAndValueId?: string
}
//数据数组内对象的类型
export interface attrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
//数据数组类型
export type attrValueList = attrValue[]
//新增或删除的响应类型
export interface resAddOrUpdate {
  code: number
  message: string
  data: string
  ok: boolean
}
//删除数据
export type AttrDelete = {
  code: number
  message: string
  data: string
  ok: boolean
}
