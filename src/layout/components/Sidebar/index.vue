<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        shape="square"
        :size="logoHeight"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        zh930-admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'
import {} from 'vue'
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
