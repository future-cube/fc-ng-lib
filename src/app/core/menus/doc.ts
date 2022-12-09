import { Menu } from '@delon/theme';

export const menus: Menu[] = [
  {
    text: '文档',
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
        link: '/doc/table',
        icon: 'anticon-table',
        badge: 2
      }
    ]
  },
  {
    text: '其他',
    group: true,
    hideInBreadcrumb: true,
    children: []
  }
];
