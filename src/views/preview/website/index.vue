<template>
  <div class="preview-container">
    <section class="preview-header">
      <PreviewHeader :list="publicCategoryList" />
    </section>
    <section class="preview-content">
      <PreviewBody
        v-if="categoryList.length"
        ref="PreviewBodyRef"
        :list="categoryList"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getCategoryList } from '@/api/category';
  import type { Category } from '@/api/category';

  import PreviewHeader from './components/PreviewHeader.vue';
  import PreviewBody from './components/PreviewBody.vue';

  const publicCategoryList = ref<Category[]>([]);
  const categoryList = ref<Category[]>([]);
  // 获取公共分类列表
  function getPublicCategories() {
    getCategoryList({ parentId: -1, openness: 1, pageSize: 10 }).then((res) => {
      publicCategoryList.value = res.data.records;
    });
  }

  // 获取一级分类列表
  function getTopCategories() {
    getCategoryList({ parentId: -1, openness: 0, pageSize: 1000 }).then(
      (res) => {
        categoryList.value = res.data.records;
      }
    );
  }

  onMounted(() => {
    getPublicCategories();
    getTopCategories();
  });
</script>

<style lang="less" scoped>
  .preview-container {
    width: 100%;
    height: 100vh;
    background-color: cadetblue;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .preview-header {
      height: 400px;
    }
    .preview-content {
      min-height: calc(100vh - 400px);
      background-color: #333;
    }
  }
</style>
