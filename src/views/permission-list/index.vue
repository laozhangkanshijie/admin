<template>
  <div class="">
    <el-table
      :data="allPermission"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="permissionName"
        :label="$t('msg.permission.name')"
        width="180"
      />
      <el-table-column
        prop="permissionMark"
        :label="$t('msg.permission.mark')"
        width="180"
      />
      <el-table-column
        prop="permissionDesc"
        :label="$t('msg.permission.desc')"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}

getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
