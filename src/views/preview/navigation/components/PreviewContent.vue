<template>
  <div class="preview-content-container">
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
    <div v-if="isLogin()" class="main-content">
      <SubCategoryCard
        v-for="subCategory in dataList"
        :key="subCategory.id"
        :category="subCategory"
      />
    </div>
    <div v-else>
      <a-empty>
        <a-button>登录</a-button>
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getSubCategoryAndWebsites } from '@/api/category';
  import { isLogin } from '@/utils/auth';

  import type { Category, TreeCategoryNode } from '@/api/category';
  import SubCategoryCard from './SubCategoryCard.vue';

  const props = defineProps({
    list: {
      type: Array as () => Category[],
      default: () => [],
    },
    activeId: {
      type: Number,
    },
  });

  // 一级分类对应的二级分类列表及所有站点导航
  const dataList = ref<TreeCategoryNode[]>([]);

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

<style lang="less" scoped>
  .preview-content-container {
  }
</style>
