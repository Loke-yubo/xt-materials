import _ from 'lodash'

const initMetaHelper = (metaHelper?: XtMaterials.MetaHelper) => {
  const result: XtMaterials.MetaHelper = {
    name: '',
    icon: '',
    picturl: '',
    groupName: '',
    subGroupName: ''
  }
  return Object.assign(result, _.cloneDeep(metaHelper))
}

const initConfigHelper = (configHelper?: XtMaterials.ConfigHelper) => {
  const result: XtMaterials.ConfigHelper = {
    attrs: [
      {
        label: '配置id',
        key: 'id',
        value: '',
        placeholder: '请输入id'
      }
    ],
    'v-if': '',
    'v-else-if': '',
    'v-else': '',
    'v-show': '',
    'v-slot': [
      {
        label: '插槽名称',
        placeholder: '请输入插槽名称',
        key: 'slotName',
        value: 'default'
      },
      {
        label: '插槽作用域',
        placeholder: '请输入插槽作用域',
        key: 'slotScoped',
        value: 'scoped'
      }
    ],
    'v-on': [],
    'v-bind': []
  }
  return Object.assign(result, _.cloneDeep(configHelper))
}

const initTemplateNodeWhenClone = (componentDefinition: XtMaterials.ComponentDefinition) => {
  let result: XtMaterials.TemplateNode
  if (!componentDefinition._templateNodeWhenClone) {
    const configHelper = initConfigHelper()
    result = {
      name: componentDefinition.name,
      children: [],
      ...configHelper
    }
  } else {
    result = _.cloneDeep(componentDefinition._templateNodeWhenClone)
  }
  return result
}

const initTemplateNode = (componentDefinition:XtMaterials.ComponentDefinition) => {
  let result: XtMaterials.TemplateNode
  if (!componentDefinition._templateNode) {
    // 没有的话，说明此时的需求是：我要定义一个组件。那么这里的话，就提供一个顶层元素：template，理论上该元素是不需要configHelper的
    const configHelper = initConfigHelper()
    result = {
      name: 'template',
      children: [],
      ...configHelper
    }
  } else {
    result = _.cloneDeep(componentDefinition._templateNode)
  }
  return result
}

export class ComponentDefinition implements XtMaterials.ComponentDefinition {
  name = ''
  _metaHelper?: XtMaterials.MetaHelper;
  _configHelper?: XtMaterials.ConfigHelper;
  _actionHepler?: XtMaterials.ActionHelper;
  _templateNode?: XtMaterials.TemplateNode;
  _templateNodeWhenClone?: XtMaterials.TemplateNode;

  constructor (componentDefinition: XtMaterials.ComponentDefinition) {
    Object.assign(this, _.cloneDeep(componentDefinition))
    this._metaHelper = initMetaHelper(componentDefinition._metaHelper)
    this._configHelper = initConfigHelper(componentDefinition._configHelper)
    this._templateNodeWhenClone = initTemplateNodeWhenClone(componentDefinition)
    /** 这个是后面在生成js文件的基础上，进行编辑node节点的时候，预留的字段。根据该字段，可以重新生成“该组件定义时的node节点” */
    // TODO
    this._templateNode = initTemplateNode(componentDefinition)
  }
}
