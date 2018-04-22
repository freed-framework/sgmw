<template>
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
        :key="index"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
      <div class="sg-custom">
        <div class="sg-header">
          <el-form ref="form" :model="form" label-width="84px">
            <el-row>
              <el-col :span="12" class="time-group" style="display: flex;">
                <el-form-item label="注册日期">
                  <el-date-picker type="year" value-format="yyyy" placeholder="选择开始日期" v-model="form.beginTime"
                    :picker-options="form.startDatePicker" @change="dateChangeBeginTime" style="margin-right: 12px;">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="至" label-width="25px">
                    <el-date-picker type="year" value-format="yyyy" placeholder="选择结束日期" v-model="form.endTime"
                      :picker-options="form.endDatePicker" @change="dateChangeEndTime">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌">
                  <el-select v-model="form.kpi" placeholder="请选择厂牌">
                    <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据数：" label-width="110px">
                  123
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="区域">
                  <el-select v-model="form.region" placeholder="请选择区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :pull="1">
                <el-form-item label="省份">
                  <el-select v-model="form.region" placeholder="请选择省份">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经销商">
                  <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车系" label-width="110px">
                  <el-select v-model="form.dealerStatus" placeholder="请选择经车系" >
                    <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="型号">
                  <el-select v-model="form.dealerStatus" placeholder="请选择型号" >
                    <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text" :value="index" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :pull="1">
                <el-form-item label="物料号">
                  <el-input v-model="form.name" placeholder="请输入物料号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="颜色">
                  <el-input v-model="form.name" placeholder="请输入颜色"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="省会/地级/县级" label-width="110px">
                  <el-select v-model="form.leadChannel" placeholder="请选择省会/地级/县级">
                    <el-option v-for="(text, index) in leadChannel" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="18">
                <el-form-item>
                  <el-button type="primary">检索</el-button>
                  <el-button type="success">导出</el-button>
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
            </el-table>
          </pag-table>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


