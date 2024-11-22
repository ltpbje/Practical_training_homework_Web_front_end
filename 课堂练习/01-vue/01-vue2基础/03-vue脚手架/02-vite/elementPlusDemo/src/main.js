import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import 'element-plus/dist/index.css';
import { userLoginInfo } from './store/login';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.mount('#app');
const store = userLoginInfo();
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next();
    } else {
        if (store.userToken) {
            next();
        } else {
            next({ name: 'login' });
        }
    }
});
