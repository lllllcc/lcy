<template>
  <el-card style="margin: 10px 0px; height: 75px">
    <el-form :inline="true" class="el-form-search">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
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
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button
      type="primary"
      @click="deleteSomeUser"
      :disabled="arrSelectChange.length === 0 ? true : false"
      >批量删除</el-button
    >
    <el-table
      style="margin: 10px 0px"
      border
      :data="userParams?.records"
      ref="table1"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="用户职位"
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
            分配角色
          </el-button>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="updateUser(scope.row)"
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
        :page-sizes="[5, 7, 9, 11]"
        :disabled="disabled"
        :background="background"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="userParams?.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
    <!-- 添加或修改抽屉 -->
    <el-drawer
      v-model="drawer"
      :title="userParams1.id ? '修改用户信息' : '添加用户信息'"
      :lock-scroll="true"
      direction="rtl"
    >
      <template #default>
        <el-form :model="userParams1" :rules="rules" ref="Reftable">
          <el-form-item label="用户名字" prop="username">
            <el-input
              placeholder="请输入用户名字"
              v-model="userParams1.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams1.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams1.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userParams1.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button @click="cancelUser">取消</el-button>
          <el-button type="primary" @click="saveUser(Reftable)">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配角色抽屉 -->
    <el-drawer
      v-model="drawer1"
      title="分配角色"
      :lock-scroll="true"
      direction="rtl"
    >
      <template #default>
        <el-form :model="userParams1">
          <el-form-item label="用户名字">
            <el-input v-model="userParams1.name" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="角色列表">
            <div class="checkbox11">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange(checkAll)"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="checkboxs1"
                @change="handleCheckedCitiesChange(checkboxs1)"
              >
                <el-checkbox
                  v-for="item in checkboxs"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.roleName }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
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
reqDeleteSomeUser,
reqDeleteUser,
reqDoAssignRole,
reqGetUser,
reqSaveAndUpdateUser,
reqToAssign
} from '@/api/Control/userControl'
import type {
Adduser,
AssignItem,
ReqGetUser,
UserData,
doAssignParams
} from '@/api/Control/userControl/type'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
// 控制是否半选
const isIndeterminate = ref(true)
// 控制是否全选的属性数据
const checkAll = ref(false)
// 搜索所需的参数
const keyword = ref<string>('')
// 用户数据
let userParams = ref<ReqGetUser['data']>()
// 收集来的用户信息
let userParams1 = ref<Adduser>({
  username: '',
  password: '',
  name: ''
})
// 分页器的数据与配置
const currentPage4 = ref(1)
const pageSize4 = ref(5)
const background = ref(true)
const disabled = ref(false)
// 添加或修改抽屉数据
let drawer = ref<boolean>(false)
// 分配角色抽屉的数据
let drawer1 = ref<boolean>(false)
// 抽屉表单dom
const Reftable = ref()
// checkbox遍历的数据
const checkboxs = ref<AssignItem[]>([])
// 已经选择的数据
const checkboxs1 = ref<number[]>([])
// 自定义校验回调
// 在blur时触发回调
// 添加表单校验规则
const rules: FormRules<typeof userParams1> = {
  name: [
    {
      required: true,
      message: '请输入用户昵称,5-8位且不能出现数字',
      trigger: 'blur',
      validator: (_rule, value, callback) => {
        // 利用正则进行判断
        const exp = /^[a-zA-Z\u4e00-\u9fa5]{5,7}$/
        if (exp.test(value)) {
          return callback()
        }
        callback(new Error('必须大于5位'))
      }
    }
  ],
  username: [
    {
      required: true,
      message: '请输入用户名字,5-8位且不能出现数字',
      trigger: 'blur',
      validator: (_rule, value, callback) => {
        // 利用正则进行判断
        const exp = /^[a-zA-Z\u4e00-\u9fa5]{5,7}$/
        if (exp.test(value)) {
          return callback()
        }
        callback(new Error('必须大于5位'))
      }
    }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 12,
      message: '密码必须大于6位小于12位数',
      trigger: 'blur'
    }
  ]
}

//分页器的事件
//展示数量修改时调用的函数
const handleSizeChange = async (val: number) => {
  // console.log(`${val} items per page`)
  // 修改申请参数
  pageSize4.value = val
  // 更新页面
  await getUser(currentPage4.value, pageSize4.value)
}
//页数改变时触发的事件
const pageChange = async (val: number) => {
  // 修改申请参数
  currentPage4.value = val
  // 更新页面
  await getUser(currentPage4.value, pageSize4.value)
}
// 一挂载就获取用户数据
onMounted(async () => {
  await getUser(currentPage4.value, pageSize4.value)
})
// 获取用户的数据
const getUser = async (page: number, limit: number, username?: string) => {
  let result = await reqGetUser(page, limit, username)
  if (result.code === 200) {
    // console.log(result.data)
    userParams.value = result.data
  } else {
    ElMessage({ type: 'error', message: '数据加载失败' })
  }
}
// 抽屉相关的事件
// 修改用户信息
const updateUser = (row: UserData) => {
  drawer.value = true
  // 覆盖数据
  Object.assign(userParams1.value, row)
  // 要在dom更新后清
  nextTick(() => {
    // 清除正则错误信息
    Reftable.value.clearValidate('name')
    Reftable.value.clearValidate('username')
    Reftable.value.clearValidate('password')
  })
}
// 添加用户信息
const addUser = () => {
  drawer.value = true
  // 清空数据
  Object.assign(userParams1.value, {
    // id: '',
    username: '',
    password: '',
    name: ''
  })
  // 要在dom更新后清
  nextTick(() => {
    // 清除正则错误信息
    Reftable.value.clearValidate('name')
    Reftable.value.clearValidate('username')
    Reftable.value.clearValidate('password')
  })
}
// 添加用户信息的保存按钮事件
const saveUser = async (Reftable: FormInstance | undefined) => {
  if (!Reftable) return
  await Reftable.validate(async (valid, fields) => {
    if (valid) {
      drawer.value = false
      let result = await reqSaveAndUpdateUser(userParams1.value)
      if (result.code === 200) {
        ElMessage({
          type: 'success',
          message: userParams1.value.id ? '修改成功' : '添加成功'
        })
        // 主动刷新 来达到更新id效果（如果修改的是当前账号时候）
        if (userParams1.value.id) {
          window.location.reload()
        }
      } else {
        ElMessage({
          type: 'error',
          message: userParams1.value.id ? '修改失败' : '添加失败'
        })
      }
    } else {
      console.log('有失败', fields)
    }
  })

  // 更新页面
  await getUser(currentPage4.value, pageSize4.value)
}
// 添加用户信息的取消按钮事件
const cancelUser = () => {
  drawer.value = false
}
// 分配角色的事件
const fenpei = async (row: UserData) => {
  drawer1.value = true
  // 展示数据
  Object.assign(userParams1.value, row)
  let result = await reqToAssign(row.id as number)
  if (result.code === 200) {
    // 获取所有数据
    checkboxs.value = result.data.allRolesList
    // 获取部分
    checkboxs1.value = result.data.assignRoles.map((element) => element.id)
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
}
// 分配角色的取消按钮
const cancelUser1 = () => {
  drawer1.value = false
}
// 分配角色的保存按钮
const saveUser1 = async () => {
  // 分配角色的请求参数
  const assginParams: doAssignParams = {
    roleIdList: checkboxs1.value,
    userId: userParams1.value.id as number
  }
  // 发请求
  let result = await reqDoAssignRole(assginParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: result.message
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
  drawer1.value = false
  // 更新页面
  await getUser(currentPage4.value, pageSize4.value)
}
// 全选的事件
const handleCheckAllChange = (val: boolean) => {
  checkboxs1.value = val ? checkboxs.value.map((element) => element.id) : []
  isIndeterminate.value = false
}
// 部分选择事件
const handleCheckedCitiesChange = (value: number[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === checkboxs.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < checkboxs.value.length
}
// 单个删除用户事件
const deleteUser = async (row: UserData) => {
  let result = await reqDeleteUser(row.id as number)
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
  await getUser(currentPage4.value, pageSize4.value)
}
// select收集的数据
const arrSelectChange = ref<number[]>([])
// select改变事件
const selectChange = (value: Adduser[]) => {
  // 获得参数
  arrSelectChange.value = value.map((element) => {
    return element.id as number
  })
  // console.log(arrSelectChange.value)
  console.log(value)
}
//获取组件实例
const table1 = ref()
// 批量删除事件
const deleteSomeUser = async () => {
  // arrSelectChange.value = table1.value
  //   .getSelectionRows()
  //   .map((element: Adduser) => {
  //     return element.id as number
  //   })
  let result = await reqDeleteSomeUser(arrSelectChange.value)
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
  await getUser(currentPage4.value, pageSize4.value)
  // 清空参数
  arrSelectChange.value = []
}
// 搜索事件
const searchUser = async () => {
  await getUser(currentPage4.value, pageSize4.value, keyword.value)
}
// 重置事件
const reset = async () => {
  keyword.value = ''
  await getUser(currentPage4.value, pageSize4.value)
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'user'
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
</style>
