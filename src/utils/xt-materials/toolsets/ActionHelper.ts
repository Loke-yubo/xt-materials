export class ActionHelper implements XtMaterials.ActionHelper {
  isInOrigin = true;
  isInCanvas = false;
  isMouseOn = false;
  isOnDrag = false;
  isDragEnter = false;
  componentDefinition: XtMaterials.ComponentDefinition

  constructor (componentDefinition: XtMaterials.ComponentDefinition) {
    this.componentDefinition = componentDefinition
  }

  setIsInOrigin (val: boolean): void {
    this.isInOrigin = val
  }

  setIsInCanvas (val: boolean): void {
    this.isInCanvas = val
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
    const componentDefinition = {}
    return componentDefinition as any
  }

  delete (): void {
    throw new Error('Method not implemented.')
  }

  addByBefore (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  addByAfter (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  addByUnShift (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  addByPush (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  exchange (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  up (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }

  down (component: XtMaterials.ComponentDefinition): void {
    throw new Error('Method not implemented.')
  }
}
