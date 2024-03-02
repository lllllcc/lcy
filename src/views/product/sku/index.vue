<template>
  <el-card>
    <el-table
      border
      style="margin: 10px 0 20px 0"
      :data="skuParams?.records"
      height="600"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="100px"
      ></el-table-column>
      <el-table-column
        label="名称"
        align="center"
        width="200px"
        prop="skuName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="描述"
        align="center"
        width="200px"
        prop="skuDesc"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="默认图片" align="center" width="200px">
        <template #default="scope">
          <img
            :src="scope.row.skuDefaultImg"
            alt="图片加载失败了"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(克)"
        align="center"
        width="200px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        align="center"
        width="200px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="450px" fixed="right">
        <template #default="scope">
          <el-button
            :type="scope.row.isSale ? 'success' : 'info'"
            :icon="scope.row.isSale ? 'Bottom' : 'Top'"
            size="small"
            @click="handler(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="uploadSku()"
          ></el-button>
          <el-button
            type="info"
            icon="InfoFilled"
            size="small"
            @click="checkInfo(scope.row)"
          ></el-button>
          <el-popconfirm title="是否要删除" @confirm="deleteSku(scope.row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <!--  v-model:current-page--设置分页器当前页码
         v-model:page-size="pageSize4"--设置分页器显示多少个页
          :disabled--是否禁用分页
          :background="background"--是否为按钮加背景色
          layout--组件展示顺序模板,字符串表示，顺序为展示顺序，而->则可以用来改变布局，使xxx去某个方向
           :total--总条目数
       -->
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :disabled="disabled"
        :background="background"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="skuParams?.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
    <!-- 抽屉 -->
    <el-drawer
      v-model="drawer"
      title="查看商品详情"
      :lock-scroll="true"
      direction="rtl"
    >
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>名称</span></el-col>
        <el-col :span="18">{{ skuDrawer?.skuName }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>描述</span></el-col>
        <el-col :span="18">{{ skuDrawer?.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>价格</span></el-col>
        <el-col :span="18">{{ skuDrawer?.price }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>平台属性</span></el-col>
        <el-col :span="18">
          <!-- 标签 -->
          <el-tag
            style="margin: 0px 5px"
            v-for="item in skuDrawer?.skuAttrValueList"
            :key="item.id"
            >{{ item.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>销售属性</span></el-col>
        <el-col :span="18"
          ><el-tag
            v-for="item in skuDrawer?.skuSaleAttrValueList"
            :key="item.id"
            style="margin: 0px 5px"
            >{{ item.saleAttrValueName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row style="margin: 10px 0px">
        <el-col :span="6"><span>商品图片</span></el-col>
        <el-col :span="18">
          <!-- 走马灯（轮播图） -->
          <el-carousel
            :autoplay="true"
            :interval="1000"
            type="card"
            height="200px"
          >
            <el-carousel-item
              v-for="item in skuDrawer?.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt="图片加载失败"
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>
<script setup lang="ts">
import {
  reqCancelSale,
  reqDeleteSku,
  reqGetSku,
  reqGetSkuById,
  reqOnSale
} from '@/api/product/sku'
import type {
  ReqGetSkuById,
  skuData,
  typeReqGetSku
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
// sku数据
let skuParams = ref<typeReqGetSku['data']>()
// 抽屉数据
let skuDrawer = ref<ReqGetSkuById['data']>()
// 分页器的数据与配置
let page = ref<number>(1)
let limit = ref<number>(10)
const currentPage4 = ref(1)
const pageSize4 = ref(3)
const background = ref(true)
const disabled = ref(false)
//控制抽屉的数据
let drawer = ref<boolean>(false)
//分页器的事件
//展示数量修改时调用的函数
const handleSizeChange = async (val: number) => {
  console.log(`${val} items per page`)
  limit.value = val
  page.value = 1
  // 更新后重新获取数据
  await getSku(page.value, limit.value)
}
//页数改变时触发的事件
const pageChange = async (val: number) => {
  console.log(`current page: ${val}`)
  page.value = val
  //调用时发送请求
  await getSku(page.value, limit.value)
}
// 获取sku数据的函数
const getSku = async (page: number, limit: number) => {
  let result = await reqGetSku(page, limit)
  if (result.code === 200) {
    skuParams.value = result.data
  } else {
    console.log(result.message)
  }
}
// 在一挂载得时候就调用
onMounted(async () => {
  await getSku(page.value, limit.value)
})
// 上架下架得事件
const handler = async (row: skuData[0]) => {
  // 如果isSale为1，则是上架状态，则调用下架请求
  if (row.isSale === 0) {
    let result = await reqOnSale(row.id)
    if (result.code === 200) {
      ElMessage({ type: 'success', message: '上架成功' })
      // 重新渲染
      await getSku(page.value, limit.value)
    } else {
      ElMessage({ type: 'error', message: '上架失败' })
    }
  } else {
    let result1 = await reqCancelSale(row.id)
    if (result1.code === 200) {
      ElMessage({ type: 'success', message: '下架成功' })
      // 重新渲染
      await getSku(page.value, limit.value)
    } else {
      ElMessage({ type: 'error', message: '下架失败' })
    }
  }
}
// 更新sku的方法
const uploadSku = () => {
  ElMessage({ type: 'success', message: '正在更新中' })
}
// 查看sku的方法
const checkInfo = async (row: skuData[0]) => {
  // 展示抽屉
  drawer.value = true
  // 获取展示数据
  let result = await reqGetSkuById(row.id)
  if (result.code === 200) {
    //  存抽屉数据
    skuDrawer.value = result.data
  } else {
    ElMessage({ type: 'error', message: result.message })
  }
}
const deleteSku = async (row: skuData[0]) => {
  let result = await reqDeleteSku(row.id)

  if (result.code === 200) {
    ElMessage({ type: 'success', message: result.message })
    // 重新加载数据
    await getSku(page.value, limit.value)
  } else {
    ElMessage({ type: 'error', message: result.data ?? result.message })
  }
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'sku'
}
</script>
<style scoped lang="scss">
/* 分页器组件部分 */
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
// 走马灯样式
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
