<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button :loading="loading" type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits, watch, ref } from 'vue'
import i18next from 'i18next'
import store from '@/store'
import { commitArticle, editArticle } from './commit'

const emits = defineEmits(['onSuccess'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})
// 初始化 Editor 实例
let editor
// 获取dom
let el
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化
  editor.config.lang = store.getters.lang === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
const loading = ref(false)
const onSubmitClick = async () => {
  loading.value = true
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
  loading.value = false
}

watch(() => props.detail, val => {
  if (val && val.content) {
    editor.txt.html(val.content)
  }
}, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
