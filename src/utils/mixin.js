import {  } from '../api/api'
import util from '../common/js/util'
let mixin = {
  data () {
    "use strict";
    return {
      tableContent: [], // 获取的表格内容
      total: 0,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面
      editLoading: false,
      addFormVisible: false,// 新增界面
      addLoading: false,
      detailFormVisible: false, // 详情界面
      detailLoading: false,
      pagination: {
        page: 1,
        page_size: 20,
      },
      enabledOptions: [{
        code: 'true',
        description: '启用'
      }, {
        code: 'false',
        description: '关闭'
      }],
      para: { page_size: 999999 },
      refreshLoading: false,
      merchantOptions: [],
      accountOptions: [],
      accountOptions1: [],
      deviceOptions: [],
      transOptions: [],
      errorMessage: '系统出错',
      current: 1,
    }
  },
  methods: {
    handleAdd: function () {
      this.addFormVisible = true;
    },
    defaultTime() {
      const end0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 23:59:59');
      const end = new Date(end0.replace(/-/g, '/')).getTime();
      const start0 = util.formatDate.format(new Date(), 'yyyy-MM-dd 00:00:00');
      const start = new Date(start0.replace(/-/g, '/')).getTime();
      return [start, end]
    },
  }
}

export default mixin
