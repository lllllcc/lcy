<template>
  <Category />
  <el-card style="margin: 10px 0">
    <!-- 默认场景 -->
    <div v-show="useStoreSpu.SpuView === 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="useStoreCategory.C3id ? false : true"
        @click="ViewChange1"
        >添加spu</el-button
      >
      <el-table border style="margin: 10px 0" :data="spuArr">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="SPU名称"
          prop="spuName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              icon="Plus"
              size="small"
              title="添加SKU"
              @click="addSku(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              title="修改SKU"
              @click="upDateSKU(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="View"
              size="small"
              title="查看SKU"
              @click="findSku(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              title="删除SKU"
              @click="deleteSku(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器部分 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[3, 6, 9, 12]"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getBaseSpu(currentPage4)"
          @size-change="getBaseSpu()"
        />
        <!-- 页码和一页多少条切换时，调用事件重新渲染页面 -->
      </div>
    </div>
    <!-- 添加/修改spu -->
    <!-- 通过prop父子间传参，把表格数据传递 -->
    <SPUForm
      v-show="useStoreSpu.SpuView === 1"
      :propData="rowData"
      :rowId="rowId"
      @success="getBaseSpu()"
    ></SPUForm>
    <!-- 添加/修改sku -->
    <SKUForm v-show="useStoreSpu.SpuView === 2" ref="refSku"></SKUForm>
    <!-- dialog对话框 -->
    <el-dialog title="SKU列表" align-center v-model="skudialog">
      <el-table border :data="findSkuParams">
        <el-table-column label="sku名字" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #default="scope">
            <img
              :src="scope.row.skuDefaultImg"
              alt="图片加载失败了"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
//分页器数据
import {
  getSpu,
  getSPUTrademark,
  reqBaseAttrList,
  reqDeleteSku,
  reqFindSku,
  spuAttrList,
  spuImageList
} from '@/api/product/spu/index'
import type { addSkuParams, BaseSpuDataRecords } from '@/api/product/spu/type'
import useCategory from '@/store/modules/Category'
import useSpu from '@/store/modules/Spu'
import { onBeforeUnmount, ref, watch } from 'vue'
//引入组件
import SKUForm from '@/views/product/spu/SKUForm.vue'
import SPUForm from '@/views/product/spu/SPUForm.vue'
import { ElMessage } from 'element-plus'

const useStoreCategory = useCategory()
const useStoreSpu = useSpu()
//分页器数据
const currentPage4 = ref(1) //页码
const pageSize4 = ref(3) //一页几条数据
const background = ref(true)
const disabled = ref(false)
let total = ref<number>()
const rowData = ref<BaseSpuDataRecords[0]>()
//spu所需要的id（所传参数）
const rowId = ref<number | string>(-1)
//sku的组件数据（需要获得sku组件实例）
const refSku = ref()
// 展示sku按钮数据
let findSkuParams = ref<addSkuParams[]>([])
// dialog对话框的显示参数
let skudialog = ref<boolean>(false)
//对第三分类进行监听
watch(
  () => useStoreCategory.C3id,
  () => {
    spuArr.value = []
    //确保一定有第三分类id
    if (!useStoreCategory.C3id) return
    getBaseSpu()
  }
)
//获取spu信息的函数
const getBaseSpu = async (Page4 = 1) => {
  //控制页码，默认为1，当页码调用的时候 会赋值覆盖这个
  currentPage4.value = Page4
  let result = await getSpu(
    currentPage4.value,
    pageSize4.value,
    useStoreCategory.C3id
  )
  if (result.code === 200) {
    //获取数组
    spuArr.value = result.data.records
    //获取总条数
    total.value = result.data.total
  } else {
    console.log('spu请求失败')
  }
}
//存放spu数据的变量
let spuArr = ref<BaseSpuDataRecords>([])
//切换展示内容得事件
const ViewChange1 = () => {
  useStoreSpu.SpuView = 1
  //清除数据
  rowData.value = {
    category3Id: useStoreCategory.C3id,
    description: '',
    spuImageList: [],
    spuName: '',
    spuSaleAttrList: [],
    tmId: ''
  }
  rowId.value = -1
  useStoreSpu.ImageList.length = 0
  useStoreSpu.AttrList.length = 0
  getBaseAttrList()
  // 数据
  getTrademark()
}
const upDateSKU = async (row: BaseSpuDataRecords[0]) => {
  useStoreSpu.SpuView = 1
  // 图片
  await spuImage(row.id!)
  // 数据
  getTrademark()

  // 加！的意思是一定有值
  // 未选
  spuAttr(row.id!)
  getBaseAttrList()
  rowData.value = row
  rowId.value = row.id!
}
//获取品牌列表的方法
const getTrademark = async () => {
  let result = await getSPUTrademark()
  if (result.code === 200) {
    useStoreSpu.trademarkList = result.data
  } else {
    console.log('品牌列表获取失败')
  }
}
const getBaseAttrList = async () => {
  let result = await reqBaseAttrList()
  if (result.code === 200) {
    useStoreSpu.BaseAttrList = result.data
  } else {
    console.log('错误')
  }
}
//获取sku图片的方法
const spuImage = async (supId: number | string) => {
  let result = await spuImageList(supId)
  if (result.code === 200) {
    // 使用map对数组进行操作，提取出所需属性，创建新数组，map有一个参数（回调函数），回调函数有两个参数item（数组中每一项）index（数组下角标）
    useStoreSpu.ImageList = result.data
    // .map((item) => {
    //   return { name: item.imgName, url: item.imgUrl }
    // })
  } else {
    console.log('品牌图片获取失败')
  }
}
//获取获得某一个spu下已有的销售属性的方法
const spuAttr = async (supId: number | string) => {
  let result = await spuAttrList(supId)
  if (result.code === 200) {
    useStoreSpu.AttrList = result.data
    console.log(useStoreSpu.AttrList)
  } else {
    console.log('销售属性获取失败')
  }
}
//添加sku（需要切换场景）
const addSku = (row: BaseSpuDataRecords[0]) => {
  //切换场景
  useStoreSpu.SpuView = 2
  //调用子组件方法，让子组件获取数据
  refSku.value.getSku(useStoreCategory.C1id, useStoreCategory.C2id, row)
}
//查看sku的方法
const findSku = async (row: addSkuParams) => {
  // 请求sku数据
  let result = await reqFindSku(row.id!)
  if (result.code === 200) {
    // 控制dialog展示
    skudialog.value = true
    // console.log(result)
    // 赋值
    findSkuParams.value = result.data
  } else {
    ElMessage({ type: 'error', message: result.message })
  }
}
// 删除sku得方法
const deleteSku = async (row: addSkuParams) => {
  let result = await reqDeleteSku(row.id!)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: result.message })
    // 重新展示数据
    getBaseSpu(currentPage4.value)
  } else {
    ElMessage({ type: 'error', message: result.message })
  }
}
// 每次路由组件销毁得时候清空小仓库数据
onBeforeUnmount(() => {
  useStoreCategory.$reset()
})
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'spu'
}
</script>
<style scoped lang="scss">
// 分页器样式
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
