<template>
  <div class="container">
    <div class="private-category-titles">
      <div
        v-for="category in props.list"
        :key="category.id"
        class="category"
        :class="{ active: category.id === props.activeId }"
      >
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
  import { ref } from 'vue';
  import { getSubCategoryAndWebsites } from '@/api/category';

  import type { ICategoryListItem } from '@/api/category';
  import SubCategoryCard from './SubCategoryCard.vue';

  const props = defineProps({
    list: {
      type: Array as () => ICategoryListItem[],
      default: () => [],
    },
    activeId: {
      type: Number,
    },
  });

  // 一级分类对应的二级分类列表及所有站点导航
  const dataList = ref<ICategoryListItem[]>([]);

  // 获取一级分类对应的二级分类列表及所有站点导航
  function getSubCategoriesAndNavs(TopParentId: number) {
    getSubCategoryAndWebsites(TopParentId).then((res) => {
      dataList.value = res.data;
    });
  }

  defineExpose({
    getSubCategoriesAndNavs,
  });
</script>

<style lang="less" scoped></style>
