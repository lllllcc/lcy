<template>
  <!-- 因为这个组件复用性高，所以注册为全局组件 -->
  <el-card>
    <!-- 上部卡片组件表单 -->
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- label是显示的文字，value则是收集的数据 -->
        <el-select
          placeholder="一级分类"
          v-model="useCategoryStore.C1id"
          :disabled="!useCategoryStore.scene"
          @change="handler(1)"
        >
          <el-option
            v-for="item in useCategoryStore.C1arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="Select"
          v-model="useCategoryStore.C2id"
          :disabled="!useCategoryStore.scene"
          @change="handler(2)"
        >
          <el-option
            v-for="item in useCategoryStore.C2arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="Select"
          v-model="useCategoryStore.C3id"
          :disabled="!useCategoryStore.scene"
          @change="handler(3)"
        >
          <el-option
            v-for="item in useCategoryStore.C3arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        /></el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import useCategory from '@/store/modules/Category'
import { onMounted } from 'vue'
//引入仓库
const useCategoryStore = useCategory()

// //三级分类的数据
// let C3arr = ref<any>()
//一挂载就请求数据
onMounted(() => {
  useCategoryStore.getC1()
})
const handler = async (a: number) => {
  //防止历史遗留问题影响请求参数
  useCategoryStore.allAttr = []
  if (a === 1) {
    useCategoryStore.C2id = ''
    useCategoryStore.C3id = ''
    useCategoryStore.getC2()
  } else if (a === 2) {
    useCategoryStore.C3id = ''
    useCategoryStore.getC3()
  } else {
    await getAttrInfoList()
    // console.log(useCategoryStore.allAttr)
  }
}
const getAttrInfoList = async () => {
  if (useCategoryStore.C3id) {
    //防止历史遗留问题影响请求参数
    useCategoryStore.allAttr = []
    await useCategoryStore.attrInfoList()
  } else {
    return
  }
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'Category'
}
</script>
<style scoped lang="scss"></style>
