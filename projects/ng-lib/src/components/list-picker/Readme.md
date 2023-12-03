
  @Input() title?: string; // 标题
  @Input() url!: string; // 请求数据接口
  @Input() schema?: SFSchema[]; // 表单结构
  @Input() ui?: SFUISchema; //表单ui
  @Input() params: any; // 请求表格数据时的参数
  @Input() columns!: STColumn[]; // 表格结构
  @Input() scroll: { y?: string; x?: string } = {};
