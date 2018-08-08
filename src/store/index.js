import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  addFormVisible: false,
  listLoading: false,
};

const mutations = {
  FormVisible (state) {
    state.addFormVisible = !state.addFormVisible;
  },
  tableLoading (state) {
    state.listLoading = !state.listLoading;
  }
};

const actions = {
  tableLoading(context) {
    context.commit('tableLoading');
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions
})
