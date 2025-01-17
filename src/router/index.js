import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index/index.vue'),
    },
    { path: '/page',
      name: 'blog_page',
      component: () => import('../views/index/index.vue'),
    },
    { path: '/search',
      name: 'search',
      component: () => import('../views/index/index.vue'),
    },
    {
      path: '/blog/:id',
      name: 'BlogPost',
      component: () => import('../views/blog/blog.vue'),
    }
  ],
})



export default router
