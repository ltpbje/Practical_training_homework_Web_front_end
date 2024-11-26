import './assets/scss/common.scss';
import PageView from '@/components/PageView.vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('PageView', PageView);
app.use(createPinia());
app.use(router);

app.mount('#app');
