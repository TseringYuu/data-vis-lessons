import Vue from 'vue';
import App from './App.vue';
import VueDragResize from 'vue-drag-resize';
import 'echarts';
import ECharts from 'vue-echarts';
import ElementUI from 'element-ui';
import Sortable from 'vuedraggable';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-context/dist/css/vue-context.css';

Vue.component('Dragger', VueDragResize);
Vue.component('ECharts', ECharts);
Vue.component('Sortable', Sortable);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
