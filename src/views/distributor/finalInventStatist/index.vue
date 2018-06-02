<template>
  <el-form ref="ruleForm" label-width="84px">
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
            <region
              @change="handleRegionChange"
              :cols="[0, 1]"
              :hasAll="true"
            />
            <brand
                @change="handleCacadeChange"
                :cols="[1, 2]"
              />
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="单据数：" label-width="110px">
                {{finalInventStatistList.pagination.total}}
              </el-form-item>
            </el-col>
            <el-col :span="18" style="text-align: right;">
              <el-button type="primary" @click="submitForm('form')">检索</el-button>
              <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
              <download api="sales" :params="exquery" />
              <el-button @click="resetForm('form')">重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="sg-main">
          <pag-table
            :curpage="finalInventStatistList.pagination.pageNum"
            :size="finalInventStatistList.pagination.pageSize"
            :total="finalInventStatistList.pagination.total"
            :handlePageChange="handlePageChange"
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


