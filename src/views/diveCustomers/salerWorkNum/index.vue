<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :model="form" label-width="106px">
        <el-row>
          <el-col :span="6">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.value4"
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
          <region
            @change="handleRegionChange"
            :cols="[0, 0]"
          />
          <el-col :span="6">
            <el-form-item label="经销商号">
              <el-input v-model="form.dealerId" placeholder="请输入经销商号" style="width:193px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经销商名称">
              <el-input v-model="form.dealerName" placeholder="请输入经销商名称" style="width:193px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省会/地级/县级">
              <el-select :clearable="true" v-model="form.cityLevel" placeholder="请选择省会/地级/县级">
                <el-option v-for="(text, index) in cityLevel" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营性质">
              <el-select v-model="form.businessNature" placeholder="请选择" >
                <el-option v-for="(text, index) in businessNature" :key="index" :label="text.label" :value="text.label" ></el-option>
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
        :curpage="salesStatisticsList.pagination.pageNum"
        :size="salesStatisticsList.pagination.pageSize"
        :total="salesStatisticsList.pagination.total"
        :handlePageChange="handlePageChange"
      >
        <el-table
          :data="salesStatisticsList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in salesStatisticsList.title"
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


