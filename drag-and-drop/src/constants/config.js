import * as dft from './default';
import * as styleFormConfig from './style-form-config';

// 组件列表的配置项
export const WIDGET_LIST = [
  {
    type: 'area-chart',
    component: 'area-chart',
    label: '面积图',
    default: dft.AREA_CHART_DATA,
    styles: dft.AREA_CHART_STYLE,
    styleForm: styleFormConfig.AREA_CHART,
  },
  {
    type: 'bar-chart',
    component: 'bar-chart',
    label: '柱状图',
    default: dft.BAR_CHART_DATA,
    styles: dft.BAR_CHART_STYLE,
    styleForm: styleFormConfig.BAR_CHART,
  },
  {
    type: 'text',
    component: 'custom-text',
    label: '文字',
    default: dft.TEXT_DATA,
    styles: dft.TEXT_STYLE,
    styleForm: styleFormConfig.TEXT,
  },
  {
    type: 'video',
    component: 'custom-video',
    label: '视频',
    default: dft.VIDEO_DATA,
    styles: dft.VIDEO_STYLE,
    styleForm: styleFormConfig.VIDEO,
  },
];
