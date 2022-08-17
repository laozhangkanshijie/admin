<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { userBatchImport } from '@/api/user-manage'
import { USER_TELATIONS, formatDate } from './utils.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async ({ header, results }) => {
  const upDateData = generateData(results)
  await userBatchImport(upDateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if ((USER_TELATIONS[key] === 'openTime')) {
        userInfo[USER_TELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_TELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
}
</script>

<style lang="scss" scoped></style>
