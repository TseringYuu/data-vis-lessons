<template>
  <div id="app">
    <el-tabs v-model="siderType" class="sider">
      <el-tab-pane label="图层" name="layer">
        <!-- 图层列表 -->
        <sortable v-model="list" @change="onSortChange">
          <transition-group>
            <div
              class="layer"
              v-for="item in list"
              :key="item.id"
            >
              {{ item.label }}
            </div>
          </transition-group>
        </sortable>

      </el-tab-pane>
      <el-tab-pane label="组件" name="widget">
        <!-- 组件列表 -->
        <widget-list
          :list="widgetList"
          @onWidgetMouseDown="onWidgetMouseDown"
        />
      </el-tab-pane>
    </el-tabs>
    <!-- 操作面板 -->
    <div
      class="panel"
      ref="panel"
      @dragover.prevent
      @drop="onDrop"
    >
      <dragger
        v-for="(item, i) in list"
        :key="item.id"
        ref="widget"
        class="box"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        :w="item.w"
        :h="item.h"
        :isActive="item.focused"
        @contextmenu.native.prevent="onContextMenuOpen($event, item)"
        @clicked="onFocus(item)"
        @mouseup.native="onWidgetMouseUp(i)"
        @dragging="(info) => onWidgetDrag(info, item.id)"
      >
        <component
          class="inner-widget"
          :is="item.component"
          :value="item.value"
          :styles="item.styles"
          @drop.native.stop="onDrop($event, i)"
        />
      </dragger>
    </div>

    <style-sider
      class="sider right"
      :current="current"
      :form="currentForm"
      @change="onStyleChange"
    />

    <context-menu ref="contextMenu">
      <li>
          <a href="#" @click.prevent="onLayerTop">置顶</a>
      </li>
      <li>
          <a href="#" @click.prevent="onLayerBottom">置底</a>
      </li>
      <li>
          <a href="#" @click.prevent="onLayerUp">上移图层</a>
      </li>
      <li>
          <a href="#" @click.prevent="onLayerDown">下移图层</a>
      </li>
      <li>
          <a href="#" @click.prevent="onLayerRemove">删除</a>
      </li>
    </context-menu>

    <!-- 对齐线 纵向 -->
    <div
      v-if="verticalStandardLineVisible"
      :class="{
        'standard-line': true,
        'correct': isVerticalStandardLineCorrect,
      }"
      :style="`transform: translateX(-50%) translateX(${ verticalStandardLineX }px)`"
    />

  </div>
</template>

<script>
// 小组件列表
import WidgetList from '@/components/widget-list';
// 样式配置区域
import StyleSider from '@/components/style-sider';
// 左侧小组件
import BarChart from '@/components/bar-chart';
import AreaChart from '@/components/area-chart';
import CustomText from '@/components/custom-text';
import CustomVideo from '@/components/custom-video';
// 右键菜单
import ContextMenu from 'vue-context';
// 静态配置
import * as CONFIG from '@/constants/config';
import { cloneDeep, isEqual } from 'lodash';

let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;
// 用于撤回的记录
const recordList = [];
// 用于反撤回的记录
const recordList4ctrlY = [];

export default {
  name: 'App',
  components: {
    WidgetList,
    BarChart,
    AreaChart,
    CustomText,
    CustomVideo,
    ContextMenu,
    StyleSider,
  },
  data () {
    return {
      siderType: 'widget',
      list: [],
      widgetList: CONFIG.WIDGET_LIST,
      verticalStandardLineVisible: false,
      isVerticalStandardLineCorrect: false,
      verticalStandardLineX: 0,
    };
  },
  computed: {
    current () {
      return this.list.find(item => item.focused);
    },
    currentForm () {
      if (!this.current) {
        return [];
      }
      return CONFIG.WIDGET_LIST.find(item => this.current.type === item.type).styleForm;
    },
  },
  methods: {
    onWidgetMouseUp (i) {
      const current = this.list[i]; // x, y, w, h
      const rect = this.$refs.widget[i].rect; // left, top, width, height
      if (!(current.x === rect.left && current.y === rect.top && current.w === rect.width && current.h === rect.height)) {
        this.record(rect);
      }
    },
    setNewList (newList) {

      function updateItem (item, newItem) {
        item.x = newItem.x;
        this.$nextTick(() => {
          item.y = newItem.y;
          this.$nextTick(() => {
            item.w = newItem.w;
            this.$nextTick(() => {
              item.h = newItem.h;
            });
          });
        });
      }

      // to fix
      for (const newItem of newList) {
        const item = this.list.find(item => item.id === newItem.id);
        item && updateItem.call(this, item, newItem);
      }

    },
    // 当拖拽时，显示对齐线
    onWidgetDrag (info, id) {
      // 1. 拿当前的x
      const {
        left: x,
        // top: y,
        width: w,
      } = info;
      const x0 = x + w / 2;
      // 2. 拿当前的x和数组中的别人挨个比
      let flag = false;
      let correct = false;
      for (const widget of this.list) {
        if (widget.id === id) {
          continue;
        }
        const x00 = widget.x + widget.w / 2;
        if (Math.abs(x0 - x00) < 10) {
          flag = true;
          if (x0 - x00 === 0) {
            correct = true;
          }
          break;
        }
      }
      this.verticalStandardLineVisible = flag;
      this.isVerticalStandardLineCorrect = correct;
      this.verticalStandardLineX = x0;
    },
    // 当图层样式改变时
    onStyleChange (id, newStyles) {
      this.list = this.list.map((item) => {
        if (item.id === id) {
          item.style = newStyles;
        }
        return item;
      });
    },
    onKeyUp (e) {
      // ctrl + z
      if (e.ctrlKey && e.key === 'z') {
        this.withdraw();
      }
      // ctrl + y
      if (e.ctrlKey && e.key === 'y') {
        this.ctrlY();
      }
    },
    // 记录list
    record (rect) {
      if (rect) {
        // 更新list
        const current = this.list.find(item => item.focused);
        current.x = rect.left;
        current.y = rect.top;
        current.w = rect.width;
        current.h = rect.height;
      }

      recordList.push(cloneDeep(this.list));
      console.log(recordList);
    },
    // 撤回
    withdraw () {
      if (recordList.length === 0) {
        alert('撤回到底了');
        return;
      }
      const idx = recordList.length - 2; // -1
      if (idx === -1) {
        this.list = [];
      } else {
        this.setNewList(recordList[idx]);
      }
      const tmp = recordList.pop();
      recordList4ctrlY.push(tmp);
    },
    // 反撤回
    ctrlY () {
      this.list = recordList4ctrlY.pop();
      this.record();
    },
    onSortChange () {
      const len = this.list.length;
      this.list.forEach((item, i) => {
        item.z = len - i;
      });
    },
    // 给list排序
    sortList () {
      this.list.sort((a, b) => b.z - a.z);
    },
    findTopLayerZ (currentItem) {
      const maxZ = Math.max(...this.list.map(item => item.z)) || 0;
      if (currentItem.z === maxZ) {
        alert('已经是最顶层了');
        return;
      }
      return maxZ;
    },
    findBottomLayerZ (currentItem) {
      const minZ = Math.min(...this.list.map(item => item.z)) || 0;
      if (currentItem.z === minZ) {
        alert('已经是最底层了');
        return false;
      }
      return minZ;
    },
    // 移除图层
    onLayerRemove () {
      this.list = this.list.filter(item => !item.focused);
      this.sortList();
      this.record();
    },
    // 上移图层
    onLayerUp () {
      const currentItem = this.list.find(item => item.focused);
      if (!this.findTopLayerZ(currentItem)) {
        return;
      }
      // 楼上的
      const upstairs = this.list.find(item => item.z === currentItem.z + 1 && item.id !== currentItem.id);
      // 如果找到楼上的 就让楼上搬下来
      upstairs && (upstairs.z--);
      currentItem.z++;
      this.sortList();
      this.record();
    },
    // 下移图层
    onLayerDown () {
      const currentItem = this.list.find(item => item.focused);
      if (this.findBottomLayerZ(currentItem) === false) {
        return;
      }
      currentItem.z--;
      // 楼下的
      const downstairs = this.list.find(item => item.z === currentItem.z && item.id !== currentItem.id);
      // 如果找到楼下的 就让楼下搬上来
      downstairs && (downstairs.z++);

      console.log(currentItem, downstairs);
      this.sortList();
      this.record();
    },
    // 置顶
    onLayerTop () {
      const currentItem = this.list.find(item => item.focused);
      const maxZ = this.findTopLayerZ(currentItem);
      if (!maxZ) {
        return;
      }
      currentItem.z = maxZ + 1;
      this.sortList();
      this.record();
    },
    // 置底
    onLayerBottom () {
      const currentItem = this.list.find(item => item.focused);
      const minZ = this.findBottomLayerZ(currentItem);
      if (minZ === false) {
        return;
      }
      if (minZ - 1 < 0) {
        this.list = this.list.map(item => {
          item.z -= minZ - 1;
          return item;
        });
        currentItem.z = 0;
      } else {
        currentItem.z = minZ - 1;
      }
      this.sortList();
      this.record();
    },
    // 让当前项获取焦点 其他项失去焦点
    onFocus (currentItem) {
      this.list = this.list.map(item => {
        item.focused = item.id === currentItem.id;
        return item;
      });
    },
    // 右键菜单打开事件
    onContextMenuOpen (e, item) {
      // 打开右键菜单
      this.$refs.contextMenu.open(e);
      // 给当前项获取焦点
      this.onFocus(item);
    },
    // 放置
    onDrop (e, i) {
      let x = e.offsetX - widgetX;
      let y = e.offsetY - widgetY;
      // 放置在其他图层上时
      if (i !== undefined) {
        x += this.list[i].x;
        y += this.list[i].y;
      }
      // 关闭右键菜单
      this.$refs.contextMenu.close();
      // 新增面板项
      const newItem = {
        id: currentId++,
        //
        x,
        y,
        // 新增的面板项层级应该最高
        z: !this.list.length
          ? 0
          : Math.max(...this.list.map(item => item.z)) + 1,
        ...currentWidget.default, // 生成默认的宽高数据 w, h, value
        label: currentWidget.label,
        component: currentWidget.component, // 新增的组件名
        type: currentWidget.type, // 新增组件的类型
        styles: currentWidget.styles, // 新增组件的类型
      };
      this.list.push(newItem);
      this.onFocus(newItem);
      this.sortList();
      this.record();
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
  mounted () {
    document.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.onKeyUp);
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
.sider {
  width: 200px;
  background: #e9e9e9;
}
.sider.right {
  width: 320px;
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
.layer {
  width: 100%;
  height: 50px;
  background: #fff;
}
.layer:hover {
  background: #e9e9e9;
}
.standard-line {
  height: 100%;
  width: 5px;
  background: rgba(255, 0, 0, 0.211);
  position: absolute;
  left: 200px;
}
.standard-line.correct {
  background: red;
}
</style>
