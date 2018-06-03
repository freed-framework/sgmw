<template>
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
          <time-range @change="timeRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          <!-- <el-col :span="6">
            <el-form-item label="厂牌">
              <el-select v-model="form.factoryCard" placeholder="请选择厂牌">
                <el-option v-for="(text, index) in factoryCard" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="经销商">
              <el-input v-model="form.dealerId" placeholder="请输入经销商" style="width:193px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：" label-width="110px">
              {{customerStatisticsList.pagination.total}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <region
            @change="handleRegionChange"
            :cols="[1, 3]"
          />
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;padding: 0 10px 10px 0;">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
            <download api="customerStatic" :params="exquery" />
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
    </div>
    <div class="sg-main">
      <pag-table
        :curpage="customerStatisticsList.pagination.pageNum"
        :size="customerStatisticsList.pagination.pageSize"
        :total="customerStatisticsList.pagination.total"
        :handlePageChange="handlePageChange"
      >
        <el-table
          :data="customerStatisticsList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in customerStatisticsList.title"
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
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


