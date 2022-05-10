import { createApp } from 'vue';
import App from './App.vue';
import 'echarts';
import ECharts from 'vue-echarts';

createApp(App)
    .component('ECharts', ECharts)
    .mount('#app');
