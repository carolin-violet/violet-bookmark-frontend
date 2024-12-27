<template>
  <div class="sub-category-card-container">
    <div class="sub-category-title"></div>
    <div class="main-content">
      <div
        v-for="website in props.category.navigation"
        :key="website.id"
        class="website-item"
        >{{ website.name }}</div
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { TreeCategoryNode } from '@/api/category';

  const props = defineProps({
    category: {
      type: Object as () => TreeCategoryNode,
      default: () => {},
    },
  });
</script>

<style lang="less" scoped>
  .sub-category-card-container {
    color: rgb(176, 180, 201);
    background-color: rgb(56, 60, 82);
    .sub-category-title {
    }
  }
</style>
