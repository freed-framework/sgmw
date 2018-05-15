<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :model="form" label-width="106px">
        <el-row>
          <el-col :span="6">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.date"
                type="year"
                 value-format="yyyy"
                placeholder="选择年度">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="季度">
              <el-select :clearable="true" v-model="form.quarterly" placeholder="请选择季度">
                <el-option v-for="(text, index) in quarterly" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营性质">
              <el-select v-model="form.customerType" placeholder="请选择" >
                <el-option v-for="(text, index) in customerType" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：">
              {{salesStatisticsList.pagination.total}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;padding: 0 10px 10px 0;">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <el-button type="success" @click="exportList('form')">导出</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sg-main">
      <pag-table
        :curpage="salerWorkNumList.pagination.pageNum"
        :size="salerWorkNumList.pagination.pageSize"
        :total="salerWorkNumList.pagination.total"
        :handlePageChange="handlePageChange"
      >
        <el-table
          :data="salerWorkNumList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in salerWorkNumList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
        </el-table>
      </pag-table>
    </div>
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


