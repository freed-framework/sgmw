<template>
  <div class="sg-custom">
    <div class="sg-header">
      <el-form ref="form" :model="form" label-width="84px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期">
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
            <el-form-item label="KPI类型">
              <el-select v-model="form.kpi" placeholder="请选择KPI类型">
                <el-option v-for="(text, index) in kpi" :key="index" :label="text" :value="index" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商状态">
              <el-select v-model="form.dealerStatus" placeholder="请选择经销商状态" >
                <el-option v-for="(text, index) in dealerStatus" :key="index" :label="text" :value="index" ></el-option>
              </el-select>
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
          <el-col :span="6">
            <el-form-item label="省份">
              <el-select v-model="form.region" placeholder="请选择省份">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商号">
              <el-input v-model="form.name" placeholder="请输入经销商号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售顾问">
              <el-input v-model="form.guwen" placeholder="请输入销售顾问"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户级别">
              <el-select v-model="form.customerLevel" placeholder="请选择客户级别">
                <el-option v-for="(text, index) in customerLevel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="潜客类型">
              <el-select v-model="form.customerType" placeholder="请选择潜客类型">
                <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经销商渠道">
              <el-select v-model="form.leadChannel" placeholder="请选择经销商渠道">
                <el-option v-for="(text, index) in leadChannel" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最后结果">
              <el-select v-model="form.finalResult" placeholder="请选择最后结果">
                <el-option v-for="(text, index) in finalResult" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品牌">
              <el-select v-model="form.region" placeholder="请选择品牌">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品种">
              <el-select v-model="form.region" placeholder="请选择品种">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车系">
              <el-select v-model="form.region" placeholder="请选择车系">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车型">
              <el-select v-model="form.region" placeholder="请选择车型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否试驾">
              <el-select v-model="form.testDrive" placeholder="请选择是否试驾">
                <el-option v-for="(text, index) in testDrive" :key="index" :label="text" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到店次数">
              <el-input-number v-model="form.region" :min="0" label="到店次数"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数：">
              123
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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


