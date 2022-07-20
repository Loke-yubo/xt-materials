// import { ActionHelper } from './ActionHelper'
import { ConfigHelper } from './ConfigHelper'
import { MetaHelper } from './MetaHelper'
import _ from 'lodash'

export class ComponentDefinition implements XtMaterials.ComponentDefinition {
  _metaHelper?: XtMaterials.MetaHelper;
  _configHelper?: XtMaterials.ConfigHelper;
  _actionHepler?: XtMaterials.ActionHelper;
  _templateNode?: XtMaterials.TemplateNode;

  constructor (componentDefinition?: XtMaterials.ComponentDefinition) {
    /**
     * 明确下逻辑：
     * 只有_actionHepler是在ComponentDefinition实例化的时候，实例化的，其他的都可以从参数中获取初始项
     */
    Object.assign(this, _.cloneDeep(componentDefinition))
    this._metaHelper = new MetaHelper(componentDefinition?._metaHelper)
    this._configHelper = new ConfigHelper(componentDefinition?._configHelper)
    // this._templateNode = new TemplateNode(this)
    this._templateNode = {} as any
  }
}
