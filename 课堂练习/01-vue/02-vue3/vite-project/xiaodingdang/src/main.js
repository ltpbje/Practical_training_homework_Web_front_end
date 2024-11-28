import './assets/scss/common.scss';
import PageView from '@/components/PageView.vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Loading from './components/Loading.vue';

// import 'vant/es/notify/style';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
const app = createApp(App);
app.use(Lazyload);
app.component('PageView', PageView);
app.component('Loading', Loading);
app.use(createPinia());
app.use(router);

app.mount('#app');
