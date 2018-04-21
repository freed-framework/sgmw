<template>
  <div>
   123123
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
  @State(state => state.book)
  book: Object

  @Getter('count') mounted: void

  @Action('book/getData') getData: any
  @Getter('book/getList') bookList: any

  @Action('book/clearList') actionClearBookList: any

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
