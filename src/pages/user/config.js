
var dataConfig = {
  fields: [
    {
      "label": "ID",
      "prop": "id",
      "width": "60px",
      "sortable": "custom",
    },
    {
      "label": "名称",
      "prop": "name",
      "width": "120px",
      "sortable": false,
    },
    {
      "label": "年龄",
      "prop": "age",
      "width": "100px",
      "sortable": false,
    },
    {
      "label": "性别",
      "prop": "sex",
      "width": "100px",
      "sortable": false,
      "formatter": function(row) {
        if(row.sex === 1) {
          return '男'
        } else {
          return '女'
        }
      }
    },
    {
      "label": "地址",
      "prop": "addr",
      "width": "200px",
      "sortable": false,
    },
    {
      "label": "生日",
      "prop": "birth",
      "width": "150px",
      "sortable": "custom",
      "formatter": function (row) {
        var time = new Date(row.birth);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
      },
    },
  ],
  showColumn: ["名称","年龄","性别","地址"],
  addForm: {
    "id": 1,
    "name": "",
    "age": 0,
    "birth": "",
    "sex": 1,
    "addr": ""
  },
  addFormRules: {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请输入性别', trigger: 'blur' }
    ],
  },
  addFields: [
    {
      "label": "名称",
      "prop": "name",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "年龄",
      "prop": "age",
      "type": "number",
      "disabled": false,
    },
    {
      "label": "性别",
      "prop": "sex",
      "type": "radio",
      "path": [
        {code: 1, description: '男'},
        {code: 2, description: '女'}
        ],
      "disabled": false,
    },
    {
      "label": "地址",
      "prop": "addr",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "生日",
      "prop": "birth",
      "type": "date",
      "disabled": false,
    },
  ],
  editForm: {
    "id": 1,
    "name": "",
    "age": 0,
    "birth": "",
    "sex": 1,
    "addr": ""
  },
  editFormRules: {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请输入性别', trigger: 'blur' }
    ],
  },
  editFields: [
    {
      "label": "名称",
      "prop": "name",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "年龄",
      "prop": "age",
      "type": "number",
      "disabled": false,
    },
    {
      "label": "性别",
      "prop": "sex",
      "type": "radio",
      "path": [
        {code: 1, description: '男'},
        {code: 2, description: '女'}
      ],
      "disabled": false,
    },
    {
      "label": "地址",
      "prop": "addr",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "生日",
      "prop": "birth",
      "type": "date",
      "disabled": false,
    },
  ],
}

module.exports = dataConfig;
