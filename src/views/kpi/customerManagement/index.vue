<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :model="form" label-width="84px">
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
              <el-select v-model="kpiType" placeholder="请选择KPI类型">
                <el-option v-for="(item, index) in kpi" :key="index" :label="item.label" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商状态">
              <el-select v-model="dealer" placeholder="请选择经销商状态" >
                <el-option v-for="(item, index) in dealerStatus" :key="index" :label="item.label" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="区域">
              <el-select v-model="region" placeholder="请选择区域">
                <el-option v-for="(key, id) in regionList" :label="key" :key="key" :value="id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省份">
              <el-select v-model="form.province" placeholder="请选择省份">
                <el-option v-for="key in provinceList" :label="key" :key="key" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商号">
              <el-input v-model="form.dealerid" placeholder="请输入经销商号"></el-input>
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
              <el-select v-model="form.custLevel" placeholder="请选择客户级别">
                <el-option v-for="(item, index) in customerLevel" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="潜客类型">
              <el-select v-model="form.CustTyp" placeholder="请选择潜客类型">
                <el-option v-for="(item, index) in customerType" :key="index" :label="item.lable" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商渠道">
              <el-select v-model="form.channel" placeholder="请选择经销商渠道">
                <el-option v-for="(item, index) in leadChannel" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后结果">
              <el-select v-model="form.saleResult" placeholder="请选择最后结果">
                <el-option v-for="(item, index) in finalResult" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="品牌">
              <el-select v-model="form.region11" placeholder="请选择品牌">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品种">
              <el-select :disabled="!form.region11" v-model="form.region12" placeholder="请选择品种">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车系">
              <el-select v-model="form.region13" placeholder="请选择车系">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车型">
              <el-select v-model="form.region14" placeholder="请选择车型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <cascade
          v-model="form.select"
          @change="handleCacadeChange"
        />
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否试驾">
              <el-select v-model="form.ifDrive" placeholder="请选择是否试驾">
                <el-option v-for="(item, index) in testDrive" :key="index" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到店次数">
              <el-input-number v-model="form.ddcs" :min="0" label="到店次数"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：">
              {{kpiList.pagination.total}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <el-button type="success" @click="resetForm('form')">导出</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="sg-main">
      <pag-table>
        <el-table
          :data="kpiList.list"
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


