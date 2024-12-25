<template>
  <div class="container">
    <div class="prefix">搜索</div>
    <div v-if="searchText.length" class="close" @click="searchText = ''"
      >关闭</div
    >
    <input v-model="searchText" type="text" placeholder="搜索" />
    <div>列表</div>
    <div class="suffix">图标</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const searchText: Ref<string> = ref('');
</script>

<style lang="less" scoped>
  .container {
    max-width: 780px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .prefix {
      color: #999;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
    }
  }
</style>
