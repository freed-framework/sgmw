/**
 * @file Emitter.ts
 * @author denglingbo
 *
 * emitter 类，事件广播
 */
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Emitter extends Vue {
  dispatch(componentName: string, eventName: string, params: Array<any>) {
    var parent: any = this.$parent || this.$root
    var name: string = parent.componentName

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.componentName
      }
    }

    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }
}
