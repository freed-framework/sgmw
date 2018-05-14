<template>
<div class="sg-divecustom">
  <el-form ref="form" :model="form" label-width="84px">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      :key="index"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
      <div class="sg-header">
        <el-row>
          <el-col :span="6">
            <el-form-item label="月份">
              <el-date-picker
                v-model="form.date"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌" prop="carBrands">
              <el-select v-model="form.brand" placeholder="请选择品牌">
                <el-option v-for="(text, index) in carBrands" :key="index" :label="text.label" :value="text.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <region
              @change="handleRegionChange"
              :cols="[0, 1]"
            />
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经销商">
              <el-input v-model="form.dealer" placeholder="请输入经销商"></el-input>
            </el-form-item>
          </el-col>
          <channel
            @change="handleChannelChange"
            :cols="[0, 3]"
          />
          <el-col :span="6">
            <el-form-item label="线索类型">
              <el-select v-model="form.clueType" placeholder="请选择线索类型">
                <el-option v-for="(text, index) in leadType" :key="index" :label="text.label" :value="text.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单据数">
              {{diveCusClueListList.pagination.total}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: right;margin-bottom: 20px;">
            <el-button type="primary" @click="submitForm('form')">检索</el-button>
            <el-button type="success" @click="exportList('form')">导出</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="sg-main">
        <pag-table>
        <el-table
          :data="diveCusClueListList.list"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column v-for="item in diveCusClueListList.title"
            :prop="item"
            :label="item"
            :key="item"
          >
          </el-table-column>
        </el-table>
      </pag-table>
      </div>
  </el-form>
</div>
</template>

<script lang="ts">
/* eslint-disable */
import Index from './index.ts'
export default Index
</script>

<style lang="scss">
@import './index.scss';
</style>


