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
  import { ref } from 'vue';

  const categoryList = ref([]);
  const navigationList = ref([]);

  function toAddCategory() {
    console.log('toAddCategory');
  }
</script>
