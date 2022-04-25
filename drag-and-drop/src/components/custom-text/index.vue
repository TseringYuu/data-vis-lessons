<template>
  <div
    :style="{
      color: styles.color,
      fontSize: `${ styles.fontSize }px`,
    }"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    styles: Object,
  },
}
</script>

<style lang="less" scoped>

</style>