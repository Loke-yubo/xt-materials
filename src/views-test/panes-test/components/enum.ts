export enum ItemTypes {
  ComponentDefinition = 'ComponentDefinition'
}

export enum DropTypes{
  dropBefore = 'dropBefore',
  dropAfter = 'dropAfter',
  dropUnshift = 'dropUnshift',
  dropPush = 'dropPush'
}

export interface DropResult {
  dropType: DropTypes
  templateNode: XtMaterials.TemplateNode
}
