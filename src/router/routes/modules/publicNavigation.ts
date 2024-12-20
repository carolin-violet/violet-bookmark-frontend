import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/public-navigation',
  name: 'PublicNavigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation.public',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'PublicNavigationList',
      component: () => import('@/views/publicNavigation/index.vue'),
      meta: {
        locale: 'menu.navigation.public.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addCategory',
      name: 'PublicNavigationAddCategory',
      component: () =>
        import('@/views/publicNavigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editCategory',
      name: 'PublicNavigationEditCategory',
      component: () =>
        import('@/views/publicNavigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addNavigation',
      name: 'PublicNavigationAddNavigation',
      component: () =>
        import('@/views/publicNavigation/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editNavigation',
      name: 'PublicNavigationEditNavigation',
      component: () =>
        import('@/views/publicNavigation/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.public.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
