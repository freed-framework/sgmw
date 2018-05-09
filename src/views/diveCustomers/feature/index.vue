<template>
  <el-form ref="form" :model="form" label-width="106px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="index"
          :label="item.title"
          :name="item.name"
        >
        <div class="sg-feature">
          <div class="sg-header">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="月份">
                    <el-date-picker
                      v-model="form.date"
                      type="month"
                      value-format="yyyy-MM"
                      placeholder="选择月份">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户类型" prop="customerType">
                    <el-select :clearable="true" v-model="form.customerType" placeholder="请选择客户类型" >
                      <el-option v-for="(text, index) in customerType" :key="index" :label="text.label" :value="text.label" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                    <el-form-item label="单据数：">
                      {{finalInventStatistList.pagination.total}}
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" :offset="18">
                  <el-button type="primary" @click="submitForm('form')">检索</el-button>
                  <el-button type="success" @click="exportList('form')">导出</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-col>
              </el-row>
          </div>
          <div class="sg-main">
            <pag-table
             :curpage="finalInventStatistList.pagination.pageNum"
             :size="finalInventStatistList.pagination.pageSize"
             :total="finalInventStatistList.pagination.total"
             @handlePageChange="handlePageChange"
            >
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
import Index from "./index.ts";
export default Index;
</script>

<style lang="scss">
@import "./index.scss";
</style>


