<template>
  <el-card style="margin: 10px 0px; height: 75px">
    <el-form :inline="true" class="el-form-search">
      <el-form-item label="角色名称:">
        <el-input placeholder="角色名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="keyword ? false : true"
          @click="searchUser"
          >搜索</el-button
        >
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
    <el-dialog
      v-model="centerDialogVisible"
      title="添加角色"
      width="30%"
      align-center
    >
      <el-form>
        <el-form-item label="角色名字">
          <el-input
            placeholder="请输入角色名字"
            v-model="userParams1.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRole"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table style="margin: 10px 0px" border :data="roleParams?.records">
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="角色名称"
        align="center"
        prop="roleName"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作" width="360px">
        <!-- 自定义 -->
        <template #default="scope">
          <el-button
            type="primary"
            icon="User"
            size="small"
            @click="fenpei(scope.row)"
          >
            分配权限
          </el-button>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="updateRole(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除吗" @confirm="deleteUser(scope.row)">
            <template #reference>
              <el-button type="primary" icon="Delete" size="small"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 15, 20, 30]"
        :disabled="disabled"
        :background="background"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="roleParams?.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>

    <!-- 分配角色抽屉 -->
    <el-drawer
      v-model="drawer1"
      title="分配角色"
      :lock-scroll="true"
      direction="rtl"
    >
      <template #default>
        <!-- 树形控件 -->
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="assignArr"
          :props="defaultProps"
          ref="tree"
        />
      </template>
      <template #footer>
        <div>
          <el-button @click="cancelUser1">取消</el-button>
          <el-button type="primary" @click="saveUser1">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>
<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqDeleteRole,
  reqDoAssignAcl,
  reqGetRole,
  reqToAssignAll
} from '@/api/Control/roler'
import type {
  ReqGetRole,
  ReqToAssignAll,
  roleParams1
} from '@/api/Control/roler/type'

import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
// // 控制是否半选
// const isIndeterminate = ref(true)
// // 控制是否全选的属性数据
// const checkAll = ref(false)
// 搜索所需的参数
const keyword = ref<string>('')
// 用户数据
let roleParams = ref<ReqGetRole['data']>()
// 收集来的用户信息
let userParams1 = ref<roleParams1>({
  roleName: '',
  id: ''
})
// 控制dialog对话框的数据
const centerDialogVisible = ref<boolean>(false)
// 分页器的数据与配置
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const background = ref(true)
const disabled = ref(false)
// 分配角色抽屉的数据
let drawer1 = ref<boolean>(false)
// 树形控件的结构
const defaultProps = {
  children: 'children',
  label: 'name'
}
const treeData = ref<ReqToAssignAll['data']>([])

//分页器的事件
//展示数量修改时调用的函数
const handleSizeChange = async (val: number) => {
  // console.log(`${val} items per page`)
  // 修改申请参数
  pageSize4.value = val
  // 更新页面
  await getRole(currentPage4.value, pageSize4.value)
}
//页数改变时触发的事件
const pageChange = async (val: number) => {
  // 修改申请参数
  currentPage4.value = val
  // 更新页面
  await getRole(currentPage4.value, pageSize4.value)
}
// 一挂载就获取用户数据
onMounted(async () => {
  await getRole(currentPage4.value, pageSize4.value)
})
// 获取用户的数据
const getRole = async (page: number, limit: number, username?: string) => {
  let result = await reqGetRole(page, limit, username as string)
  if (result.code === 200) {
    // console.log(result.data)
    roleParams.value = result.data
  } else {
    ElMessage({ type: 'error', message: '数据加载失败' })
  }
}
// 抽屉相关的事件
// 修改用户信息
const updateRole = (row: roleParams1) => {
  centerDialogVisible.value = true
  // 覆盖数据
  Object.assign(userParams1.value, row)
}
// 添加用户信息
const addRole = () => {
  centerDialogVisible.value = true
  // 清空数据
  Object.assign(userParams1.value, {
    roleName: '',
    id: ''
  })
}
let assignArr = ref<number[]>([])
// 分配角色的事件
const fenpei = async (row: roleParams1) => {
  drawer1.value = true
  // 覆盖数据
  Object.assign(userParams1.value, row)
  //  获取数据
  let result = await reqToAssignAll(row.id as number)
  if (result.code === 200) {
    treeData.value = result.data
    // // 清空数据
    assignArr.value = []
    getAssignArr(treeData.value, assignArr.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
const getAssignArr = (
  treeData: ReqToAssignAll['data'],
  assignArr: number[]
) => {
  treeData.forEach((element) => {
    if (element.select === true) {
      assignArr.push(element.id)
    } else if (element.children && element.children.length > 0) {
      getAssignArr(element.children, assignArr)
    }
  })
}
// 分配角色的取消按钮
const cancelUser1 = () => {
  drawer1.value = false
}
// tree组件的实例
const tree = ref()
// 分配角色的保存按钮
const saveUser1 = async () => {
  let result = await reqDoAssignAcl({
    permissionIdList: tree.value.getCheckedKeys(),
    roleId: Number(userParams1.value.id!)
  })
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data ?? result.message
    })
  }
  drawer1.value = false
  // // 更新页面
  // await getRole(currentPage4.value, pageSize4.value)
}
// 单个删除用户事件
const deleteUser = async (row: roleParams1) => {
  let result = await reqDeleteRole(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data ?? result.message
    })
  }
  // 更新页面
  await getRole(currentPage4.value, pageSize4.value)
}

// 搜索事件
const searchUser = async () => {
  await getRole(currentPage4.value, pageSize4.value, keyword.value)
}
// 重置事件
const reset = async () => {
  keyword.value = ''
  await getRole(currentPage4.value, pageSize4.value)
}
// 新增或者修改的保存按钮
const saveRole = async () => {
  centerDialogVisible.value = false
  let result = await reqAddOrUpdateRole(userParams1.value)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: result.message })
    // 重新加载页面
    getRole(currentPage4.value, pageSize4.value)
  } else {
    ElMessage({ type: 'error', message: result.message })
  }
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'roler'
}
</script>
<style scoped lang="scss">
.el-form-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// checkbox的样式
.checkbox11 {
  flex-direction: column;
}
// 对话框样式
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
