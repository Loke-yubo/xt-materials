/* eslint-disable no-use-before-define */

/**
 * 采用装饰模式进行设计，先遵循Vue的Component选项规范，然后“装饰”成一个“ComponentNode”
 *
 */
declare namespace XtMaterials {

  export interface TemplateNode{
    name: string
    /** 上面是应用到组件自身的配置项的，下面是应用到直接子元素的 */
    children: ComponentDefinition[];
    parent: ComponentDefinition | null
  }
  /** 组件的定义，参考Vue2组件 */
  export interface ComponentDefinition {
    name?: string;
    /** 其他的属性就偷懒不穷举出来了 */
    [x: string]: any;
    nodes?: any[]

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

  export interface MetaHelper{
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

  /** 操作工具函数、增删查改、拖拽 */
  export interface ActionHelper {
    /** 是否为左侧的原始组件，这时只能执行“拖动”操作 */
    isInOriginView: boolean;
    /** 是否在画布里面，可以进行若干操作，数据是原始组件的深拷贝 */
    isInCanvasView: boolean;
    isMouseOn: boolean;
    isOnDrag: boolean;
    isDragEnter: boolean;
    setIsInOriginView(val: boolean): void;
    setIsInCanvasView(val: boolean): void;
    setIsMouseOn(val: boolean): void;
    setIsOnDrag(val: boolean): void;
    setIsDragEnter(val: boolean): void;
    clone(): ComponentDefinition;
    delete(): void;
    addByBefore(component: ComponentDefinition): void;
    addByAfter(component: ComponentDefinition): void;
    addByUnShift(component: ComponentDefinition): void;
    addByPush(component: ComponentDefinition): void;
    exchange(component: ComponentDefinition): void;
    up(): void;
    down(): void;
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
