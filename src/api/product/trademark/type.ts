//trademark相关的类型配置
//获取品牌类型
export interface responseTrademark {
  code: number
  message: string
  data: {
    records: { id?: number; tmName: string; logoUrl: string }[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
  ok: boolean
}
//添加品牌类型
export interface responseAddTrademark {
  code: number
  message: string
  data: null
  ok: boolean
}
export interface responseUpdateTrademark {
  id: number
  tmName: string
  logoUrl: string
  createTime: string
  updateTime: string
}
export interface responseDeleteTrademark {
  code: number
  data: object
  message: string
  ok: boolean
}
