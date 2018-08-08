<template>
  <el-table
    :data="dataSourch"
    highlight-current-row
    v-loading="$store.state.listLoading"
    @selection-change="selsChange"
    style="width: 100%; padding: 0;"
    @sort-change="handleSort"
    border
    :header-row-style="{background: '#ccc'}"
  >
    <el-table-column type="selection" width="40" align="center"></el-table-column>
    <el-table-column type="index" width="60" align="center"></el-table-column>
    <el-table-column
      v-for="(item,index) in dataConfig"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :min-width="item.width"
      :sortable="item.sortable"
      :formatter="item.formatter"
      v-if="showColumn(item.label)" >
    </el-table-column>
    <el-table-column v-if="checked.length === 0"></el-table-column>

    <el-table-column
      align="center"
      v-if="enabled"
      prop="enabled"
      label="启用"
      width="120">
      <template slot-scope="scope">
        <el-switch
          :disabled="eDisabled"
          v-model="scope.row.enabled"
          @change="editSubmit1(scope.$index, scope.row )"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作" :width="btnWidth" fixed="right" align="center" v-if="btnWidth">
      <template slot-scope="scope">
        <el-button v-if="detail" size="mini" icon="el-icon-view" @click="handleDetail(scope.$index, scope.row)"></el-button>
        <el-button v-if="edit" size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button v-if="del" size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)"></el-button>
        <el-button v-if="run" size="mini" type="primary" @click="handleRun(scope.$index, scope.row)">运行</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import mixin from '../utils/mixin'
  export default {
    mixins: [mixin],
    props: [
      'dataSourch',
      'dataConfig',
      'checked',
      'del',
      'edit',
      'detail',
      'run',
      'btnWidth',
      'eDisabled',
      'is_active',
      'audited',
      'enabled',
      'message_sent',
      'notify_sent',
    ],
    data () {
      return {
         aa: [],
      }
    },
    methods: {
      handleSort(column) {
        if(column.order === "ascending") {
          this.$emit("handleSort", column.prop);
        } else if(column.order === "descending") {
          this.$emit("handleSort", '-'+column.prop);
        }
      },
      selsChange(val) {
        this.$emit("selsChange", val)
      },
      editSubmit1(val1,val2) {
        this.$emit("editSubmit1", val1 , val2)
      },
      editSubmit2(val1,val2) {
        this.$emit("editSubmit2", val1 , val2)
      },
      showColumn(item) {
        if (this.checked.indexOf(item) !== -1) {
          return true;
        }
      },
      handleEdit(val1,val2) {
        this.$emit("handleEdit", val1 , val2)
      },
      handleDel(val1,val2) {
        this.$emit("handleDel", val1 , val2)
      },
      handleDetail(val1,val2) {
        this.$emit("handleDetail", val1 , val2)
      },
      handleRun(val1,val2) {
        this.$emit("handleRun", val1 , val2)
      }
    },
    mounted() {
    }
  }
</script>
