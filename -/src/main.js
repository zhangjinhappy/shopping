import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/mui.css'
import './assets/css/iconfont.css'
import YDUI from 'vue-ydui'
import './assets/css/ydui.px.css'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(YDUI);
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'
Vue.component(CheckBox.name, CheckBox);
Vue.component(CheckBoxGroup.name, CheckBoxGroup);
import {CitySelect} from 'vue-ydui/dist/lib.px/cityselect'
Vue.component(CitySelect.name, CitySelect)
/* 使用px：import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list'; */


Vue.config.productionTip = false
import * as axios from '../src/api/index'
Vue.prototype.$axios= axios;
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error: require('./assets/img/loading.gif'),
    loading:require('./assets/img/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
