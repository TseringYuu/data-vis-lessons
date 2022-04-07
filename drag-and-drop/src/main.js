import Vue from 'vue';
import App from './App.vue';
import VueDragResize from 'vue-drag-resize';

Vue.component('Dragger', VueDragResize);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
