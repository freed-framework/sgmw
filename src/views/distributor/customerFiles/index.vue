<template>
  <el-form ref="form" :model="form" label-width="84px">
    <div class="sg-header customerfiles">
      <el-row>
        <el-col :span="12">
          <el-form-item>
              <time-range label="统计时间" @change="tjRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
              <time-range label="建档日期" @change="jdRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item>
              <time-range label="开票日期" @change="kpRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
              <time-range label="交车日期" @change="jcRangeChange" :type="timeRange.type" :format="timeRange.format"/>
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
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-input v-model="form.custName" placeholder="请输入客户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话">
            <el-input v-model="form.custPhone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
              <time-range label="客户生日" @change="khsrRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="VIN">
            <el-input v-model="form.vin" placeholder="请输入VIN"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发动机号">
            <el-input v-model="form.EngineID" placeholder="请输入发动机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌号">
            <el-input v-model="form.PlateNum" placeholder="请输入车牌号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="使用性质">
              <el-select v-model="form.useType" placeholder="使用性质">
                  <el-option v-for="(text, index) in factoryCard" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
            <el-form-item label="车系">
              <el-select v-model="form.vehSerices" placeholder="车系">
                  <el-option v-for="(text, index) in carType" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="车型">
              <el-select v-model="form.factoryCard" placeholder="车型">
                  <el-option v-for="(text, index) in carKinds" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经销商号">
            <el-input v-model="form.dealerId" placeholder="请输入经销商号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经销商名称">
            <el-input v-model="form.dealerAbbr" placeholder="请输入经销商名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
            <el-form-item label="申请修改状态">
              <el-select v-model="form.factoryCard" >
                  <el-option v-for="(text, index) in factoryCard" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="form.UpdateStatus" >
                  <el-option v-for="(text, index) in UpdateStatus" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="SGMW审核结果">
              <el-select v-model="form.SGMWAudiResults" >
                  <el-option v-for="(text, index) in SGMWAudiResults" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="集团车">
              <el-select v-model="form.GroupVeh" >
                  <el-option v-for="(text, index) in GroupVeh" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
            <el-form-item label="客户类型">
              <el-select v-model="form.custType" >
                  <el-option v-for="(text, index) in customerType" :key="index" :label="text.label" :value="text.label" ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item>
              <time-range label="经销商审核日期" @change="jxsshRangeChange" :type="timeRange.type" :format="timeRange.format"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="单据数：" label-width="110px">
            {{customerFilesList.pagination.total}}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" style="text-align: right;padding: 0 10px 10px 0;">
          <el-button type="primary" @click="submitForm('form')">检索</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-col>
      </el-row>

      <el-collapse :accordion="false">
        <el-collapse-item>
          <template slot="title">
              导出字段 <i class="header-icon el-icon-info"></i>
          </template>
          <div>
            <template>
              <el-checkbox-group
                v-model="exportChecked"
              >
                <el-checkbox v-for="option in exportFieldsOption" :label="option.fieldValue" :key="option.fieldValue">{{option.fieldName}}</el-checkbox>
              </el-checkbox-group>

              <div style="margin: 15px 0 0 30px;">
              <el-button type="success" @click="exportList('form')">导出</el-button>
              </div>
            </template>
          </div>
          </el-collapse-item>
      </el-collapse>
    </div>
    <div class="sg-main">
      <pag-table
        :curpage="customerFilesList.pagination.pageNum"
        :size="customerFilesList.pagination.pageSize"
        :total="customerFilesList.pagination.total"
        :handlePageChange="handlePageChange"
      >
        <el-table
          :data="customerFilesList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in customerFilesList.title"
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

.customerfiles .el-date-editor {
  width: 180px;
}
</style>


