import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/personal-navigation',
  name: 'PersonalNavigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.navigation.personal',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
  },
  children: [
    {
      path: 'list',
      name: 'PersonalNavigationList',
      component: () => import('@/views/personalNavigation/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addCategory',
      name: 'PersonalNavigationAddCategory',
      component: () =>
        import('@/views/personalNavigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editCategory',
      name: 'PersonalNavigationEditCategory',
      component: () =>
        import('@/views/personalNavigation/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'addNavigation',
      name: 'PersonalNavigationAddNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'editNavigation',
      name: 'PersonalNavigationEditNavigation',
      component: () => import('@/views/navigationDetail/index.vue'),
      meta: {
        locale: 'menu.navigation.personal.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default NAVIGATION;
