import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'vant/lib/index.css';
import { Calendar } from 'vant';
const app = createApp(App);
app.use(Calendar);
app.mount('#app');
// createApp(App).mount('#app');
