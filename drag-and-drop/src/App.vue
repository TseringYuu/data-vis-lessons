<template>
  <div id="app">
    <!-- 组件列表 -->
    <widget-list
      :list="widgetList"
      @onWidgetMouseDown="onWidgetMouseDown"
    />
    <!-- 操作面板 -->
    <div
      class="panel"
      @dragover="e => e.preventDefault()"
      @drop="onDrop"
    >
      <dragger
        v-for="item in list"
        :key="item.id"
        class="box"
        :style="`transform: translate(${ item.x }px, ${ item.y }px);`"
        :w="item.w"
        :h="item.h"
      >
        <component
          class="inner-widget"
          :is="item.component"
          :value="item.value"
        />
      </dragger>
    </div>
  </div>
</template>

<script>
import WidgetList from '@/components/widget-list';
import BarChart from '@/components/bar-chart';
import AreaChart from '@/components/area-chart';
import CustomText from '@/components/custom-text';
import CustomVideo from '@/components/custom-video';
import * as CONFIG from '@/constants/config';

let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;

export default {
  name: 'App',
  components: {
    WidgetList,
    BarChart,
    AreaChart,
    CustomText,
    CustomVideo,
  },
  data () {
    return {
      list: [],
      widgetList: CONFIG.WIDGET_LIST,
    };
  },
  methods: {
    // 放置
    onDrop (e) {
      // 新增面板项
      this.list.push({
        id: currentId++,
        x: e.offsetX - widgetX,
        y: e.offsetY - widgetY,
        ...currentWidget.default, // 生成默认的宽高数据 w, h, value
        // w: this.findDefaultWithType(currentWidget.type).w,
        // h: this.findDefaultWithType(currentWidget.type).h,
        label: currentWidget.label,
        component: currentWidget.component, // 新增的组件名
      });
    },
    // 在小组件鼠标落下的时候
    onWidgetMouseDown (e, widget) {
      widgetX = e.offsetX;
      widgetY = e.offsetY;
      currentWidget = widget;
    },
    // 通过type找宽高信息
    findDefaultWithType (type) {
      return CONFIG.WIDGET_LIST.find(item => item.type === type).default;
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
  outline: 1px solid blue;
  position: absolute;
}
.inner-widget {
  height: 100%;
  width: 100%;
}
</style>
