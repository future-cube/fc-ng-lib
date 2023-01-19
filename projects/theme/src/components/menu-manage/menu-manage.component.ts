import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { STComponent } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';

@Component({
  selector: 'fc-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {
  // 功能搜索
  @Input() url: string = `admin/setting/node/list`;

  // 默认一页显示多个条
  @Input() ps: number = 999;

  // 默认菜单排序规则
  @Input() sort: string = '';

  // 编号字段映射名称
  @Input() idMapName: string = 'id';

  // 父级编号字段映射名称
  @Input() parentIdMapName: string = 'topId';

  // 单级别缩进长度
  @Input() indentSize: number = 24;

  @Input() scroll: { x?: string; y?: string } | undefined = { x: '1600px' };

  // 列配置
  @Input() columns: any[] = [
    { title: '菜单名称', index: 'title', render: 'title', width: '360px' },
    { title: '说明', index: 'remark', width: '360px' },
    { title: '代码', index: 'code', width: '300px' },
    { title: '分类', index: 'category', className: 'text-center' },
    {
      title: '是否菜单',
      index: 'isMenu',
      className: 'text-center',
      format: (item: any, col: any, idx: number) => {
        return item.status ? '是' : '否';
      }
    },
    {
      title: '状态',
      index: 'status',
      className: 'text-center',
      format: (item: any, col: any, idx: number) => {
        return item.status ? '有效' : '无效';
      }
    },
    { title: '权重', className: 'text-center', index: 'rankValue' }
    // { title: '操作', index: '', render: 'button' }
  ];

  @Output() readonly clickTitle = new EventEmitter<any>();

  // 功能列表
  @ViewChild('nzTable', { static: true }) nzTable!: STComponent;

  // 功能列表树数据
  nodes: any;

  expandDataCache: any = {};

  page: any;

  // 获取功能节点列表
  getData(): void {
    this.http.get(this.url, { sort: this.sort, ps: this.ps }).subscribe((res: any) => {
      this.page = res.page;
      this.nodes = this.arrService.arrToTree(res.items, {
        idMapName: this.idMapName,
        parentIdMapName: this.parentIdMapName
      });
      this.nodes.forEach((item: any) => {
        this.expandDataCache[item.nodeId] = this.convertTreeToList(item);
      });
      console.log(this.nodes, this.expandDataCache);
    });
  }
  collapse(array: any, data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach((d: any) => {
          const target = array.find((a: any) => a.nodeId === d.nodeId);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root: object): any {
    const stack = [];
    const array: any = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node: any = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({
            ...node.children[i],
            level: node.level + 1,
            expand: true,
            parent: node
          });
        }
      }
    }

    return array;
  }

  // 把菜单添加到哈希表中
  visitNode(node: any, hashMap: any, array: any): void {
    if (!hashMap[node.nodeId]) {
      hashMap[node.nodeId] = true;
      array.push(node);
    }
  }

  constructor(private http: _HttpClient, private arrService: ArrayService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.getData();
  }

  _clickTitle(item: any): void {
    console.log(item);
    this.clickTitle.emit(item);
  }
}
