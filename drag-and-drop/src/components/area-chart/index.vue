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
  },
  computed: {
    option () {
      return {
        xAxis: {
          type: 'category',
          data: this.value.map(item => item.name),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.value.map(item => item.value),
            type: 'bar'
          },
        ],
      };
    },
  },
}
</script>

<style lang="less" scoped>

</style>