<template>
  <div class="preview-header-container">
    <div class="search-container">
      <Search />
    </div>
    <div class="public-category-titles">
      <div class="left"> 占位 </div>
      <div class="right">
        <div
          v-for="item in props.list"
          :key="item.id"
          class="public-category"
          @click="open(item.id)"
        >
          <icon-font class="icon" :type="item.icon || 'icon-chat'" :size="28" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import type { Category } from '@/api/category';
  import Search from './Search.vue';

  const router = useRouter();

  const props = defineProps({
    list: {
      type: Array as () => Category[],
      default: () => [],
    },
  });

  const open = (categoryId: number) => {
    const { href } = router.resolve({
      path: '/navigation-preview/public',
      query: {
        categoryId,
      },
    });

    window.open(href, '_blank');
  };
</script>

<style lang="less" scoped>
  .preview-header-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/bg/bg.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    .search-container {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .public-category-titles {
      width: 80%;
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      background-color: #222222e6;
      border-radius: 12px 12px 0 0;
      transform: translateX(-50%);
      cursor: pointer;
      overflow: hidden;
      .left {
        flex: 0 0 224px;
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: center;

        .public-category {
          width: 88px;
          height: 70px;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgb(187, 187, 187);
          font-size: 12px;
          transition: 0.2s all ease-out;
          &:hover {
            padding-bottom: 4px;
            color: #36b36b;
            .icon {
              margin-top: -4px;
            }
          }
          .icon {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
</style>
