import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

const app = createApp(App)

app.use(router);

//If vue routing does not work install vue-router@4

app.mount('#app');
