<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row._id)">
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button
              type="info"
              size="mini"
              @click="onShowRoleDialog(row._id)"
              v-permission="['distributeRole']"
            >
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="error" size="mini" @click="onRemoveClick(row)" v-permission="['removeUser']">
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-size="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import ExportToExcel from './components/Exprt2Excel.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import RolesDialog from './components/roles.vue'

const i18n = useI18n()
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

getListData()
watchSwitchLang(getListData)

const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

onActivated(getListData)

// ??????
const exportToExcelVisible = ref(false)

const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

// ??????????????????

const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// ?????????????????????
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleDialog = (id) => {
  roleDialogVisible.value = true
  selectUserId.value = id
}

watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  :deep .el-tag {
    margin-right: 6px;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
