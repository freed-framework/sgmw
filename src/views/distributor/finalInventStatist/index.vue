<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="84px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
        <div class="sg-custom">
          <div class="sg-header">
            <el-row>
              <region
                @change="handleRegionChange"
                :cols="[0, 1]"
                :hasAll="true"
              />
              <el-col :span="6">
                <el-form-item label="车系">
                  <el-select :clearable="true" v-model="ruleForm.carType" placeholder="请选择车系">
                    <el-option v-for="(text, index) in carType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌">
                  <el-input v-model="ruleForm.factoryCard" placeholder="请输入厂牌" style="width:193px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="单据数：" label-width="110px">
                  {{finalInventStatistList.pagination.total}}
                </el-form-item>
              </el-col>
              <el-col :span="18" style="text-align: right;">
                <el-button type="primary" @click="submitForm('form')">检索</el-button>
                <el-button type="success" @click="exportList('form')">导出</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="sg-main">
            <pag-table>
              <el-table
                :data="finalInventStatistList.list"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column v-for="item in finalInventStatistList.title"
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


