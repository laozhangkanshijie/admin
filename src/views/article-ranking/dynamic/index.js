import DynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

// 动态列数据
export const dynamicData = ref(DynamicData())

// 被勾选的列数据
export const selectDynamicLable = ref([])

watchSwitchLang(() => {
  dynamicData.value = DynamicData()
})

const initSelectDynamicLable = () => {
  selectDynamicLable.value = dynamicData.value.map(item => item.label)
}

initSelectDynamicLable()

export const tableColumns = ref([])

watch(selectDynamicLable, val => {
  tableColumns.value = []
  const selectData = dynamicData.value.filter(item => {
    return val.includes(item.label)
  })
  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
