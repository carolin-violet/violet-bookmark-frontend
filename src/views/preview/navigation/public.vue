<template>
  <div class="preview-container">
    <section class="preview-header">
      <PreviewHeader :list="publicCategoryList" />
    </section>
    <section class="preview-content">
      <PreviewContent
        ref="previewContentRef"
        :category-id="Number($route.query.categoryId)"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getCategoryList } from '@/api/category';
  import type { Category } from '@/api/category';

  import PreviewHeader from './components/PreviewHeader.vue';
  import PreviewContent from './components/PreviewContent.vue';

  const publicCategoryList = ref<Category[]>([]);

  // 获取公共分类列表
  function getPublicCategories() {
    getCategoryList({ parentId: -1, openness: 1, pageSize: 10 }).then((res) => {
      publicCategoryList.value = res.data.records;
    });
  }

  onMounted(() => {
    getPublicCategories();
  });
</script>

<style lang="less" scoped>
  .preview-container {
    width: 100%;
    min-height: 100vh;
    background-color: cadetblue;
    .preview-header {
      height: 400px;
    }
    .preview-content {
      min-height: calc(100vh - 400px);
      background-color: #333;
      overflow: hidden;
    }
  }
</style>
