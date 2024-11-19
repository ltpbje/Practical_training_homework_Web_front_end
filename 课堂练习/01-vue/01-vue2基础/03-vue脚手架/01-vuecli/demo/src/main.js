import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import pageView from './components/page-view.vue';
import titleBar from './components/title-bar.vue';
import './assets/scss/comm.scss';
import './assets/icon/iconfont.css';

const app = createApp(App);
app.component('pageView', pageView);
app.component('titleBar', titleBar);
app.use(store).use(router).mount('#app');
