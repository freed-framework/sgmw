<template>
  <el-form ref="form" :model="form" label-width="106px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
      </el-tab-pane>
    </el-tabs>
    <div class="sg-custom">
      <div class="sg-header">
          <el-row>
            <el-col :span="12">
              <time-range @change="timeRangeChange" :type="timeRange.type" :format="timeRange.format"/>
            </el-col>
            <el-col :span="6">
              <el-form-item label="经销商号" prop="dealerId">
                <el-input v-model="form.dealerId" placeholder="请输入经销商号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="经销商状态" prop="dealerStatus">
                <el-select :clearable="true" v-model="form.dealerStatus" placeholder="请选择经销商状态" >
                  <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text.label" :value="text.label" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="销售顾问" prop="salesMan">
                <el-input v-model="form.salesMan" placeholder="请输入销售顾问"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户类型" prop="custType">
                <el-select :clearable="true" v-model="form.custType" placeholder="请选择客户类型" >
                  <el-option v-for="(text, index) in dealerCustomerType" :key="index" :label="text.label" :value="text.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="线索渠道" prop="channel">
                <el-select :clearable="true" v-model="form.channel" placeholder="线索渠道" >
                  <el-option v-for="(text, index) in leadChannel" :key="index" :label="text.label" :value="text.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="线索状态" prop="potentialCustSaleResult">
                <el-select :clearable="true" v-model="form.potentialCustSaleResult" placeholder="线索状态" >
                  <el-option v-for="(text, index) in leadStatus" :key="index" :label="text.label" :value="text.value" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item label="单据数：">
                  {{inspectionSystemList.pagination.total}}
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: right;margin-bottom: 20px;">
              <el-button type="primary" @click="submitForm('form')">检索</el-button>
              <el-button type="success" @click="exportList('form')">导出</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-col>
          </el-row>
      </div>
      <div class="sg-main">
        <pag-table>
          <el-table
            :data="inspectionSystemList.list"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column v-for="item in inspectionSystemList.title"
              :prop="item"
              :label="item"
              :key="item"
            >
            </el-table-column>
          </el-table>
        </pag-table>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
/* eslint-disable */
import Index from "./index.ts";
export default Index;
</script>

<style lang="scss">
@import "./index.scss";
</style>


