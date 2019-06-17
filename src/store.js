import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oCustID:null,
    tAddress:[],//存储用户选择的地址
    eAddress:[],//用户编辑的地址
    commentrenList:[],//从订单列表页面带到评论页面的数据
    goodnumber:[]
  },
  mutations: {
    tAddress(state, addressMessage){
      //清空上次选择的地址
      state.tAddress=[];
      //重新添加地址
      state.tAddress.push(addressMessage)
  },eAddress(state, addressMessage){
      state.eAddress=[];
      state.eAddress.push(addressMessage)
    },
    commentrenList(state, commentrenList){
      state.commentrenList=[];
      state.commentrenList.push(commentrenList)
    },
    [types.OCUSTID](state,data){
      state.oCustID = data;
    }
    // goodnumber(state,goodnumber){
    //   state.goodnumber=goodnumber
    // }
  },
  actions: {
  
  }
})
