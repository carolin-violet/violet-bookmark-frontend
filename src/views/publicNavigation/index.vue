<template>
  <a-layout style="height: 100%">
    <a-layout-sider :width="400">
      <a-card
        style="
           {
            width: 400px;
            height: 100%;
          }
        "
        title="公开导航"
      >
        <template #extra>
          <a-button @click="toAddCategory">添加分类</a-button>
        </template>
        <div v-for="item in categoryList" :key="item.id">
          {{ item.name }}
        </div>
      </a-card>
    </a-layout-sider>
    <a-layout-content>
      <div v-for="item in navigationList" :key="item.id">
        {{ item.name }}
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getCategoryList } from '@/api/category';
  import type { PublicCategory } from '@/api/publicCategory';
  import type { Navigation } from '@/api/navigation';

  const router = useRouter();

  const categoryList = ref<PublicCategory[]>([]);
  const navigationList = ref<Navigation[]>([]);

  function getPublicCategories() {
    getCategoryList({ openness: 1 }).then((res) => {
      categoryList.value = res.data;
    });
    //
  }

  // 创建分类
  function toAddCategory() {
    router.push('/public-navigation/addCategory');
  }

  onMounted(() => {
    getPublicCategories();
  });
</script>
