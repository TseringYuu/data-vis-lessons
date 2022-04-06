<template>
  <div id="app">
    <!-- 组件列表 -->
    <div class="widget-list">
      <div
        v-for="widget in widgetList"
        :key="widget.type"
        class="widget"
        draggable="true"
        @mousedown="(e) => onWidgetMouseDown(e, widget)"
      >
        {{ widget.label }}
      </div>
    </div>
    <!-- 操作面板 -->
    <div
      class="panel"
      @dragover="e => e.preventDefault()"
      @drop="onDrop"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="box"
        :style="`transform: translate(${ item.x }px, ${ item.y }px);`"
      >
        我是{{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;

export default {
  name: 'App',
  data () {
    return {
      list: [],
      widgetList: [
        {
          type: 'pie',
          label: '饼图',
        },
        {
          type: 'line',
          label: '折线图',
        },
        {
          type: 'bar',
          label: '柱状图',
        },
      ],
    };
  },
  methods: {
    // 放置
    onDrop (e) {
      this.list.push({
        id: currentId++,
        x: e.offsetX - widgetX,
        y: e.offsetY - widgetY,
        label: currentWidget.label,
      });
    },
    // 在小组件鼠标落下的时候
    onWidgetMouseDown (e, widget) {
      widgetX = e.offsetX;
      widgetY = e.offsetY;
      currentWidget = widget;
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.widget-list {
  width: 200px;
  background: #e9e9e9;
}
.panel {
  flex: 1;
  background: #f6f6f6;
  position: relative;
}
.widget {
  width: 100px;
  height: 100px;
  outline: 1px solid red;
  font-size: 24px;
  text-align: center;
  line-height: 100px;
  margin: 24px;
}
.box {
  width: 300px;
  height: 200px;
  outline: 1px solid blue;
  position: absolute;
}
</style>
