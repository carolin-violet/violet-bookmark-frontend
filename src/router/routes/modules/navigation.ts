import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const NAVIGATION: AppRouteRecordRaw = {
  path: '/website',
  name: 'PersonalWebsite',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.website',
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'list',
      name: 'PersonalWebsiteList',
      component: () => import('@/views/website/index.vue'),
      meta: {
        locale: 'menu.website.list',
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
    {
      path: 'addCategory',
      name: 'PersonalWebsiteAddCategory',
      component: () => import('@/views/website/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.website.category.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
    {
      path: 'editCategory',
      name: 'PersonalWebsiteEditCategory',
      component: () => import('@/views/website/categoryDetail/index.vue'),
      meta: {
        locale: 'menu.website.category.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
    {
      path: 'addWebsite',
      name: 'PersonalWebsiteAddWebsite',
      component: () => import('@/views/website/websiteDetail/index.vue'),
      meta: {
        locale: 'menu.website.website.add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
    {
      path: 'editWebsite',
      name: 'PersonalWebsiteEditWebsite',
      component: () => import('@/views/website/websiteDetail/index.vue'),
      meta: {
        locale: 'menu.website.website.edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin', 'user'],
      },
    },
  ],
};

export default NAVIGATION;
