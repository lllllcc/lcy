<template>
  <el-form>
    <el-form-item label="SPU名称" label-width="7em">
      <el-input placeholder="请输入SPU名称" v-model="data.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" label-width="7em">
      <el-select v-model="data.tmId" placeholder="请选择品牌" size="default">
        <el-option
          v-for="item in useStoreSpu.trademarkList"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" label-width="7em">
      <!-- 文字区域 -->
      <el-input
        v-model="data.description"
        :rows="2"
        type="textarea"
        placeholder="请输入描述"
      />
    </el-form-item>
    <el-form-item label="SPU照片" label-width="7em">
      <!-- 文件上传 -->

      <!-- <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload> -->
      <el-upload
        v-model:file-list="ImageList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="selectValue"
        value-key="name"
        :placeholder="`还有${selectAttrList.length}未选择`"
        size="default"
        style="margin-right: 10px"
      >
        <el-option
          v-for="item in selectAttrList"
          :key="item.id"
          :label="item.name"
          :value="item"
        />
      </el-select>
      <el-button type="primary" icon="Plus" @click="addAttr"
        >添加销售属性</el-button
      >
      <el-table
        border
        style="width: 100%; margin: 10px 0px"
        :data="data.spuSaleAttrList"
      >
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column
          label="属性名"
          prop="saleAttrName"
          width="120px"
          align="center"
        />
        <el-table-column label="属性值">
          <!-- tag标签部分 -->
          <template v-slot="scoped">
            <el-tag
              v-for="(tag, index) in scoped.row.spuSaleAttrValueList"
              :key="tag.id"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(scoped.row.spuSaleAttrValueList, index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="scoped.row.inputVisible"
              ref="InputRef"
              v-model="scoped.row.inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm(scoped.row)"
              @blur="handleInputConfirm(scoped.row)"
            />
            <el-button
              v-else
              class="button-new-tag ml-1"
              size="small"
              @click="showInput(scoped.row)"
            >
              添加属性
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              @click="deleteAttr(scoped.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label-width="7em">
      <el-button type="primary" @click="saveSpu">保存</el-button>
      <el-button @click="SPUCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reqAddSpu, reqUploadSpu } from '@/api/product/spu'
import type {
  BaseAttrList,
  BaseSpuDataRecords,
  addOrUpload,
  spuAttrData
} from '@/api/product/spu/type'
import useSpu from '@/store/modules/Spu'
import type { UploadProps } from 'element-plus'
import { ElInput, ElMessage } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
const useStoreSpu = useSpu()

//创建一个对象，防止打破单向数据流,顺便作为参数传递
const data = ref<addOrUpload>({
  category3Id: '',
  description: '',
  spuImageList: [],
  spuName: '',
  spuSaleAttrList: [],
  tmId: ''
})
// 接收父组件的数据
const props = defineProps<{
  propData: BaseSpuDataRecords[0] | undefined
  rowId: number | string
}>()
const emits = defineEmits(['success'])
watch(
  () => props.propData,
  (newValue) => {
    if (newValue) {
      Object.assign(data.value, JSON.parse(JSON.stringify(newValue)))
      // data.value.spuSaleAttrList = useStoreSpu.trademarkList
      data.value.spuImageList = useStoreSpu.ImageList
      ImageList.value = data.value.spuImageList.map((item) => {
        return {
          name: item.imgName,
          url: item.imgUrl,
          id: item.id,
          spuId: item.spuId
        }
      })
    }
  }
)
watch(
  () => useStoreSpu.AttrList,
  (newValue) => {
    if (newValue) {
      data.value.spuSaleAttrList = newValue
    }
  }
)
const ImageList = ref<
  { name: string; url: string; id?: number; spuId?: number }[]
>([])
// const imageUrl = ref('')
//上传文件的图片
// const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
//取消事件
const SPUCancel = () => {
  useStoreSpu.SpuView = 0
}
//添加或者修改事件
const saveSpu = () => {
  //把数据变回去
  data.value.spuImageList = ImageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.url,
      id: item.id,
      spuId: item.spuId
    }
  })
  if (data.value.id !== undefined) {
    reqUploadSpu(data.value).then((res) => {
      if (res.code === 200) {
        emits('success')
        useStoreSpu.SpuView = 0
      } else {
        ElMessage({ type: 'error', message: res.message })
      }
    })
  } else {
    reqAddSpu(data.value).then((res) => {
      if (res.code === 200) {
        emits('success')
        useStoreSpu.SpuView = 0
      } else {
        ElMessage({ type: 'error', message: res.message })
      }
    })
  }
}

const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (spuSaleAttrValueList: object[], index: number) => {
  spuSaleAttrValueList.splice(index, 1)
}
//给row中使用的属性绑定类型
type inputRow = {
  inputVisible: boolean
  inputValue: string
}
const showInput = (row: inputRow) => {
  row.inputVisible = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = (row: spuAttrData[0] & inputRow) => {
  console.log(123)
  if (row.inputValue) {
    row.spuSaleAttrValueList.push({
      baseSaleAttrId: row.baseSaleAttrId,
      spuId: row.spuId,
      saleAttrName: row.saleAttrName,
      saleAttrValueName: row.inputValue,
      isChecked: null
    })
  }
  row.inputVisible = false
  row.inputValue = ''
}

//删除下方表格属性
const deleteAttr = (index: number) => {
  data.value.spuSaleAttrList.splice(index, 1)
}
//select的数据
const selectValue = ref({ name: '', id: -1 })
//select过滤后的全部属性
const selectAttrList = computed(() => {
  if (!data.value.spuSaleAttrList?.length) return useStoreSpu.BaseAttrList
  //创建一个数组用于存放提取其中的name属性
  const selectArr: string[] = []
  //新建一个数组 用来存放过滤后的结果
  const selectArr1: BaseAttrList['data'] = []
  for (let i = 0; i < data.value.spuSaleAttrList.length; i++) {
    selectArr.push(data.value.spuSaleAttrList[i].saleAttrName)
  }
  for (let i = 0; i < useStoreSpu.BaseAttrList.length; i++) {
    //实现过滤,includes方法可以判断一个数组中是否含有某个值，返回布尔值
    if (!selectArr.includes(useStoreSpu.BaseAttrList[i].name)) {
      selectArr1.push(useStoreSpu.BaseAttrList[i])
    }
  }
  return selectArr1
})
//添加销售属性，把没有展示的添加进来
const addAttr = () => {
  data.value.spuSaleAttrList.push({
    saleAttrName: selectValue.value.name,
    spuSaleAttrValueList: [],
    baseSaleAttrId: selectValue.value.id,
    spuId: props.rowId
  })
  selectValue.value = { name: '', id: -1 }
}
</script>
<!-- 命名，让他在工具中可以有名字 而不是全都是index -->
<script lang="ts">
export default {
  name: 'sku'
}
</script>

<style scoped lang="scss">
//上传文件样式
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader:deep(.el-upload) {
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
</style>
