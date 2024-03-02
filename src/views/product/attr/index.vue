<template>
  <!-- 上部卡片组件表单 -->
  <Category />

  <el-card style="margin: 10px 0">
    <!-- 添加按钮前展示 -->
    <div v-show="useCategoryStore.scene === true">
      <!-- 下部按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="useCategoryStore.C3id ? false : true"
        @click="changeScene"
        >添加属性</el-button
      >
      <!-- 下部表格 -->
      <el-table border style="margin: 10px 0" :data="useCategoryStore.allAttr">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="scope">
            <!-- 上面是具名插槽所以不能使用v-for ，下面用v-for遍历数组 -->
            <template v-for="item in scope.row.attrValueList" :key="item.id">
              <el-tag style="margin-left: 10px" v-if="item.valueName">{{
                item.valueName
              }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template #default="scope">
            <el-button icon="Edit" size="small" @click="updateAttr(scope.row)">
            </el-button>

            <el-popconfirm
              :title="`确定要删除${scope.row.attrName}吗?`"
              @confirm="deleteAttr(scope.row.id)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加按钮后展示内容 -->
    <div v-show="useCategoryStore.scene === false">
      <el-form>
        <el-form-item label="属性名称" style="width: 300px">
          <el-input
            placeholder="请输入属性名称"
            v-model="AttrParams.attrName"
          />
          <!-- 通过v-model收集输入的数据 -->
        </el-form-item>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="AttrParams.attrName ? false : true"
          @click="addAttrlist"
        >
          <!-- 利用attr名字判断是否禁用 -->
          添加属性值
        </el-button>
        <el-button @click="cancelChange1">取消</el-button>
        <!-- 通过表格收集attrlist中的数据 -->
        <el-table
          :data="AttrParams.attrValueList"
          border
          style="width: 100%; margin: 15px 0px 15px 0px"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column label="属性值名称">
            <template #default="scope">
              <el-input
                placeholder="请输入属性值名称"
                v-model="scope.row.valueName"
                v-if="scope.row.flag"
                @blur="toLook(scope.row, scope.$index)"
                :ref="
                  (vc: any) => {
                    inputArr[scope.$index] = vc
                  }
                "
              ></el-input>
              <!-- ref函数会在模板发生变化时调用，把组件实例传入数组中（用于在多个input时，可以聚焦第一项） -->
              <!-- 利用input的v-model收集数据 -->
              <div v-else @click="toEdit(scope.row, scope.$index)">
                {{ scope.row.valueName }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #default="scope">
              <el-button
                icon="Delete"
                type="danger"
                @click="deleteValueName(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="AddOrUpdateAttr"
          :disabled="AttrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <!-- 通过禁用效果防止发送无内容请求 -->
        <el-button size="default" @click="cancelChange">取消</el-button>
      </el-form>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttrDelete } from '@/api/product/attr/index'
import type { attrValue, tAttr } from '@/api/product/attr/type'
import useCategory from '@/store/modules/Category'

import { ElMessage } from 'element-plus'
import { nextTick, onBeforeMount, ref } from 'vue'
const useCategoryStore = useCategory()
//控制是否展示添加页面的变量
//在仓库中注册了
// let scene = ref<boolean>(true)
//添加按钮的响应函数
const changeScene = () => {
  useCategoryStore.scene = !useCategoryStore.scene
  AttrParams.value.categoryId = useCategoryStore.C3id
}
//上面取消的响应函数
const cancelChange1 = () => {
  useCategoryStore.scene = !useCategoryStore.scene
}
//下面取消的响应函数
const cancelChange = () => {
  useCategoryStore.scene = !useCategoryStore.scene
  //清空数据
  AttrParams.value = {
    attrName: '', //新增属性的名字
    categoryId: '', //三级分类中的id
    categoryLevel: 3, //几级分类，默认3级
    attrValueList: [] //新增属性值数组
  }
}
//收集新增属性的变量(所需参数)
let AttrParams = ref<tAttr>({
  attrName: '', //新增属性的名字
  categoryId: '', //三级分类中的id
  categoryLevel: 3, //几级分类，默认3级
  attrValueList: [] //新增属性值数组
})
//新增或者修改的函数
const AddOrUpdateAttr = async () => {
  //根据参数判断

  let result = await reqAddOrUpdateAttr(AttrParams.value)
  // console.log(result)

  if (result.code === 200) {
    useCategoryStore.scene = !useCategoryStore.scene
    //更新页面样子
    useCategoryStore.attrInfoList()
    ElMessage({
      type: 'success',
      message: AttrParams.value.id ? '修改成功' : '添加成功'
    })
  } else {
    useCategoryStore.scene = !useCategoryStore.scene
    ElMessage({
      type: 'error',
      message: AttrParams.value.id ? '修改失败' : '添加失败'
    })
  }
  AttrParams.value = {
    attrName: '', //新增属性的名字
    categoryId: '', //三级分类中的id
    categoryLevel: 3, //几级分类，默认3级
    attrValueList: [] //新增属性值数组
  }
}
//用点击添加绑定数据给添加表格看
const addAttrlist = () => {
  AttrParams.value.attrValueList.push({ valueName: '', flag: true })
  // console.log(AttrParams)
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
//删除属性值名称的函数
const deleteValueName = ($index: number) => {
  AttrParams.value.attrValueList.splice($index, 1)
}
// //定义一个变量去控制观察模式还是输入模式
// let flag = ref<boolean>(true)
//失焦时触发函数
const toLook = (row: attrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    //不仅仅是不能让他为空，还不能让他为空的上传到服务器去，所以给他删掉
    ElMessage({ type: 'error', message: '属性值不能为空' })
    AttrParams.value.attrValueList.splice($index, 1)
  } else {
    //用来判断有没有重复得中间变量
    let needPush = true
    //遍历数组
    for (let i = 0; i < AttrParams.value.attrValueList.length; i++) {
      if (
        AttrParams.value.attrValueList[i].valueName === row.valueName &&
        $index != i
      ) {
        needPush = false
        //使发现变化时，立马退出循环，提升效率
        break
      }
    }
    if (needPush == false) {
      AttrParams.value.attrValueList.splice($index, 1)
      ElMessage({ type: 'error', message: '属性值不能重复' })
    }
    row.flag = !row.flag
  }
}
const toEdit = (row: attrValue, $index: number) => {
  row.flag = !row.flag
  //用nextTick去获取组件实例，否则获取不到，因为在获取的时候vm还没有更新
  nextTick(() => {
    inputArr.value[$index].focus()
  })
  console.log($index)
}
//收集input，用来处理点击后获得焦点得数据
let inputArr = ref<{ focus: () => void }[]>([])
//修改事件
const updateAttr = (row: attrValue) => {
  useCategoryStore.scene = !useCategoryStore.scene
  // console.log(row)
  //使用es6中得对象合并方法（object.assign），把row（得到得数据赋值给请求参数）
  //但使用这个方法 会涉及深浅拷贝得 问题 会导致即使我修改了之后没发请求，页面数据仍然更新的情况，所以需要处理 利用json做深拷贝
  Object.assign(AttrParams.value, JSON.parse(JSON.stringify(row)))
}
//删除事件
const deleteAttr = async (attrId: number) => {
  console.log(attrId)
  let result = await reqAttrDelete(attrId)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    //成功后更新页面样式
    useCategoryStore.attrInfoList()
  } else {
    ElMessage({ type: 'error', message: `${result.message}` })
  }
}
//因为数据存在仓库中，所以切换路由得时候数据不会清空，所以引入生命周期函数销毁前处理数据
onBeforeMount(() => {
  //最笨的方法可以一个一个置空，但仓库提供了方法$reset()
  useCategoryStore.$reset()
})
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'attr'
}
</script>
<style scoped lang="scss"></style>
