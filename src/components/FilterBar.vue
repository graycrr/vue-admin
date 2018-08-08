<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
    <el-form :inline="true" :model="model">
      <el-form-item v-for="(item,index) in config" :style="{ width: item.width }" :key="index">
        <el-input
          v-if="item.type === 'input'"
          clearable
          :placeholder="item.placeholder"
          v-model="model[item.value]"
        ></el-input>
        <el-date-picker
          v-else-if="item.type === 'datetime'"
          v-model="model[item.value]"
          type="daterange"
          align="right"
          unlink-panels
          :default-time="['00:00:00', '23:59:59']"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-select
          v-else-if="item.type === 'select'"
          v-model="model[item.value]"
          clearable
          filterable
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="(option,index) in item.path"

            :key="option.key"

            :label="option.label"

            :value="option.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-dropdown :hide-on-click="false">
          <el-button class="el-dropdown-link">
            显示更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in dataConfig" :key="index">
              <el-checkbox-group
                v-model="checked1"
                @change="handleChecked"
              >
                <el-checkbox
                  :label="item.label"
                ></el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item v-if="this.add">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
      <el-form-item v-else-if="this.qr">
        <el-button type="primary" @click="handleQr">新增</el-button>
      </el-form-item>
      <el-form-item v-if="this.refresh" style="float: right">
        <el-button type="success" @click="handleRefresh" :loading="refreshLoading">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  import mixin from '../utils/mixin'
  import util from '../common/js/util'
  export default {
    mixins: [mixin],
    data () {
      return {
        checked1: this.checked,
        options: [],
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '前天',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick(picker) {
              const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
              const end = new Date(end0.replace(/-/g, '/'));
              const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
              const start = new Date(start0.replace(/-/g, '/'));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    props: [
      'model',
      'config',
      'dataConfig',
      'checked',
      'mOptions',
      'aOptions',
      'dOptions',
      'tOptions',
      'add',
      'qr',
      'refresh'
    ],
    methods: {
      handleChecked(val) {
        this.$emit("handleChecked", val)
      },
      handleAdd() {
        this.$emit("handleAdd")
      },
      handleQr() {
        this.$emit("handleQr")
      },
      handleRefresh() {
        this.$emit("handleRefresh");
      }
    },
    mounted () {
    }
  }
</script>
