<template>
<div class="sg-feature">
  <el-form ref="form" :model="form" label-width="84px">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      :key="index"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
      <div class="sg-header">
        <el-row>
          <el-col :span="8">
            <el-form-item label="月份">
              <el-date-picker
                v-model="form.visitTime"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型">
              <el-select :clearable="true" v-model="form.custLevel" placeholder="请选择客户类型">
                <el-option v-for="(text, index) in customerType" :key="index" :label="text.label" :value="text.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据数">
              {{diveFeatureList.pagination.total}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;margin-bottom: 20px;">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
            <download api="feature" :params="exquery" />
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="sg-main">
        <pag-table
          :curpage="diveFeatureList.pagination.pageNum"
          :size="diveFeatureList.pagination.pageSize"
          :total="diveFeatureList.pagination.total"
          :handlePageChange="handlePageChange"
          :isPager="diveFeatureList.pagination.total ? true : false"
        >
          <el-table
            :data="diveFeatureList.list"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column v-for="item in diveFeatureList.title"
              :prop="item"
              :label="item"
              :key="item"
            >
            </el-table-column>
          </el-table>
        </pag-table>
      </div>
  </el-form>
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


