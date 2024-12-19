<template>
  <div class="container">
    <div class="search-container"> </div>
    <div class="public-category-titles">
      <div
        v-for="item in publicCategoryList"
        :key="item.id"
        class="public-category"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PublicCategory } from '@/api/publicCategory';
  import { ref } from 'vue';

  const publicCategoryList = ref<PublicCategory[]>([]);
</script>

<style lang="less" scoped></style>
