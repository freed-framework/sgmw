<template>
  <el-dialog title="销量统计明细" :visible="visible" width="98%" top="10px" @close="handleClose">
    <el-table :data="list" style="width: 100%">
      <el-table-column v-for="(item) in tables"
        :prop="item.key"
        :label="item.label"
        :key="item.label"
      />
    </el-table>
    <el-pagination
      layout="prev, pager, next, jumper"
      @current-change="handlePageChange"
      :total="total"
      :page-size="pageSize">
    </el-pagination>
  </el-dialog>
</template>

<script lang="ts">
/* eslint-disable */
import { Getter } from 'vuex-class'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as API from '../../api'
import * as CONFIG from './config'

@Component
export default class DetailModal extends Vue {

  @Prop({default: false}) visible: boolean
  @Prop({default: ''}) fetchType: string
  @Prop({default: {}}) params: any

  tables: any = CONFIG[this.fetchType]
  list: any = []
  pageNum: any = 1
  pageSize: any = 20
  total: any = 0

  async getData(page = 1) {
    const submit = {...this.params, pageSize: this.pageSize, pageNum: page}
    const { data = {} } = await API[this.fetchType](submit)
    const { pageNum, pageSize, total } = data;

    this.list = data.data || []
    this.pageNum = pageNum || 1
    this.pageSize = pageSize || 20
    this.total = total || 0
  }

  handlePageChange(page) {
    this.getData(page)
  }

  handleClose() {
    this.$emit('close')
  }

  @Watch('visible')
  watchVisibleChange(val) {
    if(val) {
      this.getData()
    } else {
      this.list = []
      this.pageNum = 1
      this.pageSize = 20
      this.total = 0
    }
  }

}
</script>

<style lang="sass">

</style>


