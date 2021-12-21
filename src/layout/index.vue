<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    >
    </sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <navbar></navbar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hidesidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
