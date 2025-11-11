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
    gap: 16px;
    // 优化内容区：统一内边距与滚动容器
    :deep(.arco-layout-content) {
      padding-top: 16px;
      padding-right: 16px;
      background-color: var(--color-fill-2);
      border-radius: 6px;
      overflow: auto;
    }
    .side {
      width: 280px !important;
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
