<template>
  <el-form ref="form" :model="form" label-width="84px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
        <div class="sg-sub-stati">
          <div class="sg-header">
            <el-row>
              <el-col :span="12" class="time-group" style="display: flex;">
                <el-form-item label="日期" prop="date1">
                    <el-date-picker
                      v-model="form.date1"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              <el-col :span="6">
                <el-form-item label="经销商号" prop="name">
                  <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经销商状态" prop="dealerStatus">
                  <el-select v-model="form.dealerStatus" placeholder="请选择经销商状态" >
                    <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="销售顾问" prop="name">
                  <el-input v-model="form.name" placeholder="请输入销售顾问"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="省份" prop="region">
                  <el-select v-model="form.region" placeholder="请选择省份">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经销商" prop="name">
                  <el-input v-model="form.name" placeholder="请输入经销商"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户级别" label-width="110px" prop="customerLevel">
                  <el-select v-model="form.customerLevel" placeholder="请选择客户级别" >
                    <el-option v-for="(text, index) in customerLevel" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="潜客类型" prop="submersibleType">
                  <el-select v-model="form.submersibleType" placeholder="请选择潜客类型" >
                    <el-option v-for="(text, index) in submersibleType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户所在省会" prop="provincialCapital">
                  <el-select v-model="form.provincialCapital" placeholder="请选择客户所在省会" >
                    <el-option v-for="(text, index) in provincialCapital" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户所在城市" prop="cityCapital">
                  <el-select v-model="form.cityCapital" placeholder="请选择客户所在城市" >
                    <el-option v-for="(text, index) in cityCapital" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户所在县区" prop="countyAreaCapital">
                  <el-select v-model="form.countyAreaCapital" placeholder="请选择客户所在县区" >
                    <el-option v-for="(text, index) in countyAreaCapital" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="品牌" prop="brands">
                  <el-select v-model="form.brands" placeholder="请选择品牌" >
                    <el-option v-for="(text, index) in brands" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="品种" prop="varieties">
                  <el-select v-model="form.varieties" placeholder="请选择品种" >
                    <el-option v-for="(text, index) in varieties" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车系" prop="carType">
                  <el-select v-model="form.carType" placeholder="请选择车系" >
                    <el-option v-for="(text, index) in carType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="车型" prop="carKinds">
                  <el-select v-model="form.carKinds" placeholder="请选择车型" >
                    <el-option v-for="(text, index) in carKinds" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="最后结果" prop="finalResult">
                  <el-select v-model="form.finalResult" placeholder="请选择最后结果" >
                    <el-option v-for="(text, index) in finalResult" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索渠道" prop="dealerleadChannel">
                  <el-select v-model="form.dealerleadChannel" placeholder="线索渠道" >
                    <el-option v-for="(text, index) in dealerleadChannel" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否试驾" prop="testDrive">
                  <el-select v-model="form.testDrive" placeholder="请选择是否试驾" >
                    <el-option v-for="(text, index) in testDrive" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建方式" prop="createType">
                  <el-select v-model="form.createType" placeholder="请选择创建方式" >
                    <el-option v-for="(text, index) in createType" :key="index" :label="text.label" :value="text.label" ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="单据数：">
                  123
                </el-form-item>
              </el-col>
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
                  prop="code"
                  label="潜客类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="线索渠道">
                </el-table-column>
                <el-table-column
                  prop="color"
                  label="是否试驾">
                </el-table-column>
                <el-table-column
                  prop="shenf"
                  label="省分">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市">
                </el-table-column>
                <el-table-column
                  prop="xianf"
                  label="县区">
                </el-table-column>
                <el-table-column
                  prop="pinz"
                  label="品种">
                </el-table-column>
                <el-table-column
                  prop="chex"
                  label="车系">
                </el-table-column>
                <el-table-column
                  prop="xingh"
                  label="型号">
                </el-table-column>
                <el-table-column
                  prop="creat"
                  label="创建方式">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="总计">
                </el-table-column>
                <el-table-column
                  prop="01"
                  label="01">
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
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


