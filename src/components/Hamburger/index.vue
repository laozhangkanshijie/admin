<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  vertical-align: middle;
  height: 20px;
}
</style>
