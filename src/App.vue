<template>
  <router-view />
</template>
<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

import { getTitle, watchSwitchLang } from '@/utils/i18n'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})

watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>
<style></style>
