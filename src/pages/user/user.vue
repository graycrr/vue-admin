<template>
  <section>
    <!--工具条-->
    <filterBar
      :model="filters"
      :dataConfig="dataConfig"
      :config="filters1"
      :checked="checked"
      @handleChecked="handleChecked"
      @handleAdd="handleAdd"
      :add="true"
      :refresh="true"
      @handleRefresh="handleRefresh"
    ></filterBar>

    <!--列表-->
    <dataTable
      :dataSourch="tableContent"
      @selsChange="selsChange"
      :dataConfig="dataConfig"
      :checked="checked"
      :edit="true"
      @handleEdit="handleEdit"
      :del="true"
      @handleDel="handleDel"
      btnWidth="150"
      @handleSort="handleSort"
    ></dataTable>

    <!--工具条-->
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :current.sync="current"
      :sels="sels"
      @handleBatchRemove="handleBatchRemove"
    ></pagination>

    <!--新增界面-->
    <dataForm
      title="新增"
      :dataForm="addForm"
      :dataFormRules="addFormRules"
      labelWidth="130px"
      :formConfig="addConfig"
      :formVisible.sync="addFormVisible"
      @formSubmit="addSubmit"
      :submitLoading="addLoading"
      @formClose="formClose"
    ></dataForm>

    <!--编辑界面-->
    <dataForm
      title="编辑"
      :dataForm="editForm"
      :dataFormRules="editFormRules"
      labelWidth="130px"
      :formConfig="editConfig"
      :formVisible.sync="editFormVisible"
      @formSubmit="editSubmit"
      :submitLoading="editLoading"
      @formClose="formClose"
    ></dataForm>
  </section>
</template>

<script>
  import mixin from '../../utils/mixin'
  import { getUserList, deleteUser, batchDeleteUser, addUser, editUser } from '../../api/api'
  import dataConfig from './config'
  export default {
    mixins: [mixin],
    components: {},
    data () {
      return {
        // 筛选条件
        filters: {
          search: '',
          batch_application: '',
          business_status: '',
          datetime: this.defaultTime(),
        },
        filters1:[
          {
            type: 'input',
            value: 'search',
            placeholder: '搜索条件',
          },
          {
            type: 'datetime',
            value: 'datetime',
          },
          {
            type: 'select',
            value: 'sex',
            placeholder: '性别',
            path: [
              {key: 1, label: '男'},
              {key: 2, label: '女'}
            ],
            width: '150px',
          },
        ],
        // 显示表格更多列
        checked: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : dataConfig.showColumn,
        dataConfig: dataConfig.fields,
        // 编辑界面
        editFormRules: dataConfig.editFormRules,
        editForm: dataConfig.editForm,
        editConfig: dataConfig.editFields,
        // 新增界面
        addFormRules: dataConfig.addFormRules,
        addForm: dataConfig.addForm,
        addConfig: dataConfig.addFields,
        ordering: '',
      }
    },
    computed: {
//      tableContent2() {
//        return this.tableContent.map(merchant => {
//          return Object.assign({}, merchant, {
//            business_statusName: this.$root.TransInfoStatus[merchant.business_status],
//            account_typeName: this.$root.TransferObjectType[merchant.account_type],
//          })
//        })
//      }
    },
    watch: {
      // 筛选
      filters: {
        handler: function (val, oldVal) {
          this.getTableList(1);
        },
        deep: true
      },
      ordering: {
        handler: function (val, oldVal) {
          this.getTableList(1);
        },
        deep: true
      },
    },
    methods: {
      handleSort(val) {
        this.ordering = val;
      },
      handleRefresh() {
        this.getTableList();
      },
      formClose() {
        this.editFormVisible = false;
        this.addFormVisible = false;
      },
      handleChecked(val) {
        this.checked = val;
        localStorage.setItem('user', JSON.stringify(val));
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
        this.getTableList();
      },
      handleSizeChange(val) {
        this.pagination.page = 1;
        this.pagination.page_size = val;
        setTimeout(() => {
          this.getTableList(1);
        },0);
      },
      // 获取商戶列表
      getTableList(page) {
        let para = {
          page: page ? page : this.pagination.page,
          page_size: this.pagination.page_size,
          search: this.filters.search,
          begin_time: this.filters.datetime ? this.filters.datetime[0] : '',
          end_time: this.filters.datetime ? this.filters.datetime[1] : '',
          sex: this.filters.sex,
        };
        this.$store.dispatch('tableLoading');
        getUserList(para).then((res) => {
          this.total = res.data.count;
          this.current = res.data.current;
          this.tableContent = res.data.users;
          this.$store.dispatch('tableLoading');
        }).catch(res => {
          this.$store.dispatch('tableLoading');
          this.$message({
            message: this.errorMessage + ': ' + res,
            type: 'error',
            duration: 5000,
            showClose: true
          });
        });
      },

      addSubmit: function (para) {
        this.$store.dispatch('tableLoading');
        addUser(para).then((res) => {
          this.$store.dispatch('tableLoading');
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.addFormVisible = false;
          this.getTableList();
        }).catch(res => {
          let {message} = res.response.data;
          this.$message({
            message: message,
            type: 'error'
          });
          this.$store.dispatch('tableLoading');
        });
      },

      // 编辑
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      editSubmit: function (para) {
        this.editLoading = true;
        editUser(para).then((res) => {
          this.editLoading = false;
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.editFormVisible = false;
          this.getTableList();
        }).catch(res => {
          let {message} = res.response.data;
          this.$message({
            message: message,
            type: 'error'
          });
          this.editLoading = false;
        });
      },
      // 删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tableLoading');
          let para = { id: row.id };
          deleteUser(para).then((res) => {
            this.$store.dispatch('tableLoading');
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTableList();
          }).catch(res => {
            this.$store.dispatch('tableLoading');
            let {message} = res.response.data;
            this.$message({
              message: message,
              type: 'error'
            });
          });
        });
      },

      // 选中列
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      handleBatchRemove: function () {
        let ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tableLoading');
          let para = { ids: ids };
          batchDeleteUser(para).then((res) => {
            this.$store.dispatch('tableLoading');
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTableList();
          });
        }).catch(() => {
        });
      }
    },
    mounted () {
      this.getTableList();
    }
  }
</script>

<style></style>
