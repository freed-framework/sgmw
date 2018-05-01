<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="84px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
        <div class="sg-sub-stati">
          <div class="sg-header">
            <el-row>
              <el-col :span="12" class="time-group" style="display: flex;">
                <el-form-item label="日期" prop="date">
                    <el-date-picker
                      v-model="ruleForm.date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="经销商号" prop="distributorNum">
                  <el-input v-model="ruleForm.distributorNum" placeholder="请输入经销商"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经销商状态" prop="dealerStatus">
                  <el-select v-model="ruleForm.dealerStatus" placeholder="请选择经销商状态" >
                    <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="销售顾问" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入销售顾问"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户级别" prop="customerLevel">
                  <el-select v-model="ruleForm.customerLevel" placeholder="请选择客户级别" >
                    <el-option v-for="(text, index) in customerLevel" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="潜客类型" prop="submersibleType">
                  <el-select v-model="ruleForm.submersibleType" placeholder="请选择潜客类型" >
                    <el-option v-for="(text, index) in submersibleType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <region
                @change="handleRegionChange"
                :cols="[1, 3]"
              />
              <brand
                  @change="handleCacadeChange"
                  :cols="[0, 3]"
                />
              <el-col :span="6">
                <el-form-item label="最后结果" prop="finalResult">
                  <el-select v-model="ruleForm.finalResult" placeholder="请选择最后结果" >
                    <el-option v-for="(text, index) in finalResult" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索渠道" prop="dealerleadChannel">
                  <el-select v-model="ruleForm.dealerleadChannel" placeholder="线索渠道" >
                    <el-option v-for="(text, index) in dealerleadChannel" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否试驾" prop="testDrive">
                  <el-select v-model="ruleForm.testDrive" placeholder="请选择是否试驾" >
                    <el-option v-for="(text, index) in testDrive" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建方式" prop="createType">
                  <el-select v-model="ruleForm.createType" placeholder="请选择创建方式" >
                    <el-option v-for="(text, index) in createType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据数：">
                    {{subStatisticsList.pagination.total}}
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
                :data="subStatisticsList.list"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column v-for="item in subStatisticsList.title"
                  :prop="item"
                  :label="item"
                  :key="item"
                >
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
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


