<template>
  <div ref="waterfallContainerRef" class="preview-content-container">
    <SubCategoryCard
      v-for="(subCategory, index) in dataList"
      :key="subCategory.id"
      :category="subCategory"
      class="animate__animated"
      :style="{
        color: colorPalette[index % colorPalette.length].color,
        backgroundColor:
          colorPalette[index % colorPalette.length].backgroundColor,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, getCurrentInstance, nextTick, watch } from 'vue';
  import { getSubCategoryAndWebsites } from '@/api/category';
  import useWaterfall from '@/hooks/waterfall';
  import useLazyLoadIcon from '@/hooks/useLazyLoadImg';
  import useHidden from '@/hooks/useHidden';

  import colorPalette from '@/views/preview/data';

  import type { Category, TreeCategoryNode } from '@/api/category';
  import SubCategoryCard from './SubCategoryCard.vue';

  const props = defineProps({
    categoryId: {
      type: Number,
      require: true,
    },
  });

  const instance = getCurrentInstance();

  const { init } = useHidden();
  const { loadImg } = useLazyLoadIcon();
  const { setPosition, setContainer } = useWaterfall(
    instance?.proxy?.$refs.waterfallContainerRef as HTMLElement,
    20
  );

  // 一级分类对应的二级分类列表及所有站点导航
  const dataList = ref<TreeCategoryNode[]>([]);
  const activeId = ref<number>(0);

  // 获取一级分类对应的二级分类列表及所有站点导航
  function getSubCategoriesAndNavs(categoryId: number) {
    getSubCategoryAndWebsites(categoryId).then((res) => {
      dataList.value = res.data;
      activeId.value = categoryId;

      nextTick(() => {
        // 设置瀑布流布局
        setContainer(
          instance?.proxy?.$refs.waterfallContainerRef as HTMLElement
        );
        setPosition();

        // 设置图标懒加载
        loadImg(instance?.proxy?.$refs.waterfallContainerRef as HTMLElement);

        // 监听元素显示隐藏
        init(instance?.proxy?.$refs.waterfallContainerRef as HTMLElement);
      });
    });
  }

  onMounted(() => {
    getSubCategoriesAndNavs(props.categoryId as number);
  });

  watch(
    () => props.categoryId,
    () => {
      getSubCategoriesAndNavs(props.categoryId as number);
    }
  );
</script>

<style lang="less" scoped>
  .preview-content-container {
    position: relative;
    width: 80%;
    margin: 12px auto 0;
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
