/* eslint-disable */
import { Route } from 'vue-router'
import {
  State,
  Action,
  // Mutation,
  namespace,
  Getter
} from 'vuex-class'

import {
  Component,
  Vue,
  Watch,
  // Emit,
  // Inject,
  // Model,
  // Prop,
  // Provide,
} from 'vue-property-decorator'
import {
  // Input,
  Radio // eslint-disable-line
} from 'element-ui'
import { StateTypes } from '../../store/modules/home'
import Skeleton from './Skeleton.vue'

const homeAction = namespace('home', Action)
const homeGetter = namespace('home', Getter)

@Component({
  components: {
    Skeleton
  }
})
export default class Home extends Vue {
  message: string = 'Home!'
  initData: boolean = false

  @State(state => state.home) home: StateTypes
  @homeGetter('name') name: string
  @homeAction('getData') getData: any
  @homeAction('increment') handlerCount

  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    // console.log('beforeRouteEnter')
    next()
  }

  beforeRouteLeave(to: Route, from: Route, next: Function): void {
    // console.log('beforeRouteLeave')
    next()
  }

  @Watch('initData')
  watchInitData(val, old) {
    // console.log('initData: ', val, old)
  }

  created() {
    if (this.home.name) {
      this.initData = true
    }

    // console.log(this.$store.state.count)
    this.getData().then(() => {
      this.initData = true
    })
  }

  onClick(): void {
    this.$router.push({ path: '/book' })
  }

  renderRealLayout(h) {
    const { count } = this.home

    return (
      <div class="home">

      </div>
    )
  }

  render(h) {
    return (
      <div class="home-outer">
        <div class="home-inner">
          <font-awesome-icon name="home" /> 欢迎进入系统
        </div>
      </div>
    )
  }
}
