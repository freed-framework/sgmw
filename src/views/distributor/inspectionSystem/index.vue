<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :key="index"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <div class="sg-inspectionSystem">
          <div class="sg-header">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="日期" prop="date1">
                    <el-date-picker
                      v-model="ruleForm.date1"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                  <el-form-item label="经销商号" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入经销商号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="经销商状态" prop="dealerStatus">
                    <el-select v-model="ruleForm.dealerStatus" placeholder="请选择经销商状态" >
                      <el-option v-for="(item, index) in dealerStatus" :key="index" :label="item.lable" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="销售顾问" prop="guwen">
                    <el-input v-model="ruleForm.guwen" placeholder="请输入销售顾问"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户类型" prop="customerType">
                    <el-select v-model="ruleForm.customerType" placeholder="请选择客户类型">
                      <el-option v-for="(item, index) in customerType" :key="index" :label="item.lable" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="线索渠道" prop="leadChannel">
                    <el-select v-model="ruleForm.leadChannel" placeholder="请选择线索渠道">
                      <el-option v-for="(item, index) in leadChannel" :key="index" :label="item.lable" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="线索状态" prop="leadStatus">
                    <el-select v-model="ruleForm.leadStatus" placeholder="请选择线索状态">
                      <el-option v-for="(item, index) in leadStatus" :key="index" :label="item.lable" :value="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="单据数：">
                    123
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset="18">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">检索</el-button>
                    <el-button type="success">导出</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
          </div>
          <div class="sg-main">
            <pag-table>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName">>
                <el-table-column
                  prop="type"
                  label="潜客类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="way"
                  label="线索渠道"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="线索状态">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="zeroOne"
                  label="01">
                </el-table-column>
              </el-table>
            </pag-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


