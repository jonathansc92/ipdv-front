//theme
import '@/assets/themes/material/material-light/standard/indigo/theme.scss';
    
//core
import "primevue/resources/primevue.min.css";

// framework css
import '/node_modules/primeflex/primeflex.css';

import '@/assets/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import interceptors from './services/interceptors';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

interceptors();

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App)
app.use(pinia);
app.use(Toast);
app.use(PrimeVue);
app.use(router)

app.mount('#app')
