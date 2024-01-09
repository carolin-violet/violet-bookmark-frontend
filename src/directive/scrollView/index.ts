import { DirectiveBinding } from 'vue';
import { useThrottleFn } from '@vueuse/core';

// 设置滚动加载特效并且节流优化
function scrollView(el: HTMLElement, binding: DirectiveBinding) {
  el.addEventListener(
    'scroll',
    useThrottleFn(() => {
      binding.value();
    }, 100)
  );
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    scrollView(el, binding);
  },
  // updated(el: HTMLElement, binding: DirectiveBinding) {
  //   scrollView(el, binding);
  // },
};
