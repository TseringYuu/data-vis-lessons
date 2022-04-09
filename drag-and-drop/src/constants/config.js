import * as dft from './default';

// 组件列表的配置项
export const WIDGET_LIST = [
  {
    type: 'area-chart',
    component: 'area-chart',
    label: '面积图',
    default: dft.AREA_CHART,
  },
  {
    type: 'bar-chart',
    component: 'bar-chart',
    label: '柱状图',
    default: dft.BAR_CHART,
  },
  {
    type: 'text',
    component: 'custom-text',
    label: '文字',
    default: dft.TEXT,
  },
  {
    type: 'video',
    component: 'custom-video',
    label: '视频',
    default: dft.VIDEO,
  },
];

// to do
