<template>
  <div>
    <div class="sg-main">
      <pag-table ref="xxx">
        <el-table
          :data="datas.list"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="名字"
          />
          <el-table-column
            prop="phone"
            label="电话"
          />
          <el-table-column
            prop="registDate"
            label="注册日期"
          />
          <el-table-column
            prop="activeText"
            label="状态"
          />

          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </pag-table>

      <div class="table-pagination">
        <el-pagination
          :page-size="datas.pagination.pageSize"
          :current-page="datas.pagination.pageNum"
          :pager-count="11"
          layout="prev, pager, next"
          :total="datas.pagination.total">
        </el-pagination>
      </div>
    </div>

    <!-- modal -->
    <el-dialog
      title="修改角色信息"
      :visible.sync="dialogFormVisible"
    >
      <el-row>
        <el-col :span="14">
          <el-form
            :model="form"
          >
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详情" :label-width="formLabelWidth">
              <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否可用" :label-width="formLabelWidth">
              <el-radio-group v-model="form.active">
                <el-radio :label="0">禁用</el-radio>
                <el-radio :label="1">可用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <permissions
            ref="permissions"
            v-model="currentPermissions"
            :current="currentPermissions"
          />
        </el-col>
      </el-row>
      <!-- buttons -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Permissions from './Permissions'

@Component({
  components: {
    Permissions
  }
})
export default class Login extends Vue {
  $refs: any
  dialogFormVisible: boolean = false
  formLabelWidth: string = '120px'

  @Action('role/getList') getList: any
  @Getter('role/list') datas: any
  @Action('role/getDetail') getDetail: any
  @Getter('role/detail') detail: any

  form: any = {
    ...this.detail
  }

  currentPermissions: any = []

  @Watch('detail', { deep: true })
  onDetailChanged(data)  {
    // this.form = { ...data }
    console.log(this.form, data)
  }

  handleEdit(row) {
    const { id } = row
    this.dialogFormVisible = true

    this.getDetail(id).then(res => {
      const { data = {} } = res
      this.form = { ...data }

      setTimeout(() => {
        this.currentPermissions = data.privileges || []
        console.log('currentPermissions: ', this.currentPermissions)
  console.log(this.$refs, this.$refs.permissions)
        // this.$refs.permissions.change(this.currentPermissions)

      }, 0)
    })
  }

  // show() {
  //   console.log(this.$refs.permissions)
  // }

  handleUpdate() {
    this.dialogFormVisible = false
    console.log(this.form)
  }

  mounted() {
    this.getList({
      pageNumber: 1,
      pageSize: 20,
    })
  }
}
</script>

<style style="scss">
.table-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
