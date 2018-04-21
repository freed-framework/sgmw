<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component
export default class TableColor extends Vue {
  tableRowClassName({row, rowIndex}) {
    if (rowIndex % 2 === 0) {
      return 'odd-row'
    } else if (rowIndex % 2 === 1) {
      return 'even-row'
    }
    return ''
  }
}
</script>
<style lang="scss">
  .el-table {
    .odd-row {
      background: white;
    }
    .even-row {
      background: #f0f9eb;
    }
  }
  .sg-header {
    padding: 16px 16px 0;
    margin-bottom: 16px;
    border: 1px solid #ebeef5;
    box-shadow: 0 0 10px -4px #999;
  }
</style>
