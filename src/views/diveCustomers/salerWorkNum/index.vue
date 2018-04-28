<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :model="form" label-width="84px">
        <el-row>
          <el-col :span="12">
            <!-- year/month/date/dates/ week/datetime/datetimerange/daterange -->
            <el-form-item label="日期">
              <el-date-picker
                v-model="value4"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="大区">
              <el-select v-model="form.kpi" placeholder="请选择大区">
                <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商号">
              <el-input v-model="form.name" placeholder="请输入经销商号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经销商名称">
              <el-input v-model="form.name" placeholder="请输入经销商名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省会/地级/县级">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="省会" value="shanghai"></el-option>
                <el-option label="地级" value="beijing"></el-option>
                <el-option label="县级" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营性质">
              <el-select v-model="form.dealerStatus" placeholder="请选择" >
                <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：">
              123
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">检索</el-button>
              <el-button type="success" @click="resetForm('form')">导出</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sg-main">
      <pag-table>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">>
          <el-table-column
            prop="date"
            label="年度"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="季度"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="大区">
          </el-table-column>
          <el-table-column
            prop="address"
            label="经销商号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="经销商名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="省会/地级/县级">
          </el-table-column>
          <el-table-column
            prop="address"
            label="经营性质">
          </el-table-column>
          <el-table-column
            prop="销售顾问"
            label="销售顾问">
          </el-table-column>
          <el-table-column
            prop="address"
            label="销量">
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


