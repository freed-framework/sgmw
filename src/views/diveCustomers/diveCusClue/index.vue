<template>
<div class="sg-divecustom">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for = "data in tabs" :label="data.text" :name="data.key" :key= "data.key">
      <div class="sg-header">
        <el-form ref="form" :model="form" label-width="84px">
        <el-row>
          <el-col :span="6">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="月份">
              <el-date-picker
                v-model="value"
                type="month"
                placeholder="选择月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
            <brand
              @change="handleCacadeChange"
              :cols="[0, 0]"
            />
            <region
              @change="handleRegionChange"
              :cols="[0, 1]"
            />
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经销商">
              <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="平台">
              <el-select v-model="form.customerLevel" placeholder="请选择平台">
                <el-option v-for="(text, index) in customerLevel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主渠道">
              <el-select v-model="form.customerLevel" placeholder="请选择主渠道">
                <el-option v-for="(text, index) in customerLevel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分渠道">
              <el-select v-model="form.customerType" placeholder="请选择分渠道">
                <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="子渠道">
              <el-select v-model="form.testDrive" placeholder="请选择子渠道">
                <el-option v-for="(text, index) in testDrive" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="线索类型" prop="leadType">
              <el-select v-model="form.leadType" placeholder="请选择线索类型">
                <el-option v-for="(text, index) in leadType" :key="index" :label="text.label" :value="text.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数">
              <!-- {{subStatisticsList.pagination.total}} -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="submitForm('form',activeName)">检索</el-button>
              <el-button type="success" @click="resetForm('form',activeName)">导出</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </div>
      <!-- <div class="sg-main">
        <pag-table>
        <el-table
          :data="kpiList.list"
          :loading="loading"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in kpiList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
        </el-table>
      </pag-table>
      </div> -->
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script lang="ts">
/* eslint-disable */
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


