<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  index: {
    required: true,
    type: Number
  }
})

const router = useRouter()
const store = useStore()

const onRefreshClick = () => {
  router.go(0)
}
const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
}
const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}
</script>
