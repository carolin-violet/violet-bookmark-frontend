import { App } from 'vue';
import permission from './permission';
import scrollView from './scrollView';

export default {
  install(Vue: App) {
    Vue.directive('permission', permission);
    Vue.directive('scrollView', scrollView);
  },
};
