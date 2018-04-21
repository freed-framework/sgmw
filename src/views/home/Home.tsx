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
  @Getter('home/name') name: string
  @homeAction('home/getData') getData: any
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
        <div class="home-section home-title">{this.message} - {this.name}</div>
        <div class="home-section home-count">Vuex count: {count}</div>
        <div class="home-section home-buttons">
          <button onClick={this.handlerCount}>Vuex Count</button>
          <button onClick={this.onClick}>Go Book Page</button>
          <el-button>默认按钮</el-button>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-radio v-model="radio" label="1">我是一个 radio</el-radio> - [注意，此处没有全局注册，raido 组件在 book/index.vue 中局部注册]
        </div>
      </div>
    )
  }

  render(h) {
    return (
      <div class="home-outer">
        {!this.initData ? <Skeleton /> : this.renderRealLayout(h)}
      </div>
    )
  }
}
