import { Menu } from '@delon/theme';

export const menus: Menu[] = [
  {
    text: '演示',
    group: true,
    hideInBreadcrumb: true,
    children: [
      {
        text: '快捷菜单',
        i18n: 'menu.shortcut',
        icon: 'anticon-rocket',
        shortcutRoot: true,
        hide: true,
        children: []
      },
      {
        text: '表格增强',
        link: '/demo/table-columns',
        icon: 'anticon-table'
      },
      {
        text: '表单',
        link: '/demo/sf',
        icon: 'anticon-form'
      }
    ]
  }
];
