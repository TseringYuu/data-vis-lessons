<script setup>
import { ref, computed } from 'vue';
import { getData } from './api/chart';
import moment from 'moment';

const data = ref([]);
const loading = ref(false);

getData(
  moment('2022-01-01').valueOf(),
  moment('2022-05-11').valueOf(),
).then(res => {
  data.value = res.data.data;
});

const option = computed(() => ({
  xAxis: {
    type: 'category',
    data: data.value.map(item => moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: data.value.map(item => item.value),
      type: 'line',
    },
  ],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
    },
  },
}));

function onDataZoom (e) {
  const { startValue, endValue } = e;
  const start = data.value[startValue].timestamp;
  const end = data.value[endValue].timestamp;

  loading.value = true;
  getData(start, end).then(res => {
    loading.value = false;
    data.value = res.data.data;
  });

}

</script>

<template>
  <span v-if="loading">loading...</span>
  <e-charts
    id="chart"
    v-else
    :option="option"
    @dataZoom="onDataZoom"
  />
</template>

<style>
body {
  margin: 0;
}
#chart {
  width: 100vw;
  height: 100vh;
}
</style>
