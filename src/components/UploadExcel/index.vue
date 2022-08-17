<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { getHeaderRow, isExcel } from './utils'
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { ElMessage } from 'element-plus'

const props = defineProps({
  BeforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  console.log(rawFile)
  upload(rawFile)
}

const upload = (rawFile) => {
  excelUploadInput.value.value = null
  if (!props.BeforeUpload) {
    readerData(rawFile)
    return
  }
  const before = props.BeforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

const readerData = (rawfile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取到解析后的数据
    reader.onload = (e) => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格（工作簿）名称
      const firestSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1 （第一张表格）的数据
      const workSheet = workbook.Sheets[firestSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传人解析后的数
      generateData({ header, results })
      // 8. 处理 loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawfile)
  })
}

// 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return
  }
  upload(rawFile)
}

const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    .el-icon {
      font-size: 60px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
