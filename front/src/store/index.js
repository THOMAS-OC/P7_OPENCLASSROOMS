import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    id: "",
    admin: 0,
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
      state.admin = user.admin
      state.name = user.name,
      state.firstName = user.firstName,
      state.email = user.email
      state.pictureprofil = user.pictureprofil || ''
    },
    setPictureProfil(state, user) {
      state.pictureprofil = user.pictureprofil
    },
    clearUser(state){
      state.id = "",
      state.admin = 0,
      state.name = "",
      state.firstName = "",
      state.email = "",
      state.pictureprofil = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
