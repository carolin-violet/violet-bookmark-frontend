<template>
  <div class="container">
    <div class="search-container">
      <Search />
    </div>
    <div class="public-category-titles">
      <div
        v-for="item in props.list"
        :key="item.id"
        class="public-category"
        :class="{ active: item.id === props.activeId }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Category } from '@/api/category';

  import Search from './Search.vue';

  const props = defineProps({
    list: {
      type: Array as () => Category[],
      default: () => [],
    },
    activeId: {
      type: Number,
    },
  });
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    .search-container {
      position: absolute;
      top: 200px;
      left: 0;
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
