<template>
  <!-- 使用ele的card创造卡片 -->
  <el-card class="box-card">
    <!-- 删除标头，加入button(添加品牌模板) -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      text
      @click="changeButton"
    >
      添加品牌
    </el-button>

    <!-- 隐藏的对话框，当点击时展开（表单形式） -->
    <!-- v-model-控制对话框的显示与隐藏
    title-添加品牌
   -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="TradeMarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <!-- 表单元素
      form为表单元素
    label为模板展示文字
  label-width为模板宽度 -->
      <el-form :rules="rules" :model="TradeMarkParams" ref="refForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input
            v-model="TradeMarkParams.tmName"
            autocomplete="off"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!-- 使用插槽，传一个上传文件的组件过来 -->
          <!-- action-上传请求地址（这里主动加了/api，否则地址报错） -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- 决定了是否展示图片 -->
            <img
              v-if="TradeMarkParams.logoUrl"
              :src="
                TradeMarkParams.logoUrl.startsWith('http')
                  ? TradeMarkParams.logoUrl
                  : `http://${TradeMarkParams.logoUrl}`
              "
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 通过具名插槽传入操作项 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click="submitForm(refForm)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 插入表格 -->
    <el-table
      :data="getHasTrademark"
      border
      style="width: 100%; margin: 10px 0px"
    >
      <!-- label 标题名称
      width 列宽度
      align 对齐方式
      其中table中的data是用来决定几行数据的，几个数组元素就是几个数据
      -->
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="tmName" label="品牌名称" width="180" />
      <!-- 对于el-column,其可以使用插槽
      插槽需要接收参数（参数名不可以改）作用域参数为{ row, column, $index } 
    在这里row为已有品牌的对象
  index为数组索引值-->
      <el-table-column label="品牌LOGO">
        <!-- 图像等东西无法通过prop去展示，所以使用插槽 -->
        <template v-slot="{ row }">
          <img
            :src="
              row.logoUrl.startsWith('http')
                ? row.logoUrl
                : `http://${row.logoUrl}`
            "
            alt=""
            style="height: 100px; width: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm title="确定删除吗?" @confirm="deleteTrademark(row)">
            <template #reference>
              <el-button type="primary" icon="Delete" size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器部分 -->
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
        :page-sizes="[3, 6, 9, 12]"
        :disabled="disabled"
        :background="background"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="getTotal"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
    <!-- v-model 用于传参
     -->
  </el-card>
</template>
<script setup lang="ts">
//引入api
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqGetTrademark
} from '@/api/product/trademark/index'
import type { responseUpdateTrademark } from '@/api/product/trademark/type'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, type UploadProps } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

//table的数据
let page = ref<number>(1)
let limit = ref<number>(3)
//响应的品牌数据
let getTotal = ref(0) //总条数
let getHasTrademark = ref() //品牌数据
//表单验证(自定义)
const refForm = ref()
onMounted(() => {
  GetTrademark()
})
const GetTrademark = async () => {
  const result = await reqGetTrademark(page.value, limit.value)
  if (result.code === 200) {
    // console.log('品牌数据获取成功')
    getTotal.value = result.data.total
    getHasTrademark.value = result.data.records
  } else {
    console.log('品牌数据获取失败')
  }
}

// 分页器的数据与配置
const currentPage4 = ref(1)
const pageSize4 = ref(3)
const background = ref(true)
const disabled = ref(false)
//分页器的事件
//展示数量修改时调用的函数
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  limit.value = val
  page.value = 1
  GetTrademark()
}
//页数改变时触发的事件
const pageChange = (val: number) => {
  console.log(`current page: ${val}`)
  page.value = val
  GetTrademark()
  //调用时发送请求
}
//
//卡片上部的添加功能
//
//决定对话框是否显示以及对话框的宽度
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//点击事件（取消，添加，修改，确认等）
//放数据的地方
//添加与修改
let TradeMarkParams = reactive<{
  id: number
  tmName: string
  logoUrl: string
  createTime: string
  updateTime: string
}>({
  tmName: '',
  logoUrl: '',
  id: 0,
  createTime: '',
  updateTime: ''
})
//添加与修改
const addTrademark = async () => {
  //表单验证
  refForm.value.validate()
  const result = await reqAddOrUpdateTrademark(TradeMarkParams)
  if (result.code === 200) {
    if (TradeMarkParams.id) {
      ElMessage({ type: 'success', message: '修改成功' })

      GetTrademark()
      console.log(result)
    } else {
      ElMessage({ type: 'success', message: '添加成功' })
      GetTrademark()
    }
  } else {
    ElMessage({ type: 'error', message: '操作失败' })
  }
  dialogFormVisible.value = false
}
//取消
const cancelDialog = () => {
  dialogFormVisible.value = false
}
//修改
const updateTrademark = async (row: responseUpdateTrademark) => {
  // console.log(row)
  TradeMarkParams.id = row.id
  TradeMarkParams.tmName = row.tmName
  TradeMarkParams.logoUrl = row.logoUrl
  refForm.value?.clearValidate()
  dialogFormVisible.value = true
}
//删除
const deleteTrademark = async (row: responseUpdateTrademark) => {
  const result = await reqDeleteTrademark(row.id)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    GetTrademark()
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
//关于文件上传组件的数据（ele cv）
//文件上传前调用的函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //要求是png，jpeg（jpg），gif，且大小为4mb以下
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({ type: 'error', message: '文件大小错误,应小于4MB' })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '文件格式错误,仅支持jpg(jpeg)/png/gif'
    })
    return false
  }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  if (response.code === 200) {
    refForm.value.clearValidate('logoUrl')
    TradeMarkParams.logoUrl = response.data
  } else {
    ElMessage({ type: 'error', message: '上传失败' })
  }
}
//清空数据的钩子
//可以在请求函数里写 ，但是这样需要写很多次，在这里直接封装在按钮上可以更巧妙
const changeButton = () => {
  TradeMarkParams.tmName = ''
  TradeMarkParams.logoUrl = ''
  TradeMarkParams.id = 0
  if (refForm.value) {
    refForm.value.clearValidate()
  }
  dialogFormVisible.value = true
}

//其接受3个参数rule value callback
//分别为 规则对象，表单内容，放行函数
const validatorTmName = (
  _rule: unknown,
  value: string,
  callback: (error?: string | Error | undefined) => void
) => {
  //这里可以写正则
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('名称应该大于等于两位'))
  }
}
const validatorLogoUrl = (
  _rule: unknown,
  value: File,
  callback: (error?: string | Error | undefined) => void
) => {
  //这里可以写正则
  if (value) {
    callback()
  } else {
    callback(new Error('logo必须上传'))
  }
}
//rules包含了所有得表单规则，使用prop选择
const rules: FormRules = {
  //数组中的每一个对象都表示了一个规则
  tmName: [
    //required表示是否必须，trigger表示什么时候判定，有两种（change与blur），blur则为失去焦点时判定，change则是改变时判定
    //validator表示校验规则（自定义），他需要的是一个方法(需要定义，当满足trigger时调用，这里是失焦时调用)
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }]
}
//绑定了确定按钮得函数，可以校验所有表单内容，不满足则不执行
//如果没有这个，则只是校验，并不会影响结果
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    //validate会返回一个promise对象，其返回值为布尔值，可以用来判断是否继续后续语句
    if (valid) {
      addTrademark()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'trademark'
}
</script>
<style scoped lang="scss">
//对话框的样式
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
//上传文件样式
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
/* 分页器组件部分 */
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
