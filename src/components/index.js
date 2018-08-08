import pagination from '../components/Pagination.vue'
import filterBar from "../components/FilterBar.vue"
import dataTable from "../components/dataTable.vue"
import dataForm from "../components/dataForm.vue"

const components = {
  install: function(Vue) {
    Vue.component('pagination', pagination);
    Vue.component('filterBar', filterBar);
    Vue.component('dataTable', dataTable);
    Vue.component('dataForm', dataForm);
  }
}
export default components;
