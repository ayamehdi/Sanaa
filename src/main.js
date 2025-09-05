import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
createApp(App).use(router).mount('#app')
