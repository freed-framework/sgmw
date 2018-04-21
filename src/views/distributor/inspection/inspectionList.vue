<template>
  <div>
    <div>
        <span>{{ num }}</span>
        <button @click="handlerCount">+</button>
        <button @click="actionClearBookList">Clear Book List Data</button>
    </div>

    <div>Vuex Getter: {{ home.count }}</div>

    <button @click="goback">Back</button>

    <div>Json: {{ JSON.stringify(distributor) }}</div>

    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-radio-group v-model="radio" @change="handleChangeRange">
      <el-radio :label="3">3</el-radio>
      <el-radio :label="6">6</el-radio>
      <el-radio :label="9">7</el-radio>
    </el-radio-group>

    <ul class="list">
        <li v-for="item in bookList" :key="item.id">
            {{ item.title }} - {{ item.price }}
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { Radio, RadioGroup, RadioButton } from 'element-ui'

@Component({
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton
  }
})
export default class App extends Vue {
  num: number = 0
  input: string = ''
  radio: number = 3

  @State(state => state.home)
  home: Object
  @State(state => state.distributor)
  distributor: Object

  @Getter('count') mounted: void

  @Action('distributor/getData') getData: any
  @Getter('distributor/getList') bookList: any

  @Action('distributor/clearList') actionClearBookList: any

  handlerCount() {
    this.num++
  }

  handleChangeRange(val) {
    // console.log(val)
  }

  goback() {
    this.$router.back()
  }

  created() {
    this.getData()
  }
}
</script>
