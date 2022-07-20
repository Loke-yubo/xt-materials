import { ElMessage } from 'element-plus'
import { ActionHelper } from '.'

export class Platform {
  /** 平台的组件列表 */
  componentDefinitionList: XtMaterials.ComponentDefinition[] = []
  /** 平台的正在配置的节点 */
  activeTemplateNode?: XtMaterials.TemplateNode
  /** 平台正在实现的组件定义，注意这里可以同时定义多个 */
  componentDefinitions: XtMaterials.ComponentDefinition[] = []
  /** 平台的正在激活的组件定义 */
  activeComponentDefinition?: XtMaterials.ComponentDefinition

  actionHelperMap = new Map<XtMaterials.ComponentDefinition, XtMaterials.ActionHelper>()
  activeActionHelper?:XtMaterials.ActionHelper

  /** 在左侧的组件列表视图中添加一个组件 */
  addComponentDefinition (componentDefinition: XtMaterials.ComponentDefinition) {
    this.componentDefinitionList.push(componentDefinition)
  }

  /** 设置正在配置的组件节点node */
  setActiveTemplateNode (templateNode:XtMaterials.TemplateNode | null) {
    if (templateNode === null) return (this.activeTemplateNode = undefined)
    this.activeTemplateNode = templateNode
  }

  /** 设置正在激活的组件定义（同时激活的actionHelper也会刷新） */
  setActiveComponentDefinition (componentDefinition: XtMaterials.ComponentDefinition | null) {
    if (componentDefinition === null) {
      this.activeComponentDefinition = undefined
      this.activeActionHelper = undefined
      return
    }
    this.activeComponentDefinition = componentDefinition
    this.activeActionHelper = this.actionHelperMap.get(this.activeComponentDefinition)
  }

  /** 添加一个需要实现的组件定义 */
  addComponentDefinitions (componentDefinition: XtMaterials.ComponentDefinition) {
    if (this.componentDefinitions.some(comDef => comDef.name === componentDefinition.name)) return ElMessage.info('组件名称重复')
    this.componentDefinitions.push(componentDefinition)
    const actionHelper = new ActionHelper(componentDefinition._templateNode!)
    this.actionHelperMap.set(componentDefinition, actionHelper)
  }
}
