<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="线索统计-年" name="first">
      <div class="sg-inspectionSystem">
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
                <el-form-item label="经销商号">
                  <el-input v-model="form.name" placeholder="请输入经销商号"></el-input>
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
                <el-form-item label="销售顾问">
                  <el-input v-model="form.guwen" placeholder="请输入销售顾问"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户类型">
                  <el-select v-model="form.customerType" placeholder="请选择客户类型">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索渠道">
                  <el-select v-model="form.dealerleadChannel" placeholder="请选择线索渠道">
                    <el-option v-for="(text, index) in dealerleadChannel" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索状态">
                  <el-select v-model="form.customerType" placeholder="请选择线索状态">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
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
                prop="type"
                label="潜客类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="way"
                label="线索渠道"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="线索状态">
              </el-table-column>
              <el-table-column
                prop="total"
                label="总计">
              </el-table-column>
              <el-table-column
                prop="zeroOne"
                label="01">
              </el-table-column>
            </el-table>
          </pag-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="线索统计-月" name="second">
      <div class="sg-inspectionSystem">
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
                <el-form-item label="经销商号">
                  <el-input v-model="form.name" placeholder="请输入经销商号"></el-input>
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
                <el-form-item label="销售顾问">
                  <el-input v-model="form.guwen" placeholder="请输入销售顾问"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户类型">
                  <el-select v-model="form.customerType" placeholder="请选择客户类型">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索渠道">
                  <el-select v-model="form.dealerleadChannel" placeholder="请选择线索渠道">
                    <el-option v-for="(text, index) in dealerleadChannel" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索状态">
                  <el-select v-model="form.customerType" placeholder="请选择线索状态">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
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
                prop="type"
                label="潜客类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="way"
                label="线索渠道"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="线索状态">
              </el-table-column>
              <el-table-column
                prop="total"
                label="总计">
              </el-table-column>
              <el-table-column
                prop="zeroOne"
                label="01">
              </el-table-column>
            </el-table>
          </pag-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="线索统计-日" name="third">
      <div class="sg-inspectionSystem">
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
                <el-form-item label="经销商号">
                  <el-input v-model="form.name" placeholder="请输入经销商号"></el-input>
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
                <el-form-item label="销售顾问">
                  <el-input v-model="form.guwen" placeholder="请输入销售顾问"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户类型">
                  <el-select v-model="form.customerType" placeholder="请选择客户类型">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索渠道">
                  <el-select v-model="form.dealerleadChannel" placeholder="请选择线索渠道">
                    <el-option v-for="(text, index) in dealerleadChannel" :key="index" :label="text" :value="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="线索状态">
                  <el-select v-model="form.customerType" placeholder="请选择线索状态">
                    <el-option v-for="(text, index) in customerType" :key="index" :label="text" :value="index"></el-option>
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
                prop="type"
                label="潜客类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="way"
                label="线索渠道"
                width="180">
              </el-table-column>
              <el-table-column
                prop="status"
                label="线索状态">
              </el-table-column>
              <el-table-column
                prop="total"
                label="总计">
              </el-table-column>
              <el-table-column
                prop="zeroOne"
                label="01">
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


