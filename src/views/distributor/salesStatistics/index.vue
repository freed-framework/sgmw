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
    <div class="sg-header">
        <el-row>
          <time-range  label="销量日期" @change="timeRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          <el-col :span="6">
            <el-form-item label="经销商" prop="dealerId">
              <el-input v-model="form.dealerId" placeholder="请输入经销商" style="width:193px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="物料号" prop="materialId">
              <el-input v-model="form.materialId" placeholder="请输入物料号" style="width:193px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <region
            @change="handleRegionChange"
            :cols="[0, 1]"
          />
          <el-col :span="6">
            <el-form-item label="颜色">
              <el-input v-model="form.vehColor" placeholder="请输入颜色" style="width:160px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省会/地级/县级">
              <el-select :clearable="true" v-model="form.cityLevel" placeholder="请选择省会/地级/县级">
                <el-option v-for="(text, index) in pcaArea" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <brand
            @change="handleCacadeChange"
            :cols="[2, 3]"
          />
          <el-col :span="6">
            <el-form-item label="单据数：">
              {{salesStatisticsList.pagination.total}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;padding: 0 10px 10px 0;">
            <el-button v-if="salesStatisticsList.list.length" type="success" @click="rowClick">查看明细</el-button>
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
            <download api="sales" :params="exquery" />
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
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
          :row-class-name="tableRowClassName"
        >
          <el-table-column v-for="item in salesStatisticsList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
          <!-- <el-table-column
            label="操作"
            key="handle"
            v-if="salesStatisticsList.list.length"
          >
            <template slot-scope="scope">
              <el-button @click="rowClick" type="text" size="small">查看明细</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </pag-table>
      <detail-modal :visible="visible" fetchType="salesReportDetail" :params="params" @close="modalClose" />
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


