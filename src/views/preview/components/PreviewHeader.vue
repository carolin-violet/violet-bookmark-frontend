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
  import type { PublicCategory } from '@/api/publicCategory';

  import Search from './Search.vue';

  const props = defineProps({
    list: {
      type: Array as () => PublicCategory[],
      default: () => [],
    },
    activeId: {
      type: Number,
    },
  });
</script>

<style lang="less" scoped></style>
