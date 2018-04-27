<template>
<div class="sg-divecustom">
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
                placeholder="选择月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌">
              <el-select v-model="form.kpi" placeholder="请选择品牌">
                <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域">
              <el-select v-model="form.region" placeholder="请选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select v-model="form.region" placeholder="请选择省份">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经销商">
              <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="平台">
              <el-select v-model="form.customerLevel" placeholder="请选择平台">
                <el-option v-for="(text, index) in customerLevel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主渠道">
              <el-select v-model="form.customerLevel" placeholder="请选择主渠道">
                <el-option v-for="(text, index) in customerLevel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分渠道">
              <el-select v-model="form.customerType" placeholder="请选择分渠道">
                <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="子渠道">
              <el-select v-model="form.testDrive" placeholder="请选择子渠道">
                <el-option v-for="(text, index) in testDrive" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="线索类型">
              <el-select v-model="form.testDrive" placeholder="请选择线索类型">
                <el-option v-for="(text, index) in testDrive" :key="index" :label="text" :value="index"></el-option>
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
              <el-button type="primary" @click="submitForm('form')">检索</el-button>
              <el-button type="success" @click="resetForm('form')">导出</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        
        </el-row>
      </el-form>
      </div>
      <div class="sg-main">
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


