import _ from 'lodash'
import { ElMessage } from 'element-plus'

export class ActionHelper implements XtMaterials.ActionHelper {
  clipboard?: XtMaterials.TemplateNode;
  /** 需要校验template只能有一个直接子节点 */
  rootNode: XtMaterials.TemplateNode;
  constructor (rootNode: XtMaterials.TemplateNode) {
    this.rootNode = rootNode
  }

  getParent (target: XtMaterials.TemplateNode): [XtMaterials.TemplateNode, number] {
    const [parent, idx] = findParentNode(this.rootNode, target)
    return [parent, idx]
  }

  clone (target: XtMaterials.TemplateNode): XtMaterials.TemplateNode {
    if (!this._checkIsNotRootNode(target)) throw new Error('根节点不可复制！')
    const cloned = _.cloneDeep(target)
    return cloned
  }

  copy (target: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const cloned = this.clone(target)
    const [parent, idx] = this.getParent(target)
    parent?.children.splice(idx, 0, cloned)
  }

  copyToClipboard (target: XtMaterials.TemplateNode):void {
    this.clipboard = target
  }

  cut (target: XtMaterials.TemplateNode):void {
    this.copyToClipboard(target)
    this.del(target)
  }

  paste (target: XtMaterials.TemplateNode):void {
    if (!this.clipboard) {
      ElMessage.info('剪切板中没有节点！')
      return
    }
    this.addByPush(target, this.clipboard!)
  }

  del (target: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const [parent, idx] = this.getParent(target)
    parent?.children.splice(idx, 1)
  }

  addByBefore (target: XtMaterials.TemplateNode, node: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const cloned = this.clone(node)
    const [parent, idx] = this.getParent(target)
    parent?.children.splice(idx, 0, cloned)
    console.log('before')
  }

  addByAfter (target: XtMaterials.TemplateNode, node: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const cloned = this.clone(node)
    const [parent, idx] = this.getParent(target)
    parent?.children.splice(idx + 1, 0, cloned)
    console.log('after')
  }

  addByUnShift (target: XtMaterials.TemplateNode, node: XtMaterials.TemplateNode): void {
    const cloned = this.clone(node)
    target.children.unshift(cloned)
    console.log('unshift')
  }

  addByPush (target: XtMaterials.TemplateNode, node: XtMaterials.TemplateNode): void {
    const cloned = this.clone(node)
    target.children.push(cloned)
    console.log('push')
  }

  up (target: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const [parent, idx] = this.getParent(target)
    if (idx === 0) return ElMessage.info('第一个节点不能再上移了') && undefined
    const node1 = parent.children[idx - 1]
    const node2 = parent.children[idx]
    parent.children[idx - 1] = node2
    parent.children[idx] = node1
  }

  down (target: XtMaterials.TemplateNode): void {
    if (!this._checkIsNotRootNode(target)) return
    const [parent, idx] = this.getParent(target)
    if (idx === parent.children.length - 1) return ElMessage.info('最后一个节点不能再下移了') && undefined
    const node1 = parent.children[idx]
    const node2 = parent.children[idx + 1]
    parent.children[idx] = node2
    parent.children[idx + 1] = node1
  }

  /** 检查不是根节点，才可以做上下移动、复制、剪切等操作 */
  private _checkIsNotRootNode (node:XtMaterials.TemplateNode) {
    if (node === this.rootNode) return ElMessage.error('根节点不能执行此操作') && false
    return true
  }
}

const findParentNode = (
  root: XtMaterials.TemplateNode,
  child: XtMaterials.TemplateNode
) => {
  let parent: XtMaterials.TemplateNode | null = null
  let idx = -1
  const _fn = (temp: XtMaterials.TemplateNode) => {
    if (!Array.isArray(temp.children)) return
    const _idx = temp.children.findIndex((item) => item === child)
    if (_idx > -1) {
      parent = temp
      idx = _idx
      return
    }
    if (Array.isArray(temp.children) && temp.children.length > 0) { return temp.children.forEach(_fn) }
  }
  _fn(root)
  return [parent, idx] as unknown as [XtMaterials.TemplateNode, number]
}
