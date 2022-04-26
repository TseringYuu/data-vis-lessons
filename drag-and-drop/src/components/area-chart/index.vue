<template>
  <e-charts
    :option="option"
    autoresize
  />
</template>

<script>
export default {
  props: {
    // { name: string, value: number }[]
    value: Array,
    styles: Object,
  },
  computed: {
    option () {
      return {
        xAxis: {
          show: this.styles.xAxisVisible,
          type: 'category',
          data: this.value.map(item => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.value.map(item => item.value),
            type: 'line',
            areaStyle: {
              color: this.styles.areaColor,
            },
            lineStyle: {
              color: this.styles.lineColor,
            },
          },
        ],
      };
    },
  },
}
</script>

<style lang="less" scoped>

</style>