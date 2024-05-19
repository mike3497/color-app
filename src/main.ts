import '@/assets/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

import App from '@/App.vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
