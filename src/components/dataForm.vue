<template>
  <el-dialog :title="title" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="formClose">
    <el-form :model="dataForm" :label-width="labelWidth" :rules="dataFormRules" ref="dataForm">
      <el-form-item
        v-for="(item, index) in formConfig"
        :label="item.label"
        :prop="item.prop"
        :key="index"
      >
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="dataForm[item.prop]">
          <el-radio
            :disabled="item.disabled"
            class="radio"
            v-for="(options,index) in item.path"
            :key="index"
            :label="options.code"
          >{{ options.description }}
          </el-radio>
        </el-radio-group>
        <el-switch
          v-else-if="item.type === 'switch'"
          :disabled="item.disabled"
          v-model="dataForm[item.prop]"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-select
          v-else-if="item.type === 'select'"
          v-model="dataForm[item.prop]"
          clearable
          filterable
          :disabled="item.disabled"
          :placeholder="item.label"
          @change="item.change && handleAccount($event)"
        >
          <el-option
            v-for="option in item.path ? $root[item.path] :
             item.prop === 'merchant' ? mOptions :
             item.prop === 'account' ? aOptions :
             item.prop === 'pay_account' ? aOptions :
             item.prop === 'device' ? dOptions :
             item.prop === 'batch_application' ? tOptions :
             ''"
            :key="item.key ? option[item.key] : option.id"
            :label="option[item.name]"
            :value="item.key ? option[item.key] : option.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-else-if="item.type === 'datetime'"
          :disabled="item.disabled"
          v-model="dataForm[item.prop]"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          v-else-if="item.type === 'date'"
          :disabled="item.disabled"
          v-model="dataForm[item.prop]"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-input
          v-else
          :type="item.type"
          :minlength="item.minlength"
          :maxlength="item.maxlength"
          v-model="dataForm[item.prop]"
          clearable
          :disabled="item.dChange && dataForm.type === 2 ? true : item.disabled"
          :placeholder="item.placeholder"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" v-if="title !== '详情'">
      <el-button @click.native="formClose">取消</el-button>
      <el-button type="primary" @click.native="formSubmit" :loading="submitLoading">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import mixin from '../utils/mixin'
  export default {
    mixins: [],
    props: [
      'title',
      'labelWidth',
      'dataForm',
      'dataFormRules',
      'formConfig',
      'enabled',
      'formVisible',
      'submitLoading',
      'mOptions',
      'aOptions',
      'dOptions',
      'tOptions',
    ],
    data () {
      return {
        fileList:[],
      }
    },
    methods: {
      formClose() {
        this.$emit("formClose");
        this.$refs['dataForm'].resetFields();
      },
      formSubmit() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.dataForm);
            this.$emit("formSubmit",para);
            setTimeout(() => {
              if(this.formVisible !== true) {
                this.$refs['dataForm'].resetFields();
              }
            },500)
          }
        });
      },
      handleAccount(val) {
        this.$emit("handleAccount",val)
      },
    },
    mounted() {
      console.log()
    }
  }
</script>
