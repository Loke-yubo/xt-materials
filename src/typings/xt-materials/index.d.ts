/* eslint-disable no-use-before-define */

/**
 * 采用装饰模式进行设计，先遵循Vue的Component选项规范，然后“装饰”成一个“ComponentNode”
 *
 */
declare namespace XtMaterials {
  /** 组件的定义，参考Vue2组件 */
  export interface ComponentDefinition {
    name?: string;
    /** 其他的属性就偷懒不穷举出来了 */
    [x: string]: any;

    /**
     * 组件的template节点信息，供可视化平台使用
     * 数据可以保存导出
     */
    _templateNode?: TemplateNode;
    /** 在拷贝时，复制出来的节点信息，表示拖动到界面上会渲染为多个node节点 */
    _templateNodeWhenClone?: TemplateNode;

    /**
     * 组件的元信息，供可视化平台使用
     * 数据可以保存导出
     */
    _metaHelper?: MetaHelper;
    /**
     * 组件的config帮助信息（部分比较重要的），在实例化ConfigHelper的时候会和默认的选项合并
     * 数据可以保存导出，children也可以配置，不过在Vue.component注册组件的时候，会采用define的插件
     */
    _configHelper?: ConfigHelper;
    /**
     * 组件的action操作帮助对象，负责处理节点的clone、拖拽、删除等操作
     * 数据不可以保存导出，在ComponentDefinition实例化的时候，进行实例化
     */
    _actionHepler?: ActionHelper;
  }

  /**
   * 用来生成ComponentDefinition的template的
   */
  export interface TemplateNode extends ConfigHelper {
    /** 节点名称 */
    name: string;
    /** 子节点 */
    children: TemplateNode[];
    // templateEnhanced: TemplateNodeEnhanced
  }

  interface TemplateNodeEnhanced {
    isActive: false;
  }

  export interface MetaHelper {
    name: string;
    icon: string;
    picturl: string;
    groupName: string;
    subGroupName: string;
  }

  /** 属性配置项 */
  export interface AttrConfig {
    label: string;
    placeholder: string;
    key: string;
    value: string;
  }

  /** 配置助手，attrs、v-if、v-bind、v-on、v-slot、children等等，用于生成template */
  export interface ConfigHelper {
    attrs: AttrConfig[];
    'v-if': string;
    'v-else': string;
    'v-slot': string;
    'v-show': string;
    'v-on': AttrConfig[];
    'v-bind': AttrConfig[];
  }

  /** 操作工具函数、增删查改、拖拽、剪切、粘贴、复制、拷贝等操作 */
  export interface ActionHelper {
    /** 剪切板，复制、剪切等操作就会把TemplateNode保存到ActionHelper.clipboard上 */
    clipboard?: TemplateNode;
    rootNode: TemplateNode;
    getTemplateNodeByComponentDefinition(
      componentDefinition: ComponentDefinition
    ): TemplateNode;
    getParent(target: TemplateNode): [TemplateNode, number];
    clone(target: TemplateNode): TemplateNode;
    copy(target: TemplateNode): void;
    copyToClipboard(target: TemplateNode): void;
    cut(target: TemplateNode): void;
    paste(target: TemplateNode): void;
    del(target: TemplateNode): void;
    addByBefore(target: TemplateNode, node: TemplateNode): void;
    addByAfter(target: TemplateNode, node: TemplateNode): void;
    addByUnShift(target: TemplateNode, node: TemplateNode): void;
    addByPush(target: TemplateNode, node: TemplateNode): void;
    up(target: TemplateNode): void;
    down(target: TemplateNode): void;
  }

  /** 插件的定义，参考Vue2插件 */
  export interface PluginDefinition {
    install: any;
    components?: ComponentDefinition[];
  }

  export interface Generator {
    transpiler: any;
    hunxiao: any;
  }

  export interface Renderer {
    requireModules: Promise<any>;
    Vue: any;
    render(): any;
  }
}
