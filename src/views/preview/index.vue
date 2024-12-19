<template>
  <div class="preview-container">
    <section class="preview-header">
      <PreviewHeader />
    </section>
    <section class="preview-content">
      <PreviewContent />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import PreviewHeader from './components/PreviewHeader.vue';
  import PreviewContent from './components/PreviewContent.vue';
</script>

<style lang="less" scoped>
  @sub-category-width: 300px;

  .header {
    width: 100%;
    height: 500px;
  }
</style>
