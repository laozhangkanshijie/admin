<template>
  <div class="article-create">
    <el-card>
      <el-input class="title-input" :placeholder="$t('msg.article.titlePlaceholder')"
      v-model="title"
      maxlength="20"
      clearable
      >

      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown :title="title" :detail="detail" @onSuccess="onSuccess"></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')"  name="editor">
          <editor :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { articleDetail } from '@/api/article'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
  getArticleDetail()
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped></style>
