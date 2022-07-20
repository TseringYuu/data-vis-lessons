<template>
  <e-charts class="chart" :option="option" />
</template>

<script setup>
import { ref, computed } from 'vue';

const data = ref([
  { value: 50, name: 'A' },
  { value: 40, name: 'B' },
  { value: 30, name: 'C' },
  { value: 55, name: 'D' },
  { value: 120, name: 'E' },
]);

setInterval(() => {
  data.value = data.value.map(item => ({
    ...item,
    value: Math.random() * 100,
  }));
}, 1000);

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: data.value.map(d => d.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.value.map(d => d.value),
        type: 'line',
      },
    ],
  }
});

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>