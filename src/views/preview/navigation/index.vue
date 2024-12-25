<template>
  <div class="preview-container">
    <section class="preview-header">
      <PreviewHeader
        :list="publicCategoryList"
        :active-id="activePublicCategoryId"
      />
    </section>
    <section class="preview-content">
      <PreviewContent
        :list="categoryList"
        :active-id="activePersonalCategoryId"
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
  const categoryList = ref<Category[]>([]);
  const activePublicCategoryId = ref<number>(0);
  const activePersonalCategoryId = ref<number>(0);

  // 获取公共分类列表
  function getPublicCategories() {
    getCategoryList({ openness: 1 }).then((res) => {
      publicCategoryList.value = res.data;
    });
  }

  // 获取一级分类列表
  function getTopCategories() {
    getCategoryList({ parentId: -1, openness: 0 }).then((res) => {
      categoryList.value = res.data;
    });
  }

  onMounted(() => {
    getPublicCategories();
    getTopCategories();
  });
</script>

<style lang="less" scoped>
  .preview-container {
    width: 100%;
    min-height: 100vh;
    .preview-container {
      height: 500px;
    }
  }
</style>
