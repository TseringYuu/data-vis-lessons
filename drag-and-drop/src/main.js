import Vue from 'vue';
import App from './App.vue';
import VueDragResize from 'vue-drag-resize';
import 'echarts';
import ECharts from 'vue-echarts';

Vue.component('Dragger', VueDragResize);
Vue.component('ECharts', ECharts);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
