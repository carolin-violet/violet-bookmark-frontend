<template>
  <div class="preview-content-container">
    <div class="private-category-titles">
      <div
        v-for="category in props.list"
        :key="category.id"
        class="category"
        :class="{ active: category.id === activeId }"
        @click="getSubCategoriesAndNavs(category.id)"
      >
        <span class="category-title">
          {{ category.name }}
        </span>
      </div>
    </div>
    <div v-if="isLogin()" ref="waterfallContainerRef" class="main-content">
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
  import { onMounted, ref, getCurrentInstance, nextTick } from 'vue';
  import { getSubCategoryAndWebsites } from '@/api/category';
  import { isLogin } from '@/utils/auth';
  import useWaterfall from '@/hooks/waterfall';

  import type { Category, TreeCategoryNode } from '@/api/category';
  import SubCategoryCard from './SubCategoryCard.vue';

  const props = defineProps({
    list: {
      type: Array as () => Category[],
      default: () => [],
    },
  });

  const instance = getCurrentInstance();

  const { setPosition, setContainer } = useWaterfall(
    instance?.proxy?.$refs.waterfallContainerRef as HTMLElement,
    300
  );

  // 一级分类对应的二级分类列表及所有站点导航
  const dataList = ref<TreeCategoryNode[]>([]);
  const activeId = ref<number>(0);

  // 获取一级分类对应的二级分类列表及所有站点导航
  function getSubCategoriesAndNavs(categoryId: number) {
    getSubCategoryAndWebsites(categoryId).then((res) => {
      dataList.value = res.data;
      activeId.value = categoryId;
      console.log('222', instance?.proxy?.$refs.waterfallContainerRef);
      nextTick(() => {
        // 设置瀑布流布局
        setContainer(
          instance?.proxy?.$refs.waterfallContainerRef as HTMLElement
        );
        setPosition();
      });
    });
  }

  onMounted(() => {
    const category = props.list[0];
    getSubCategoriesAndNavs(category.id);
  });
</script>

<style lang="less" scoped>
  .preview-content-container {
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
