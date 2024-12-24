import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/diary',
  name: 'Diary',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation.share',
    requiresAuth: true,
    icon: 'icon-share-alt',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'ShareNavigationList',
      component: () => import('@/views/diary/index.vue'),
      meta: {
        locale: 'menu.navigation.share.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
