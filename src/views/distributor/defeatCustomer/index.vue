<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="96px">
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
      <!-- <el-row>
        <el-col :span="6">
          <el-form-item label="日期类型">
            <el-select :clearable="true" v-model="ruleForm.dateType" placeholder="请选择日期类型" >
              <el-option v-for="(text, index) in dateType" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <time-range @change="timeRangeChange" :type="timeRange.type" :format="timeRange.format"/>
        <el-col :span="6">
          <el-form-item label="经销商号">
            <el-input style="width: 193px" v-model="ruleForm.dealer" placeholder="请输入经销商"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="经销商状态">
            <el-select :clearable="true" v-model="ruleForm.status" placeholder="请选择经销商状态" >
              <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text.label" :value="text.key" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售顾问">
            <el-input style="width: 193px" v-model="ruleForm.salesPerson" placeholder="请输入销售顾问"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户级别">
            <el-select :clearable="true" v-model="ruleForm.customerLevel" placeholder="请选择客户级别" >
              <el-option v-for="(text, index) in customerLevel" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="最后结果">
            <el-select :clearable="true" v-model="ruleForm.saleResult" placeholder="请选择最后结果">
              <el-option v-for="(item, index) in finalResult" :key="index" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="潜客类型">
            <el-select :clearable="true" v-model="ruleForm.submersibleType" placeholder="请选择潜客类型" >
              <el-option v-for="(text, index) in submersibleType" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <region
          @change="handleRegionChange"
          :cols="[1, 3]"
        />
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="线索渠道">
            <el-select :clearable="true" v-model="ruleForm.channel" placeholder="线索渠道" >
              <el-option v-for="(text, index) in dealerleadChannel1" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <brand
          @change="handleCacadeChange"
          :cols="[0, 3]"
        />
        <el-col :span="6">
          <el-form-item label="是否试驾">
            <el-select :clearable="true" v-model="ruleForm.driving" placeholder="请选择是否试驾" >
              <el-option v-for="(text, index) in testDrive" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建方式">
            <el-select :clearable="true" v-model="ruleForm.createType" placeholder="请选择创建方式" >
              <el-option v-for="(text, index) in createType" :key="index" :label="text.label" :value="text.label" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到店次数">
            <el-input style="width: 193px" v-model="ruleForm.arrivedTimes" placeholder="请输入到店次数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="单据数：">
            {{defeatCustomerList.pagination.total}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"  style="text-align: right;padding: 0 10px 10px 0;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">检索</el-button>
              <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
              <download api="defeatExport" :params="exquery" />
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
      </el-row>
    </div>
    <div class="sg-main">
      <pag-table
        :curpage="defeatCustomerList.pagination.pageNum"
        :size="defeatCustomerList.pagination.pageSize"
        :total="defeatCustomerList.pagination.total"
        :handlePageChange="handlePageChange"
      >
        <el-table
          :data="defeatCustomerList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in defeatCustomerList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
        </el-table>
      </pag-table>
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


