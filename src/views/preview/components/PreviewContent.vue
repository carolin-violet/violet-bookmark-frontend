<template>
  <div class="container">
    <div class="private-category-titles">
      <div v-for="category in categoryList" :key="category.id" class="category">
        {{ category.name }}
      </div>
    </div>
    <div class="main-content">
      <SubCategoryCard
        v-for="subCategory in dataList"
        :key="subCategory.id"
        :category="subCategory"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getCategoryList, getCategoryAndNavs } from '@/api/category';

  import type { ICategoryListItem } from '@/api/category';
  import SubCategoryCard from './SubCategoryCard.vue';

  const categoryList = ref<ICategoryListItem[]>([]);

  // 一级分类对应的二级分类列表及所有站点导航
  const dataList = ref<ICategoryListItem[]>([]);

  // 获取一级分类对应的二级分类列表及所有站点导航
  function getSubCategoriesAndNavs(id: number) {
    getCategoryAndNavs(id).then((res) => {
      categoryList.value = res.data;
    });
  }

  // 获取一级分类列表
  function getTopCategories() {
    getCategoryList(-1).then((res) => {
      categoryList.value = res.data;

      getSubCategoriesAndNavs(categoryList.value[0].id);
    });
  }

  onMounted(() => {
    getTopCategories();
  });
</script>

<style lang="less" scoped></style>
