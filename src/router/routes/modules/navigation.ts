import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/navigation',
  name: 'navigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation',
    requiresAuth: true,
    icon: 'icon-nav',
    order: 1,
  },
  children: [
    {
      path: 'personal',
      name: 'personal',
      component: () => import('@/views/personalNavigation/index.vue'),
      meta: {
        locale: 'menu.navigation.personal',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
