/* eslint-disable no-use-before-define */

declare namespace XtMaterials {
  /** 属性配置项 */
  interface AttrConfig {
    label: string;
    placeholder: string;
    key: string;
    value: string;
  }

  /** 配置助手，attrs、v-if、v-bind、v-on、v-slot、children等等，用于生成template */
  export interface ConfigHelper {
    attrs: AttrConfig[];
    children: ComponentDefinition[];
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
    isInOrigin: boolean;
    /** 是否在画布里面，可以进行若干操作，数据是原始组件的深拷贝 */
    isInCanvas: boolean;
    isMouseOn: boolean;
    isOnDrag: boolean;
    isDragEnter: boolean;
    setIsInOrigin(val: boolean): void;
    setIsInCanvas(val: boolean): void;
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
    up(component: ComponentDefinition): void;
    down(component: ComponentDefinition): void;
  }

  /** 组件的定义，参考Vue2组件 */
  export interface ComponentDefinition {
    name: string;
    data: any;
    methods: any;
    _uiHelper: {
      name: string;
      icon: string;
      picturl: string;
    };
    _configHelper: ConfigHelper;
    _actionHelper: ActionHelper;
  }
  /** 插件的定义，参考Vue2插件 */
  export interface PluginDefinition {
    install: any;
    components: ComponentDefinition[];
  }
}
