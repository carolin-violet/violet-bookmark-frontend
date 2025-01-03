<template>
  <div class="preview-body-container">
    <div class="private-category-titles">
      <div
        v-for="category in props.list"
        :key="category.id"
        class="category"
        :class="{ active: category.id === activeId }"
        @click="activeId = category.id"
      >
        <span class="category-title">
          {{ category.name }}
        </span>
      </div>
    </div>
    <PreviewContent :category-id="activeId" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import type { Category } from '@/api/category';
  import PreviewContent from './PreviewContent.vue';

  const props = defineProps({
    list: {
      type: Array as () => Category[],
      default: () => [],
    },
  });

  // 一级分类对应的二级分类列表及所有站点导航
  const activeId = ref<number>(props.list[0].id);
</script>

<style lang="less" scoped>
  .preview-body-container {
    position: relative;
    .private-category-titles {
      position: sticky;
      top: 0;
      margin: 0 auto;
      width: 80%;
      height: 40px;
      display: flex;
      background-color: rgb(63, 63, 63);
      z-index: 1;
      .category {
        flex: 1 1 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease-in-out;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          background-color: rgb(79, 79, 79);
        }
        &.active {
          background-color: rgb(79, 79, 79);
        }
        .category-title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .main-content {
      margin: 12px auto 0;
      width: 80%;
    }
  }
</style>
