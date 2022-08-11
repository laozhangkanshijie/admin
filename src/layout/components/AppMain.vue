<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { getTitle } from '@/utils/i18n'

const route = useRoute()
const store = useStore()

const addTags = (to, from) => {
  if (!isTags(to.path)) return
  const { fullPath, meta, path, params, query } = to
  store.commit(
    'app/addTagsView',
    {
      fullPath,
      meta,
      path,
      params,
      query,
      title: getTitle(to)
    },
    {
      immediate: true
    }
  )
}

// 登录后第一次进入添加标签
addTags(route)

watch(route, (to, from) => {
  addTags(to, from)
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
