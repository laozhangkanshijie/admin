<template>
  <!--  <i v-if="icon.includes('el-icon')" :class="icon" class="sub-el-icon"></i>-->

  <component
    v-if="icon.includes('el-icon')"
    class="svg-icon"
    :is="iconName"
  ></component>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { generateTitle } from '@/utils/i18n'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
const iconName = computed(() => {
  return props.icon.includes('el-icon-')
    ? props.icon.split('el-icon-')[1]
    : props.icon
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
