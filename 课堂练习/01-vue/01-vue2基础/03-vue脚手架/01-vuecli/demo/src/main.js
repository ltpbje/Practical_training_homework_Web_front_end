import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import pageView from './components/page-view.vue';
const app = createApp(App);
app.component('pageView', pageView);
app.use(store).use(router).mount('#app');
