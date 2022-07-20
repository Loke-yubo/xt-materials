export class Platform {
  componentDefinitionList: XtMaterials.ComponentDefinition[] = []

  addComponentDefinition (componentDefinition: XtMaterials.ComponentDefinition) {
    this.componentDefinitionList.push(componentDefinition)
  }
}
