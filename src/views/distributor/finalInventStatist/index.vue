<template>
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
        :key="index"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
      <div class="sg-custom">
        <div class="sg-header">
          <el-form ref="form" :model="form" label-width="84px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="区域">
                  <el-select v-model="form.kpi" placeholder="请选择区域">
                    <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="省份">
                  <el-select v-model="form.kpi" placeholder="请选择省份">
                    <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车系">
                  <el-select v-model="form.kpi" placeholder="请选择车系">
                    <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌">
                  <el-input v-model="form.name" placeholder="请输入厂牌"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据数：" label-width="110px">
                  123
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="18">
                <el-form-item>
                  <el-button type="primary">检索</el-button>
                  <el-button type="success">导出</el-button>
                  <el-button>重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="sg-main">
          <pag-table>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :row-class-name="tableRowClassName">>
              <el-table-column
                prop="cors"
                label="区域">
              </el-table-column>
              <el-table-column
                prop="pro"
                label="省份">
              </el-table-column>
              <el-table-column
                prop="code"
                label="车系">
              </el-table-column>
              <el-table-column
                prop="2008"
                label="2008">
              </el-table-column>
              <el-table-column
                prop="2009"
                label="2009">
              </el-table-column>
              <el-table-column
                prop="2010"
                label="2010">
              </el-table-column>
              <el-table-column
                prop="2011"
                label="2011">
              </el-table-column>
              <el-table-column
                prop="2012"
                label="2012">
              </el-table-column>
              <el-table-column
                prop="2013"
                label="2013">
              </el-table-column>
              <el-table-column
                prop="2014"
                label="2014">
              </el-table-column>
              <el-table-column
                prop="2015"
                label="2015">
              </el-table-column>
              <el-table-column
                prop="2016"
                label="2016">
              </el-table-column>
              <el-table-column
                prop="2017"
                label="2017">
              </el-table-column>
            </el-table>
          </pag-table>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


