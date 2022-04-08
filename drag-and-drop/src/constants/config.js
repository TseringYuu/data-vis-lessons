// 组件列表的配置项
export const WIDGET_LIST = [
  {
    type: 'area-chart',
    component: 'area-chart',
    label: '面积图',
    default: {
      w: 300,
      h: 150,
    },
  },
  {
    type: 'bar-chart',
    component: 'bar-chart',
    label: '柱状图',
    default: {
      w: 300,
      h: 150,
    },
  },
  {
    type: 'text',
    component: 'custom-text',
    label: '文字',
    default: {
      w: 200,
      h: 50,
    },
  },
  {
    type: 'video',
    component: 'custom-video',
    label: '视频',
    default: {
      w: 400,
      h: 300,
    },
  },
];

// to do
