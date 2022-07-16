import transpile from './transpile'

console.log('transpile', transpile(`
const component = {
  name: 'VIf',
  template: '<div v-if="value"><slot></slot></div>',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  }
}

`))
