<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :rules="rules" :model="form" label-width="84px">
        <el-row>
          <el-col :span="12">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="KPI类型">
              <el-select v-model="form.kpiType" placeholder="请选择KPI类型">
                <el-option v-for="(item) in kpi" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商状态">
              <el-select :clearable="true" v-model="form.dealerStatus" placeholder="请选择经销商状态" >
                <el-option v-for="(item, index) in dealerStatus" :key="index" :label="item.label" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <region
            @change="handleRegionChange"
            :cols="[0, 1]"
          />
          <el-col :span="6">
            <el-form-item label="经销商号">
              <el-input v-model="form.dealerId" placeholder="请输入经销商号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售顾问">
              <el-input v-model="form.salesMan" placeholder="请输入销售顾问"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户级别">
              <el-select :clearable="true" v-model="form.custLevel" placeholder="请选择客户级别">
                <el-option v-for="(item, index) in customerLevel" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="潜客类型">
              <el-select :clearable="true" v-model="form.custType" placeholder="请选择潜客类型">
                <el-option v-for="(item, index) in submersibleType" :key="index" :label="item.lable" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="线索渠道">
              <el-select :clearable="true" v-model="form.channel" placeholder="请选择经销商渠道">
                <el-option v-for="(item, index) in leadChannel" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="最后结果">
              <el-select :clearable="true" v-model="form.saleResult" placeholder="请选择最后结果">
                <el-option v-for="(item, index) in finalResult" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <brand
            @change="handleCacadeChange"
          />
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否试驾">
              <el-select :clearable="true" v-model="form.ifDrive" placeholder="请选择是否试驾">
                <el-option v-for="(item, index) in testDrive" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到店次数">
              <el-input-number v-model="form.visitCount" :min="0" label="到店次数"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：">
              {{kpiList.pagination.total}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <!-- <el-button type="success" @click="exportList('form')">导出</el-button> -->
            <download api="kpi" :params="exquery" />
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sg-main">
      <pag-table
        :currpage="kpiList.pagination.pageNum"
        :size="kpiList.pagination.pageSize"
        :total="kpiList.pagination.total"
        :handlePageChange="handlePageChange"
        :loading="true"
      >
        <el-table
          :data="kpiList.list"
          :loading="loading"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in kpiList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
        </el-table>
      </pag-table>
    </div>
  </div>
</template>

<script lang="ts">
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


