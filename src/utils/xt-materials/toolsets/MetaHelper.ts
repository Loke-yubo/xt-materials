import _ from 'lodash'

export class MetaHelper implements XtMaterials.MetaHelper {
  name = '';
  icon = '';
  picturl = '';
  groupName = '';
  subGroupName = '';
  constructor (metaHelper:XtMaterials.MetaHelper) {
    Object.assign(this, _.cloneDeep(metaHelper))
  }
}
