<template>
  <div class="header-search" :class="isShow">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      v-if="isShow"
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOption"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'
// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被任务是匹配的
    minMatchCharLength: 1,
    // 将被搜索的建列表， 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name: 搜索的键
    // weight: 对应的权重
    key: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}
const search = ref('')
const searchOption = ref([])
const querySearch = (search) => {
  if (search !== '') {
    searchOption.value = fuse.search(search)
  } else {
    searchOption.value = []
  }
}
const onSelectChange = (val) => {
  router.push(val.path)
}

const headerSearchSelectRef = ref(null)

const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOption.value = []
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped></style>
