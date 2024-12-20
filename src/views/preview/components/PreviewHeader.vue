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
  import { ref, onMounted } from 'vue';
  import { getPublicCategoryList } from '@/api/publicCategory';
  import type { PublicCategory } from '@/api/publicCategory';

  const publicCategoryList = ref<PublicCategory[]>([]);

  function getPublicCategories() {
    getPublicCategoryList().then((res) => {
      publicCategoryList.value = res.data;
    });
  }

  onMounted(() => {
    getPublicCategories();
  });
</script>

<style lang="less" scoped></style>
