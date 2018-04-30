<template>
  <el-form ref="form" :model="form" label-width="84px">
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
                <el-col :span="12" class="time-group" style="display: flex;">
                  <el-form-item label="注册日期" prop="startDatePicker">
                    <el-date-picker type="year" value-format="yyyy" placeholder="选择开始日期" v-model="form.beginTime"
                      :picker-options="form.startDatePicker" @change="dateChangeBeginTime" style="margin-right: 12px;">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="25px" prop="endDatePicker">
                      <el-date-picker type="year" value-format="yyyy" placeholder="选择结束日期" v-model="form.endTime"
                        :picker-options="form.endDatePicker" @change="dateChangeEndTime">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="厂牌" prop="factoryCard">
                    <el-select :clearable="true" v-model="form.factoryCard" placeholder="请选择厂牌">
                      <el-option v-for="(text, index) in factoryCard" :key="index" :label="text.label" :value="text.label" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据数：">
                    {{defeatCustomerList.pagination.total}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <region
                  @change="handleRegionChange"
                  :cols="[1, 2]"
                />
                <el-col :span="6">
                  <el-form-item label="经销商" prop="name">
                    <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车系" label-width="110px" prop="carType">
                    <el-select :clearable="true" v-model="form.carType" placeholder="请选择经车系" >
                      <el-option v-for="(text, index) in carType" :key="index" :label="text.label" :value="text.label" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="型号" prop="kinds">
                    <el-select :clearable="true" v-model="form.kinds" placeholder="请选择型号" >
                      <el-option v-for="(text, index) in kinds" :key="index" :label="text.label" :value="text.label" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :pull="1">
                  <el-form-item label="物料号" prop="goodsNum">
                    <el-input v-model="form.goodsNum" placeholder="请输入物料号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="颜色" prop="color">
                    <el-input v-model="form.color" placeholder="请输入颜色"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="省会/地级/县级" label-width="110px" prop="leadChannel">
                    <el-select :clearable="true" v-model="form.leadChannel" placeholder="请选择省会/地级/县级">
                      <el-option v-for="(text, index) in leadChannel" :key="index" :label="text.label" :value="text.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" :offset="18">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">检索</el-button>
                    <el-button type="success">导出</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
          </div>
          <div class="sg-main">
            <pag-table>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName">>
                <el-table-column
                  prop="cors"
                  label="区域"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="pro"
                  label="省份"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="车系">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="型号">
                </el-table-column>
                <el-table-column
                  prop="color"
                  label="颜色">
                </el-table-column>
                <el-table-column
                  prop="ssx"
                  label="省会/地级/县级">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="2017"
                  label="2017">
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


