<template>
  <el-form ref="form" :model="form" label-width="106px">
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
                <el-col :span="12" class="time-group" style="display: flex;" v-if="activeName === '1'">
                  <el-form-item label="日期" prop="beginStatisDate">
                    <el-date-picker type="year" value-format="yyyy" placeholder="选择开始日期" v-model="form.beginTime"
                      :picker-options="form.beginStatisDate" @change="dateChangeBeginTime" style="margin-right: 12px;">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="25px" prop="endStatisDate">
                      <el-date-picker type="year" value-format="yyyy" placeholder="选择结束日期" v-model="form.endTime"
                        :picker-options="form.endStatisDate" @change="dateChangeEndTime">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="time-group" style="display: flex;" v-if="activeName === '2'">
                  <el-form-item label="日期" prop="beginStatisDate">
                    <el-date-picker type="month" value-format="yyyy-MM" placeholder="选择开始日期" v-model="form.beginTime"
                      :picker-options="form.beginStatisDate" @change="dateChangeBeginTime" style="margin-right: 12px;">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="25px" prop="endStatisDate">
                      <el-date-picker type="month" value-format="yyyy-MM" placeholder="选择结束日期" v-model="form.endTime"
                        :picker-options="form.endStatisDate" @change="dateChangeEndTime">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="time-group" style="display: flex;" v-if="activeName === '3'">
                  <el-form-item label="日期" prop="beginStatisDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.beginTime"
                      :picker-options="form.beginStatisDate" @change="dateChangeBeginTime" style="margin-right: 12px;">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" label-width="25px" prop="endStatisDate">
                      <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" v-model="form.endTime"
                        :picker-options="form.endStatisDate" @change="dateChangeEndTime">
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
                    {{salesStatisticsList.pagination.total}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <region
                  @change="handleRegionChange"
                  :cols="[1, 2]"
                />
                <el-col :span="6">
                  <el-form-item label="经销商" prop="dealerId">
                    <el-input v-model="form.dealerId" placeholder="请输入经销商"></el-input>
                  </el-form-item>
                </el-col>
                <brand
                  @change="handleCacadeChange"
                  :cols="[2, 3]"
                />
                <el-col :span="6">
                  <el-form-item label="物料号" prop="materialId">
                    <el-input v-model="form.materialId" placeholder="请输入物料号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="颜色" prop="vehColor">
                    <el-input v-model="form.vehColor" placeholder="请输入颜色"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="省会/地级/县级" prop="leadChannel">
                    <el-select :clearable="true" v-model="form.pcaArea" placeholder="请选择省会/地级/县级">
                      <el-option v-for="(text, index) in pcaArea" :key="index" :label="text.label" :value="text.label" ></el-option>
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
                :data="salesStatisticsList.list"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column v-for="item in salesStatisticsList.title"
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


