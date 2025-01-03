<template>
  <div class="preview-header-container">
    <div class="search-container">
      <Search />
    </div>
    <div class="public-category-titles">
      <div
        v-for="item in props.list"
        :key="item.id"
        class="public-category"
        @click="open(item.id)"
      >
        <div class="icon">
          <img
            :src="`../../../../../src/assets/icon/${item.icon}.png`"
            alt=""
          />
        </div>
        <div class="name">{{ item.name }}</div>
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
    // position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/bg/bg.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    .search-container {
      flex: 0 1 430px;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .public-category-titles {
      flex: 1 0 70px;
      width: 80%;
      display: grid;
      grid-template-columns: repeat(auto-fit, 88px);
      column-gap: 4px;
      justify-content: center;
      background-color: #222222e6;
      border-radius: 12px 12px 0 0;
      .public-category {
        height: 70px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(187, 187, 187);
        font-size: 14px;
        cursor: pointer;
        transition: 0.2s all ease-out;
        overflow: hidden;
        &:hover {
          padding-bottom: 4px;
          color: #36b36b;
          .icon {
            margin-top: -4px;
          }
        }
        .name {
          width: 100%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon {
          margin-bottom: 4px;
          width: 32px;
          height: 32px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-md) {
    .preview-header-container {
      .public-category-titles {
        grid-template-columns: repeat(auto-fit, 44px);
        .public-category {
          font-size: 12px;
          .icon {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
</style>
