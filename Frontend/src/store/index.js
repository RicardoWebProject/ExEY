import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
  },
  actions: {
    guardarToken({commit}, token){
      commit('setToken', token);
      localStorage.setItem('token', token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem('token')
      if(token){
        commit('setToken', token);
        router.push({name: 'HelloWorld'});
      }
      else {
        router.push({name: 'Login'});
      }
    },
    salir({commit}){
      commit('setToken', null);
      localStorage.removeItem('token');
      router.push({name: 'Login'});
    }
  },
  modules: {
  }
})
