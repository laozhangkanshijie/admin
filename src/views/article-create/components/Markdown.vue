<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="buttom">
      <el-button :loading="loading" type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import store from '@/store'
import { onMounted, defineProps, defineEmits, ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle } from './commit'

const emits = defineEmits(['onSuccess'])

const props = defineProps({
  title: {
    required: true,
    type: String
  }
})

// Editor 实例
let mkEditor
let el

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const loading = ref(false)

const onSubmitClick = async () => {
  loading.value = true
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })
  mkEditor.reset()
  emits('onSuccess')
  loading.value = false
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .buttom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
