<template>
  <div id="app">
    <!-- 组件列表 -->
    <div class="widget-list">
      <div
        class="widget"
        draggable="true"
      >
        pie
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
        我是新来的
      </div>
    </div>
  </div>
</template>

<script>
let currentId = 0;

export default {
  name: 'App',
  data () {
    return {
      list: [],
    };
  },
  methods: {
    // 放置
    onDrop (e) {
      this.list.push({
        id: currentId++,
        x: e.offsetX,
        y: e.offsetY,
      });
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
  font-size: 50px;
  text-align: center;
  line-height: 100px;
}
.box {
  width: 300px;
  height: 200px;
  outline: 1px solid blue;
  position: absolute;
}
</style>
