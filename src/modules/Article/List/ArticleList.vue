<template>
  <div>
    <ComponentFilter
      :filter="filter"/>

    <div v-if="result">
      <ComponentArticle
        v-for="article in result.data"
        :key="article.id"
        :article="article" />
    </div>
  </div>
</template>

<script>
import api from 'libs/api'
import Helper from 'libs/helper'
import ComponentFilter from './Filter'
import ComponentArticle from './Article'
export default {
  data: function () {
    return {
      filter: {},
      categories: null,
      result: null,
    }
  },
  created: function () {
    this.parseQueryAsFilter()
    this.init()
  },
  methods: {
    init: async function () {
      this.categories = null
      this.setupBreadcrumb()
      try {
        let params = $.extend(true, {}, this.filter)
        params.sort.data_order = 'desc'
        this.result = await api.Article(params)
        console.warn(this.result)
      } catch (error) {
        console.error(error)
      }
    },
    parseQueryAsFilter: function () {
      this.filter = Helper.queryToJson(this.$route.query)
    },
    setupBreadcrumb: function () {
      this.$store.dispatch('breadcrumb.set', [
        {
          label: 'page.home',
          route: { name: 'home' },
        },
        {
          label: 'page.article',
        },
      ])
    },
  },
  computed: {},
  watch: {
    $route: function() {
      this.parseQueryAsFilter()
    },
  },
  components: {
    ComponentFilter,
    ComponentArticle,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
</style>