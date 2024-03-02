import { reqattrInfoList, reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import type {
  attr,
  tAttr,
  tC1arr,
  tC2arr,
  tC3arr
} from '@/api/product/attr/type'
import { defineStore } from 'pinia'
interface State {
  C1arr: tC1arr
  C1id: number | string
  //二级分类的数据
  C2arr: tC2arr
  C2id: number | string
  //三级分类数据
  C3arr: tC3arr
  C3id: number | string
  //属性数据
  allAttr: tAttr[]
  scene: boolean
}
const useCategory = defineStore('Category', {
  state: (): State => {
    return {
      //一级分类的数据
      C1arr: [],
      C1id: '',
      //二级分类的数据
      C2arr: [],
      C2id: '',
      //三级分类数据
      C3arr: [],
      C3id: '',
      //属性数据
      allAttr: [],
      //控制是否展示添加页面的变量
      scene: true
    }
  },
  actions: {
    //获取一级分类得方法
    getC1: async function () {
      const result = await reqC1()
      if (result.code === 200) {
        // console.log(result)
        this.C1arr = result.data
      } else {
        console.log('获取一级数据失败')
      }
    },
    // 获取二级分类的方法
    getC2: async function () {
      if (this.C1id) {
        const result = await reqC2(this.C1id)
        if (result.code === 200) {
          this.C2arr = result.data
        } else {
          console.log('获取一级数据失败')
        }
      }
    },
    //获取三级分类的方法
    getC3: async function () {
      if (this.C2id) {
        const result = await reqC3(this.C2id)
        if (result.code === 200) {
          this.C3arr = result.data
        } else {
          console.log('获取一级数据失败')
        }
      }
    },
    //获取分类属性
    attrInfoList: async function () {
      if (this.C3id && this.C2id && this.C1id) {
        const result: attr = await reqattrInfoList(
          this.C1id,
          this.C2id,
          this.C3id
        )
        console.log(result)
        if (result.code === 200) {
          this.allAttr = result.data
        } else {
          console.log('获取分类属性失败')
        }
      }
    },
    // 清空小仓库的数据
    clearStore: function () {
      this.C1arr = []
      this.C1id = ''
      this.C2arr = []
      this.C2id = ''
      this.C3arr = []
      this.C3id = ''
    }
  },
  getters: {}
})
export default useCategory
