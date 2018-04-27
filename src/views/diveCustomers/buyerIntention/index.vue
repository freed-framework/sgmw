<template>
<div class="sg-intention">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for = "data in tabs" :label="data.text" :name="data.key" :key= "data.key">
      <div class="sg-header">
        <el-form ref="form" :model="form" label-width="84px">
        <el-row>
          <el-col :span="8">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="月份">
              <el-date-picker
                v-model="value4"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型">
              <el-select v-model="form.customerType" placeholder="请选择">
                <el-option v-for="(text, index) in customerType" :key="index" :label="text.label" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据数">
              123
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="serch" @click="submitForm('form',activeName)">检索</el-button>
              <el-button type="" @click="exportForm('form', activeName)">导出</el-button>
              <el-button type="reset" @click="resetForm('form', activeName)">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      
      </el-form>
      </div>
      <div class="sg-mian">
        <pag-table v-if="activeName === 1">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">>
            <el-table-column
              prop="area"
              label="区域"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="120">
            </el-table-column>
            <el-table-column
              prop="response_num"
              label="响应数"
              width="160">
            </el-table-column>
            <el-table-column
              prop="sendnum"
              label="发送线索数"
              width="160">
            </el-table-column>
            <el-table-column
              prop="response_rate"
              label="响应率"
              width="160">
            </el-table-column>
          </el-table>
        </pag-table>
      </div>
    </el-tab-pane>
  </el-tabs>
  
</div>
</template>

<script lang="ts">
 import Index from './index.ts'
 export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


