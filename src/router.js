import { createRouter, createWebHistory } from 'vue-router';

import ShoppingCart from '../src/pages/ShoppingCartPage.vue';
import ProductPage from './pages/ProductPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import loginPage from './pages/LoginPage.vue';
import registerPage from './pages/RegisterPage.vue';
import SuccessPage from './pages/SuccessPage.vue';
import ErrorPage from './pages/PaymentErrorPage.vue';
import productDetailPageNew from './pages/ProductDetailPageNew.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: registerPage,},
    { path: '/login', component: loginPage },
    { path: '/register', component: registerPage },
    { path: '/product', component: ProductPage , requiresAuth: true},
    { path: '/cart', component: ShoppingCart },
    { path: '/new', component:  productDetailPageNew},
    { path: '/success', component: SuccessPage },
    { path: '/error', component: ErrorPage},
    { path: '/product/:productId', component: ProductDetailPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
  ]
});

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    //Authentication check
    const token = localStorage.getItem('jwt');

    if (token) {
      return next()
    }
    
    return next('/login')
  } 
  next();
})

export default router;