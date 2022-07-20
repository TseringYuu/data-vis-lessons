import { createApp } from 'vue';
import ECharts from 'vue-echarts';
import App from './App.vue';
import 'echarts';

createApp(App)
    .component('ECharts', ECharts)
    .mount('#app');
