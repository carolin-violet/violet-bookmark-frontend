<template>
  <div class="container">
    <div class="private-category-titles">
      <div v-for="category in categoryList" :key="category.id" class="category">
        {{ category.name }}
      </div>
    </div>
    <div class="main-content">
      <SubCategoryCard />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import SubCategoryCard from './SubCategoryCard.vue';

  const categoryList = ref([]);
</script>

<style lang="less" scoped></style>
