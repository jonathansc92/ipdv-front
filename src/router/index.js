import { createRouter, createWebHistory } from 'vue-router';
import TokenService from "@/services/TokenService";
import LoginView from '../views/LoginView.vue';
import Departments from '../views/departments/IndexView.vue';
import CostCenters from '../views/cost-centers/IndexView.vue';
import Users from '../views/users/IndexView.vue';

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
      path: '/centro-de-custos',
      name: 'cost-centers',
      component: CostCenters,
      meta: {
        title: 'Centro de Custos',
        requiresAuth: true,
      }
    },
    {
      path: '/departamentos',
      name: 'departments',
      component: Departments,
      meta: {
        title: 'Departamentos',
        requiresAuth: true
      },
    },
    {
      path: '/usuarios',
      name: 'users',
      component: Users,
      meta: {
        title: 'Usuários',
        requiresAuth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authToken = TokenService.getToken();

  document.title = `${to.meta.title}`

  if (requiresAuth) {
    if (authToken) {
      next();
    } else {
      next('/login');
    }
  } else {
    if (to.path === '/login' && authToken) {
      next('/centro-de-custos');
    } else {
      next();
    }
  }
});


export default router
