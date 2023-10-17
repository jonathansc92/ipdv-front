import { createRouter, createWebHistory } from 'vue-router';
import TokenService from "@/services/TokenService";
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        requiresAuth: false,
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authToken = TokenService.getToken();

  document.title = `SOHA - ${to.meta.title}`

  if (requiresAuth) {
    if (authToken) {
      next();
    } else {
      next('/login');
    }
  } else {
    if (to.path === '/login' && authToken) {
      next('/');
    } else {
      next();
    }
  }
});


export default router
