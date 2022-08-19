<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
  <el-checkbox-group v-model="userRoleTitleList">
    <el-checkbox
        v-for="item in allRolelist"
        :key="item.id"
        :label="item.title"
      />
  </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userRoles, updateRole } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}

const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRolelist.value.find((role) => role.title === title)
  })

  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emits('updateRole')
  closed()
}

// 所有角色
const allRolelist = ref([])
const getListData = async () => {
  allRolelist.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const userRoleTitleList = ref([])

const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}

watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
