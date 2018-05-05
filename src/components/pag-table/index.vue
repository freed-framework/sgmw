<template>
  <div class="pag-data">
    <boxer
      :title="title"
      :hasTitle="hasTitle"
      :onAction="handleAction"
      :actionType="actionType"
      :iconType="iconType"
    >
      <!-- &-main 这一层只是为了添加一个 border，当存在 loading 效果的时候 el-table 上的 border 属性有 bug -->
      <div
        :class="`pag-data-table ${loading ? 'pag-data-table-loading' : ''}`"
      >
        <slot />
      </div>

      <!-- 分页 -->
      <div v-if="handlePageChange" class="pag-data-pagination">
        <el-pagination
          background
          :disabled="loading"
          layout="prev, pager, next"
          :current-page.sync="curpage"
          @current-change="handlePageChange"
          :page-size="size"
          :total="total">
        </el-pagination>
      </div>
    </boxer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

function noop() {}

@Component
export default class PagTable extends Vue {
  name: string = 'pag-table'

  @Prop({ default: false }) hasTitle: boolean
  @Prop({ default: '' }) title: string
  @Prop({ default: true }) loading: boolean
  @Prop({ default: noop }) handlePageChange: void
  @Prop({ default: 0 }) total: number
  @Prop({ default: 1 }) curpage: number
  @Prop({ default: 20 }) size: number
  @Prop({ default: noop }) handleAction: Function
  @Prop({ default: '' }) actionType: string
  @Prop({ default: '' }) iconType: string
}
</script>

<style lang="scss" scoped>
.pag-data {
  &-pagination {
    margin: 10px 0;
    text-align: right;

    .el-pagination {
      padding-right: 0;
    }
  }

   .boxer-main {
    padding: 0;
  }

   .el-table {
    font-size: 12px;

    thead {
      th {
        background: #f7f7f7;
        padding: 4px 0;
      }
    }

    tbody {
      tr {
        td {
          padding: 4px 0;
        }
      }
    }

    .cell {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

   .el-button--mini {
    padding: 4px 10px;
  }

   .tag-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>


