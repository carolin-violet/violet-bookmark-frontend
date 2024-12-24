<template>
  <div class="container">
    <div class="private-category-title"></div>
    <div class="main-content">
      <div
        v-for="website in props.category.navigations"
        :key="website.id"
        class="website-item"
        >{{ website.name }}</div
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ICategoryListItem } from '@/api/category';

  const props = defineProps({
    category: {
      type: Object as () => ICategoryListItem,
      default: () => {},
    },
  });
</script>

<style lang="less" scoped></style>
