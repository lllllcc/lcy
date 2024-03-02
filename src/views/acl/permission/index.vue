<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="name" label="名称" sortable />
    <el-table-column prop="code" label="权限值" sortable />
    <el-table-column prop="updateTime" label="修改时间" sortable />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="addPermission(scope.row)"
          >{{ scope.row.level === 3 ? '添加功能' : '添加菜单' }}</el-button
        >
        <el-button
          type="primary"
          size="small"
          :disabled="scope.row.level <= 1 ? true : false"
          @click="updatePermission(scope.row)"
          >编辑</el-button
        >
        <el-popconfirm
          title="确定要删除吗?"
          @confirm="deletePermission(scope.row)"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="scope.row.level <= 1 ? true : false"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框 -->
  <el-dialog
    v-model="centerDialogVisible"
    :title="title"
    width="500"
    align-center
  >
    <el-form>
      <el-form-item label-width="4em" label="名称">
        <el-input placeholder="名称" v-model="menuParams.name"> </el-input>
      </el-form-item>
      <el-form-item label-width="4em" label="权限值">
        <el-input placeholder="权限值" v-model="menuParams.code"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addOrUpdate"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  reqAddOrUpdate,
  reqDeletePermission,
  reqGetPermission
} from '@/api/Control/permission'
import type { GetPermission, Params } from '@/api/Control/permission/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
// 表格数据
const tableData = ref<GetPermission['data']>()
onMounted(async () => {
  await getTableData()
})
// 加载表格数据
const getTableData = async () => {
  let result = await reqGetPermission()
  if (result.code === 200) {
    tableData.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 控制对话框的数据
const centerDialogVisible = ref(false)
// 对话框的title数据
const title = ref()
// 菜单请求得参数
const menuParams = ref<Params>({
  name: '',
  level: 0,
  pid: 0,
  code: ''
})
// 添加菜单
const addPermission = (row: GetPermission['data'][number]) => {
  // 清空数据
  Object.assign(menuParams.value, {
    name: '',
    level: 0,
    pid: 0,
    code: ''
  })
  centerDialogVisible.value = true
  title.value = '添加菜单'
  // 收集数据
  menuParams.value.level = row.level + 1 //给下一条数据添加，所以加1
  menuParams.value.pid = row.id
}
// 编辑菜单
const updatePermission = (row: GetPermission['data'][number]) => {
  centerDialogVisible.value = true
  title.value = '编辑菜单'
  // 获取数据
  Object.assign(menuParams.value, row)
}
// 添加与修改
const addOrUpdate = async () => {
  // 发送请求
  let result = await reqAddOrUpdate(menuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
    // 重新加载表格数据
    getTableData()
    centerDialogVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 取消
const cancel = () => {
  centerDialogVisible.value = false
}
// 删除
const deletePermission = async (row: GetPermission['data'][number]) => {
  let result = await reqDeletePermission(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
    // 更新页面
    getTableData()
  } else {
    ElMessage({
      type: 'error',
      message: result.data ?? result.message
    })
  }
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'permission'
}
</script>
<style scoped lang="scss"></style>
