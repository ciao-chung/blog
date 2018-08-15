<template>
  <div>
    <Pagination
      @changePage="changePage"
      :pager="pager"/>

    <div class="row">
      <ComponentDesign
        v-if="data"
        v-for="design in data"
        :design="design"
        :key="design.id"
      />
    </div>
  </div>
</template>

<script>
import api from 'libs/api'
import Pagination from 'components/Ciao/Pagination'
import ComponentDesign from './Design'
export default {
  data: function () {
    return {
      result: null,
    }
  },
  metaInfo: function () {
    return {
      title: trans('page.design'),
      meta: [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: trans('page.design'),
        },
      ],
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: async function () {
      this.result = null
      this.$store.dispatch('loading')
      try {
        this.result = await api.Design({ page: this.page, per: 8, })
        this.$store.dispatch('loading', false)
        this.setupBreadcrumb()
        this.$nextTick(() => SSR.done())
        dataLayer.push({
          'event': 'BlogTracking',
          'eventCategory': '頁面瀏覽',
          'eventAction': '作品列表',
          'eventLabel': JSON.stringify(this.$route.query),
        })
      } catch(error) {
        this.$store.dispatch('loading', false)
      }
    },
    setupBreadcrumb: function () {
      this.$store.dispatch('breadcrumb.set', [
        {
          label: 'page.home',
          route: { name: 'home' },
        },
        {
          label: 'page.design',
        },
      ])
    },
    changePage: function (page) {
      this.$router.push({
        name: 'design',
        query: {
          page: page,
        },
      })
    },
  },
  computed: {
    data: function () {
      if(!this.result) return null
      return this.result.data
    },
    pager: function () {
      if(!this.result) return null
      return this.result.pager
    },
    page: function () {
      if(!this.$route.query.page) return 1
      return this.$route.query.page
    },
  },
  watch: {
    $route: function() {
      this.init()
    },
  },
  components: {
    Pagination,
    ComponentDesign,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
</style>