import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    id: "",
    name: "",
    firstName: "",
    email : "",
    pictureprofil: ''
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.id = user.id,
      state.name = user.name,
      state.firstName = user.firstName,
      state.email = user.email
      state.pictureprofil = user.pictureprofil || ''
    },
  },
  actions: {
  },
  modules: {
  }
})
