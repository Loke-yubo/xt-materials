import { ComponentDefinition } from './ComponentDefinition'

export class ActionHelper implements XtMaterials.ActionHelper {
  isInOriginView = true;
  isInCanvasView = false;
  isMouseOn = false;
  isOnDrag = false;
  isDragEnter = false;
  componentDefinition: XtMaterials.ComponentDefinition

  constructor (componentDefinition: XtMaterials.ComponentDefinition) {
    this.componentDefinition = componentDefinition
  }

  setIsInOriginView (val: boolean): void {
    this.isInOriginView = val
  }

  setIsInCanvasView (val: boolean): void {
    this.isInCanvasView = val
  }

  setIsMouseOn (val: boolean): void {
    this.isMouseOn = val
  }

  setIsOnDrag (val: boolean): void {
    this.isOnDrag = val
  }

  setIsDragEnter (val: boolean): void {
    this.isDragEnter = val
  }

  clone (): XtMaterials.ComponentDefinition {
    return new ComponentDefinition(this.componentDefinition)
  }

  delete (): void {
    /** 从父Node中删除本项 */
    const [list, idx] = this._getListAndIdxByParent()
    list.splice(idx, 1)
  }

  addByBefore (component: XtMaterials.ComponentDefinition): void {
    const [list, idx] = this._getListAndIdxByParent()
    list.splice(idx, 0, component)
  }

  addByAfter (component: XtMaterials.ComponentDefinition): void {
    const [list, idx] = this._getListAndIdxByParent()
    list.splice(idx + 1, 0, component)
  }

  addByUnShift (component: XtMaterials.ComponentDefinition): void {
    this.componentDefinition._configHelper?.children.unshift(component)
  }

  addByPush (component: XtMaterials.ComponentDefinition): void {
    this.componentDefinition._configHelper?.children.push(component)
  }

  exchange (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  up (): void {
    const [list, idx] = this._getListAndIdxByParent()
    if (idx === 0) throw new Error('第一个节点不能上移')
    const component1 = list[idx - 1]
    const component2 = list[idx]
    list[idx - 1] = component2
    list[idx] = component1
  }

  down (): void {
    const [list, idx] = this._getListAndIdxByParent()
    if (idx === list.length - 1) throw new Error('最后一个节点不能下移')
    const component1 = list[idx]
    const component2 = list[idx + 1]
    list[idx] = component2
    list[idx + 1] = component1
  }

  /** 在父节点中查找本节点，返回父节点的children和下标idx */
  private _getListAndIdxByParent () {
    const list = this.componentDefinition._configHelper?.parent?._configHelper?.children || []
    const idx = list.findIndex(item => item === this.componentDefinition)
    if (idx === -1) throw new Error('没有在父节点中找到本节点')
    return [list, idx] as const
  }
}
