<template>
  <a-layout class="navigation-layout">
    <a-layout-sider class="side">
      <Category />
    </a-layout-sider>
    <a-layout-content>
      <Navigation />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  // import FileSaver from 'file-saver'
  import Navigation from './rightNavigation.vue';
  import Category from './leftCategory.vue';
</script>

<style lang="less" scoped>
  .navigation-layout {
    min-height: calc(100vh - 115px);
    .side {
      width: 320px !important;
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-sm) {
    .navigation-layout {
      .side {
        width: 200px !important;
      }
    }
  }
</style>
