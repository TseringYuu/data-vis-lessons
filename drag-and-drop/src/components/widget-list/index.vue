<template>
  <!-- 组件列表 -->
  <div class="widget-list">
    <div
      v-for="widget in list"
      :key="widget.type"
      class="widget"
      draggable="true"
      @mousedown="(e) => $emit('onWidgetMouseDown', e, widget)"
    >
      {{ widget.label }}
    </div>
  </div>
</template>

<script>
export default {
  // 变量通过props传参
  // 逻辑通过触发自定义事件来实现
  props: {
    list: Array,
  },
}
</script>

<style lang="less" scoped>

</style>