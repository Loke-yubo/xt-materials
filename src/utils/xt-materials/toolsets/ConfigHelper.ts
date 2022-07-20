import _ from 'lodash'

export class ConfigHelper implements XtMaterials.ConfigHelper {
  attrs: XtMaterials.AttrConfig[] = [];
  'v-if' = '';
  'v-else' = '';
  'v-slot'= '';
  'v-show'= '';
  'v-on': XtMaterials.AttrConfig[] = [];
  'v-bind': XtMaterials.AttrConfig[] = [];
  children: XtMaterials.ComponentDefinition[] = []
  parent: XtMaterials.ComponentDefinition | null = null;
  constructor (configHelper?: XtMaterials.ConfigHelper) {
    Object.assign(this, _.cloneDeep(configHelper))
  }
}
