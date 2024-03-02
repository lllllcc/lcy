import { defineStore } from 'pinia'
// 用于存放tabbar中相关的数据的
const useSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      iconChange: false, //用于控制菜单的折叠效果
      refsh: false //用于控制刷新效果
    }
  }
})
export default useSettingStore
