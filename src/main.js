import Vue from 'vue'
import store from 'src/store/store'
import App from 'src/App'
import router from 'src/router.js'
import VueMeta from 'vue-meta'
import VueMoment from 'vue-moment'
import translate from 'libs/trans.js'
import popover from 'src/libs/popover.js'
import SSR from 'src/libs/SSR'

Vue.config.productionTip = false

window.self.$ = $

Vue.use(VueMeta)
Vue.use(translate)
Vue.use(VueMoment)

new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App },
  metaInfo: function () {
    return {
      title: this.site.name,
      link: this.site.link,
      meta: this.site.meta,
    }
  },
  created: function() {
    this.checkRoute()
  },
  methods: {
    checkRoute: function () {
      // 找不到route
      if(this.$route.name) return
      this.$router.replace({ name: '404' })
    },
  },
  watch: {
    $route: function () {
      this.checkRoute()
      this.$store.dispatch('breadcrumb.set', null)
    },
  },
  computed: {
    site: function () {
      return this.$store.getters.site
    },
  },
})
