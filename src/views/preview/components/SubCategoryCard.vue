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

  interface Props {
    category: ICategoryListItem;
  }

  const props = withDefaults(defineProps<Props>(), {
    category: [],
  });
</script>

<style lang="less" scoped></style>
