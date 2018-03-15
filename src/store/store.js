import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Base from 'src/store/modules/Base'
import Breadcrumb from 'src/store/modules/Breadcrumb'

export default new Vuex.Store ({
  modules: {
    Base,
    Breadcrumb,
  }
})
