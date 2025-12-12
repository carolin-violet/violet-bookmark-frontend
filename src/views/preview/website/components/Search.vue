<template>
  <div class="search-component-container">
    <div class="prefix">
      <icon-font type="icon-chat" :size="28" />
    </div>
    <div v-if="searchText.length" class="close" @click="searchText = ''"
      ><icon-close :size="20"
    /></div>
    <input
      v-model="searchText"
      type="text"
      placeholder="搜索"
      @keyup.enter="search"
    />
    <div class="search-options">
      <select v-model="searchPrefix">
        <option
          v-for="approach in searchApproachList"
          :key="approach.name"
          :value="approach.name"
          >{{ approach.name }}</option
        >
      </select>
      <icon-caret-down :size="12" />
    </div>
    <div class="suffix" @click="search">
      <icon-search :size="28" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  const searchText: Ref<string> = ref('');
  const searchPrefix: Ref<string> = ref('Google');

  const searchApproachList = [
    {
      name: 'Baidu',
      url: 'https://www.baidu.com/s?wd=',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
    },
    {
      name: 'Sogou',
      url: 'https://www.sogou.com/web?query=',
    },
    {
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
    },
    // {
    //   name: 'Yandex',
    //   url: 'https://yandex.com/search/?text=',
    // },
    // {
    //   name: 'Magi',
    //   url: 'https://magi.com/search?q=',
    // },
    // {
    //   name: '多吉',
    //   url: 'https://www.dogedoge.com/results?q=',
    // },
    // {
    //   name: '秘迹',
    //   url: 'https://mijisou.com/?q=',
    // },
  ];

  const search = () => {
    const prePath = searchApproachList.find(
      (item) => item.name === searchPrefix.value
    )?.url;
    const url = prePath + searchText.value;
    window.open(url, '_blank');
  };
</script>

<style lang="less" scoped>
  .search-component-container {
    max-width: 780px;
    width: 780px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px !important;
    border-radius: 24px;
    background-color: transparent;
    &:hover {
      .close {
        background-color: rgba(255, 255, 255, 0.9);
      }
      input {
        background-color: rgba(255, 255, 255, 0.9);
      }
      .search-options {
        background-color: rgba(255, 255, 255, 0.9);
      }
      .suffix {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
    .prefix {
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 24px 0 0 24px;
      cursor: pointer;
    }
    .close {
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.7);
    }
    input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      background-color: rgba(255, 255, 255, 0.7);
    }
    .search-options {
      position: relative;
      width: 70px;
      height: 100%;
      color: #999;
      background-color: rgba(255, 255, 255, 0.7);
      select {
        direction: rtl;
        padding: 0 20px 0 10px;
        height: 40px;
        border: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        padding-right: 20px;
        outline: none;
        color: #666;
        cursor: help;
        font-size: 12px;
        transform: scale(1);
        background-color: transparent;
      }
      svg {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .suffix {
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 0 24px 24px 0;
      cursor: pointer;
    }
  }
</style>
