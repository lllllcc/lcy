import type {
  BaseAttrList,
  getTrademarkList,
  spuAttrData
} from '@/api/product/spu/type'
import { defineStore } from 'pinia'
type State = {
  SpuView: number
  trademarkList: getTrademarkList['data']
  spuId: number
  ImageList: {
    id?: number
    imgName: string
    imgUrl: string
    spuId?: number
    createTime?: string
    updateTime?: string
  }[]
  AttrList: spuAttrData
  BaseAttrList: BaseAttrList['data']
}
const useSpu = defineStore('useSpu', {
  state: (): State => {
    return {
      SpuView: 0,
      trademarkList: [],
      spuId: 0,
      ImageList: [],
      AttrList: [],
      BaseAttrList: []
    }
  },
  actions: {},
  getters: {}
})
export default useSpu
