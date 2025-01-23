<template>
  <a-layout class="website-layout">
    <a-layout-sider class="side">
      <Category />
    </a-layout-sider>
    <a-layout-content>
      <Website />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  // import FileSaver from 'file-saver'
  import Website from './rightWebsite.vue';
  import Category from './leftCategory.vue';
</script>

<style lang="less" scoped>
  .website-layout {
    min-height: calc(100vh - 115px);
    .side {
      width: 320px !important;
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: @screen-sm) {
    .website-layout {
      .side {
        width: 200px !important;
      }
    }
  }
</style>
