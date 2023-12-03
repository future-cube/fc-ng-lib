import { SFSchema, SFUISchema } from '@delon/form';

const getGrid = (): { grid: SFSchema } => {
  return {
    grid: {
      type: 'object',
      title: '响应式属性',
      properties: {
        gutter: {
          title: '栅格间隔像素',
          type: 'number'
        },
        span: {
          title: '表单占用栅格',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        xs: {
          title: '<768px',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        sm: {
          title: '≥768px',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        md: {
          title: '≥992px',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        lg: {
          title: '≥1200px',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        xl: {
          title: '≥1600px',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        },
        xxl: {
          title: '保留字段',
          type: 'number',
          enum: Array.from(Array(25), (_, x) => x)
        }
      }
    }
  };
};
const getHorizontallayout = (): { [key: string]: SFSchema } => {
  return {
    spanLabel: {
      title: '标签栅格数',
      type: 'number',
      enum: Array.from(Array(25), (_, x) => x)
    },
    spanControl: {
      title: '控件栅格数',
      type: 'number',
      enum: Array.from(Array(25), (_, x) => x)
    },
    offsetControl: {
      title: '左侧间隔',
      enum: Array.from(Array(25), (_, x) => x),
      type: 'number'
    },
    spanLabelFixed: {
      title: '固定宽度',
      type: 'number'
    }
  };
};
const commonGrid = { grid: { span: 12 }, spanLabelFixed: 120, allowClear: true };
const getGridUi = (): SFUISchema => {
  return {
    $grid: {
      type: 'card',
      grid: { span: 24, gutter: 24, arraySpan: 24 },
      $gutter: {
        widget: 'number',
        ...commonGrid,
        unit: 'px'
      },
      $span: commonGrid,
      $xs: commonGrid,
      $sm: commonGrid,
      $md: commonGrid,
      $lg: commonGrid,
      $xl: commonGrid,
      $xxl: commonGrid
    }
  };
};
const commonGrid2 = { grid: { span: 12 }, spanLabelFixed: 120, allowClear: true };
const getHorizontallayoutUi = (): SFUISchema => {
  return {
    $spanLabel: commonGrid2,
    $spanControl: {
      ...commonGrid2
    },
    $offsetControl: {
      ...commonGrid2
    },
    $spanLabelFixed: {
      ...commonGrid2,
      unit: 'px'
    }
  };
};
export { getGrid, getHorizontallayout, getGridUi, getHorizontallayoutUi };
