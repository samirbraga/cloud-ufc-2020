import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/signin/index' },
    { path: '/signup', component: '@/pages/signup/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/settings', component: '@/pages/settings/index' },
    { path: '/search', component: '@/pages/search/index' },
    { path: '/create', component: '@/pages/createPost/index' },
  ],
});
