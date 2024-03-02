<template>
  <el-form>
    <el-form-item label="sku名称">
      <el-input
        placeholder="请输入sku名称"
        v-model="skuParams.skuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="重量(克)" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        autosize
        type="textarea"
        placeholder="sku描述"
        v-model="skuParams.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <!-- 另一个表单 -->
      <!-- 全部的属性 -->
      <el-form :inline="true">
        <el-form-item
          v-for="item in allAttr"
          :label="item.attrName"
          :key="item.id"
          label-width="4em"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="item1 in item.attrValueList"
              :value="`${item.id}:${item1.id}`"
              :label="item1.valueName"
              :key="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <!-- 已有的销售属性 -->
        <el-form-item
          v-for="item in saleList"
          :label="item.saleAttrName"
          :key="item.id"
          label-width="4em"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="item1 in item.spuSaleAttrValueList"
              :label="item1.saleAttrValueName"
              :key="item1.id"
              :value="`${item.id}:${item1.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <!-- 表格 -->
      <el-table border :data="ImageList" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <!-- 表格自定义插槽 -->
          <template #default="scope">
            <img
              :src="scope.row.imgUrl"
              alt="图片加载失败了"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <!-- 表格自定义插槽 -->
          <template #default="scope">
            <el-button type="warning" size="small" @click="handler(scope.row)"
              >设置默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label-width="4.5em">
      <el-button type="primary" @click="saveSku">保存</el-button>
      <el-button @click="skuCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import useSpu from '@/store/modules/Spu'
// 获取数据的引入
import { reqattrInfoList } from '@/api/product/attr'
// 照片墙方法的引入
import type { tAttr } from '@/api/product/attr/type'
import { reqSaveInfo, spuAttrList, spuImageList } from '@/api/product/spu/index'
import type {
  BaseSpuDataRecords,
  addSkuParams,
  skuAttr,
  skuValue,
  spuAttrData,
  spuImage
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
//仓库
const useStoreSpu = useSpu()
//父组件index点击添加sku后请求过来的变量存储
const allAttr = ref<tAttr[]>([])
const ImageList = ref<spuImage['data']>([])
const saleList = ref<spuAttrData>([])
// sku参数
const skuParams = ref<addSkuParams>({
  category3Id: '', //三级分类id
  spuId: '', //哪个三级分类下已有的spu的id
  tmId: '', //spu品牌的id
  skuName: '', //新增的sku名称
  price: '', //新增的sku价格
  weight: '', //新增sku的重量
  skuDesc: '', //新增sku的描述
  //平台属性的收集
  skuAttrValueList: [],
  //销售属性
  skuSaleAttrValueList: [],
  skuDefaultImg: '' //图片地址
})
//图片table的组件实例对象
let table = ref()
// sku取消事件
const skuCancel = () => {
  //切换场景
  useStoreSpu.SpuView = 0
  //置空数据
  skuParams.value = {
    category3Id: '', //三级分类id
    spuId: '', //哪个三级分类下已有的spu的id
    tmId: '', //spu品牌的id
    skuName: '', //新增的sku名称
    price: '', //新增的sku价格
    weight: '', //新增sku的重量
    skuDesc: '', //新增sku的描述
    //平台属性的收集
    skuAttrValueList: [],
    //销售属性
    skuSaleAttrValueList: [],
    skuDefaultImg: '' //图片地址
  }
}
//sku获取数据的方法
const getSku = async (
  C1id: number | string,
  C2id: number | string,
  spuRow: BaseSpuDataRecords[0]
) => {
  // 获取数据
  let result = await reqattrInfoList(C1id, C2id, spuRow.category3Id)
  if (result.code === 200) {
    //把请求过来的数据存储
    allAttr.value = result.data
  } else {
    ElMessage({ type: 'error', message: result.message })
  }
  //获取照片墙
  let result1 = await spuImageList(spuRow.id!)
  if (result1.code === 200) {
    //把请求过来的数据存储
    ImageList.value = result1.data
  } else {
    ElMessage({ type: 'error', message: result1.message })
  }
  //获取对应的已有的销售属性
  let result2 = await spuAttrList(spuRow.id!)
  if (result2.code === 200) {
    //把请求过来的数据存储
    saleList.value = result2.data
  } else {
    ElMessage({ type: 'error', message: result2.message })
  }
  //把父组件传递过来的数据给收集一下
  skuParams.value.category3Id = spuRow.category3Id
  skuParams.value.tmId = spuRow.tmId
  skuParams.value.spuId = spuRow.id!
}
// 设置默认的点击事件
const handler = (row: spuImage['data'][0]) => {
  //遍历表格数据，点击时，确保他们每个都是未勾选，用来保证只有一个可以被勾选
  ImageList.value.forEach((item: spuImage['data'][0]) => {
    table.value.toggleRowSelection(item, false)
  })
  //表格事件，当点击默认后去勾选复选框
  table.value.toggleRowSelection(row, true)
  // 存图片地址数据
  skuParams.value.skuDefaultImg = row.imgUrl
}
// 保存按钮的事件（添加sku的按钮事件）
const saveSku = async () => {
  let attrArr = allAttr.value.reduce((prev, next) => {
    // 平台属性的收集
    if (next.attrIdAndValueId) {
      // 解构数组，把split截出来的两个值解构出来
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        // split是字符串的方法，可以用来分割字符串
        attrId,
        valueId
      })
    }
    // reduce需要有返回值
    return prev
  }, [] as skuAttr[])
  //赋值
  skuParams.value.skuAttrValueList = attrArr
  let ValueArr = saleList.value.reduce((prev, next) => {
    // 销售属性的收集
    if (next.saleIdAndValueId) {
      // 解构数组，把split截出来的两个值解构出来
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        // split是字符串的方法，可以用来分割字符串
        saleAttrId,
        saleAttrValueId
      })
    }
    // reduce需要有返回值
    return prev
  }, [] as skuValue[])
  //赋值
  skuParams.value.skuSaleAttrValueList = ValueArr
  // 发送请求，添加sku
  let result = await reqSaveInfo(skuParams.value)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: result.message })
  } else {
    ElMessage({ type: 'error', message: result.message })
  }

  //切换场景
  useStoreSpu.SpuView = 0
  //置空数据
  skuParams.value = {
    category3Id: '', //三级分类id
    spuId: '', //哪个三级分类下已有的spu的id
    tmId: '', //spu品牌的id
    skuName: '', //新增的sku名称
    price: '', //新增的sku价格
    weight: '', //新增sku的重量
    skuDesc: '', //新增sku的描述
    //平台属性的收集
    skuAttrValueList: [],
    //销售属性
    skuSaleAttrValueList: [],
    skuDefaultImg: '' //图片地址
  }
}
//把sku组件暴露出去，便于使其他组件调用方法
defineExpose({
  getSku
})
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'skuForm'
}
</script>
<style scoped lang="scss"></style>
