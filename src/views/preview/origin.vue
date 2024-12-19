<template>
  <div class="preview-container">
    <section class="main" v-scroll-view="checkSubCategory">
      <div class="category-title-wrapper">
        <div
          class="category"
          v-for="category in categoryList"
          :key="category.id"
          @click="handleChangeCategory(category)"
        >
          {{ category.name }}
        </div>
      </div>

      <div class="nav-wrapper">
        <div
          class="sub-category"
          v-for="(subCategory, index) in activeCategoryNavList"
          :key="subCategory.id"
          :style="{
            backgroundColor: colorPalette[index % colorPalette.length]?.bg,
            color: colorPalette[index % colorPalette.length]?.font,
          }"
        >
          <strong class="sub-category-title">
            {{ subCategory.name }}
          </strong>
          <ul class="nav-list">
            <li
              class="nav-item"
              v-for="site in subCategory.navigation"
              :key="site.id"
            >
              <a class="nav-link" target="_blank" :href="site.url">
                <div class="icon">
                  <img
                    class="nav-icon"
                    :src="defaultIcon"
                    :data-src="`https://www.google.com/s2/favicons?domain=${site.url}`"
                  />
                </div>
                <div
                  class="nav"
                  :title="site.description ? site.description : '暂无备注'"
                >
                  {{ site.name }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed, nextTick } from 'vue';
  import { exportData } from '@/api/file';
  import useWaterFall from '@/hooks/waterfall';

  const { setPosition } = useWaterFall();

  const navData = ref<any>([]);
  const categoryList = ref<any>([]);

  const defaultIcon =
    'https://cdn.jsdelivr.net/gh/carolin-violet/navigation_v1/images/browser.svg';

  // 调色板
  const colorPalette = ref([
    {
      bg: '#5A7A7B',
      font: '#D2FAEB',
    },
    {
      bg: '#2A9392',
      font: '#FCE2C6',
    },
    {
      bg: '#5C376E',
      font: '#BDEADF',
    },
    {
      bg: '#012C50',
      font: '#B9F1DA',
    },
    {
      bg: '#244D57',
      font: '#FDB78F',
    },
    {
      bg: '#04444F',
      font: '#66E7F5',
    },
    {
      bg: '#237847',
      font: '#DFD988',
    },
    {
      bg: '#1D326D',
      font: '#D0D181',
    },
    {
      bg: '#2FB97B',
      font: '#FDF9F6',
    },
  ]);

  const getData = () => {
    exportData().then((res: any) => {
      navData.value = res.data;

      categoryList.value = navData.value.map(({ id, name }: any) => ({
        id,
        name,
        active: false,
      }));
    });
  };

  onMounted(() => {
    getData();
  });

  // 当前激活的分类
  const activeCategory = computed(() =>
    categoryList.value.find((item: any) => item.active === true)
  );
  // 激活分类下的子分类列表
  const activeCategoryNavList = computed(() => {
    if (!activeCategory.value) return { children: [] };
    const list = navData.value.find(
      (item: any) => item.id === activeCategory.value.id
    );
    return list.children;
  });

  // 控制元素显示隐藏
  function checkSubCategory() {
    const activeElList = document.querySelectorAll('.sub-category');
    const triggerBottom = window.innerHeight * 0.8;

    activeElList.forEach((subCategoryEl) => {
      const { top } = subCategoryEl.getBoundingClientRect();
      if (top < triggerBottom) {
        subCategoryEl.classList.add('show');
      } else {
        subCategoryEl.classList.remove('show');
      }
    });
  }

  // 图标懒加载
  const lazyLoadIcons = () => {
    const imgs = document.querySelectorAll('.nav-icon');

    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 通过该属性判断元素是否出现在视口内
        if (entry.isIntersecting) {
          const img: any = entry.target;
          img.src = img.dataset.src;
          // 图片加载完成后解除监听
          imageObserver.unobserve(img);
        }
      });
    }, options);

    imgs.forEach((img) => {
      imageObserver.observe(img);
    });
  };

  const handleChangeCategory = (item: any) => {
    if (activeCategory.value === item || !activeCategory.value) {
      item.active = !item.active;
    } else {
      activeCategory.value.active = false;
      item.active = true;
    }

    nextTick(() => {
      setPosition();
      checkSubCategory();
      lazyLoadIcons();
    });
  };
</script>

<style lang="less" scoped>
  @sub-category-width: 300px;

  @font-face {
    font-family: 米开软笔行楷;
    src: url(https://cdn.jsdelivr.net/gh/carolin-violet/navigation_v1/font/米开软笔行楷.ttf);
    font-display: swap; // 字体没加载前先用默认的，加载了就用这个
  }

  .preview-container {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/images/bg/1080p.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .main {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: scroll;

      .category-title-wrapper {
        width: 80%;
        margin: 64px auto;
        display: flex;
        flex-wrap: wrap;

        .category {
          flex: 1 1 120px;
          margin: 10px 10px;
          font-size: 24px;
          text-align: center;
          cursor: pointer;
          font-family: 米开软笔行楷;
        }
      }

      .nav-wrapper {
        position: relative;
        margin: 0 auto;
        width: 90%;

        .sub-category {
          position: absolute;
          width: @sub-category-width;
          height: auto;
          padding: 15px 10px;
          border-radius: 15px;
          transition: all 0.3s ease-in-out;

          opacity: 0;
          scale: 0.9;

          &.show {
            opacity: 1;
            scale: 1;
          }

          .sub-category-title {
            position: relative;
            padding-left: 18px;
            font-size: 20px;
            line-height: 20px;

            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 5px;
              height: 80%;
              background-color: currentColor;
              border-radius: 3px;
            }
          }

          .nav-list {
            margin-top: 10px;
            list-style: none;
            padding: 0;

            .nav-item {
              padding: 5px 0;

              .nav-link {
                display: flex;
                text-decoration: none;
                color: inherit;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .icon {
                  width: 16px;
                  height: 22px;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  img {
                    width: 16px;
                    height: 16px;
                    object-fit: cover;
                  }
                }

                .nav {
                  position: relative;
                  margin-left: 5px;
                  height: 22px;
                  line-height: 22px;
                  display: inline-block;

                  &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    /* currentColor可以获取当前元素或父元素的color */
                    background-color: currentColor;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s ease-out;
                  }
                }

                &:hover {
                  .nav::after {
                    transform: scaleX(1);
                    transform-origin: left;
                  }

                  .icon {
                    animation: flutter 0.8s ease-in-out infinite;

                    @keyframes flutter {
                      0% {
                        transform: translateY(0);
                      }

                      25% {
                        transform: translateY(-15%);
                      }

                      50% {
                        transform: translateY(0);
                      }

                      75% {
                        transform: translateY(15%);
                      }

                      100% {
                        transform: translateY(0);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 2560px) {
    .preview-container {
      background-image: url('@/assets/images/bg/2k.webp');
    }
  }

  @media screen and (max-width: 1920px) {
    .preview-container {
      background-image: url('@/assets/images/bg/1080p.webp');
    }
  }

  @media screen and (max-width: 1200px) {
    .preview-container {
      background-image: url('@/assets/images/bg/ipad2020.webp');
    }
  }

  @media screen and (max-width: 768px) {
    .preview-container {
      background-image: url('@/assets/images/bg/mobile.webp');
    }
  }
</style>
