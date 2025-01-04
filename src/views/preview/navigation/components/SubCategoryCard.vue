<template>
  <div class="sub-category-card-container">
    <div class="sub-category-title">
      <div class="block"></div>
      <span class="category-title">
        {{ category.name }}
      </span>
    </div>
    <div class="main-content">
      <a
        v-for="website in category.navigation"
        :key="website.id"
        class="website-item"
        :href="website.url"
        target="_blank"
      >
        <div class="icon">
          <img
            src="@/assets/browser.svg"
            :data-src="`https://www.google.com/s2/favicons?domain=${website.url}`"
            alt=""
          />
        </div>
        <div class="name" :title="website.description">{{
          website.description
          ? `${website.name} - ${website.description}`
          : website.name
        }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TreeCategoryNode } from '@/api/category';

const props = defineProps({
  category: {
    type: Object as () => TreeCategoryNode,
    default: () => { },
  },
});
</script>

<style lang="less" scoped>
.sub-category-card-container {
  position: relative;
  padding: 8px;
  color: rgb(176, 180, 201);
  background-color: rgb(56, 60, 82);
  border-radius: 8px;
  border: 1px dashed transparent;

  .sub-category-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
    fill: currentColor;

    .block {
      flex-shrink: 0;
      width: 6px;
      height: 18px;
      background-color: currentColor;
      border-radius: 4px;
      transition: 0.3s ease-out;
    }

    .category-title {
      padding-left: 5px;
      flex-grow: 1;
      font-size: 1.24em;
      font-weight: bolder;
      line-height: 30px;
      height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border-radius: 4px;
      background-size: contain;
    }
  }

  .main-content {
    a.website-item {
      width: 100%;
      display: flex;
      transition: all 0.1s linear;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      min-width: 0;
      height: 24px;
      border-radius: 4px;
      border: 1px solid transparent;
      color: var(--color);
      cursor: pointer;
      text-decoration: none;
      -webkit-user-drag: none;

      &:hover {
        color: inherit !important;

        .icon {
          animation: iconImg 0.5s ease-out infinite;
          animation-direction: alternate;
        }

        .name::before {
          transform: scale3d(1, 0.5, 1);
        }
      }

      .icon {
        vertical-align: middle;
        border: none;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-right: 4px;
        border-radius: 3px;
        transition: 0.3s all ease-out;

        img {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
      }

      .name {
        min-width: 24px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          color: inherit;
          margin-left: -20px;
          bottom: 0;
          width: calc(100%);
          height: 1px;
          opacity: 1;
          border-style: solid;
          border-bottom: 1px;
          padding-right: 15px;
          transform: scale3d(0, 0.5, 1);
          transform-origin: 0% 50%;
          transition: transform 1s;
          transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        }
      }
    }
  }
}

@keyframes iconImg {
  0% {
    transform: translateY(0);
  }

  60% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(2px);
  }
}
</style>
