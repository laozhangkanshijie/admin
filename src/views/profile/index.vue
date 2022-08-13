<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card" :features="featureData">
        </project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <pro-featrue />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <pro-chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <pro-author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import projectCard from './components/ProjectCard.vue'
import proFeatrue from './components/ProFeatrue.vue'
import proChapter from './components/ProChapter.vue'
import ProAuthor from './components/ProAuthor.vue'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('')

const featureData = ref([])

const getFeatureData = async () => {
  featureData.value = await feature()
}

getFeatureData()

watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
