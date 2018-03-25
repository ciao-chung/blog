<template>
  <div>
    <ComponentFilter
      v-if="categories"
      @search="search"
      :categories="categories"
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
    init: function () {
      this.setupBreadcrumb()
      this.loadArticle()
      this.loadCategories()
    },
    loadArticle: async function() {
      this.$store.dispatch('loading')
      try {
        let params = $.extend(true, {}, this.filter)
        params.sort.data_order = 'desc'
        this.result = await api.Article(params)
        this.$store.dispatch('loading', false)
      } catch (error) {
        this.$store.dispatch('loading', false)
      }
    },
    loadCategories: async function() {
      this.categories = null
      try {
        this.categories = await api.FlatTree('article')
      } catch (error) {
        console.error(error)
      }
    },
    parseQueryAsFilter: function () {
      const page = !this.$route.query.page ? 1 : this.$route.query.page
      const keyword = this.$route.query.keyword
      const category = this.$route.query.category

      let filter = {
        search: {},
        sort: {
          data_order: 'desc',
        },
        search_type: 'or',
        page: page
      }

      if(keyword) {
        filter.search = {
          title: `%${keyword}%`,
          content: `%${keyword}%`,
        }
      }

      if(category) {
        filter.search = {
          category: category
        }
      }

      this.filter = filter
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
    search: function (data) {
      let filter = $.extend(true, {}, this.filter)
      let query = {
        page: filter.page,
      }

      if(data.type == 'keyword') query.keyword = data.value
      if(data.type == 'category') query.category = data.value
      this.$router.push({
        name: 'article',
        query: query
      })
    },
  },
  watch: {
    $route: function() {
      this.parseQueryAsFilter()
      this.loadArticle()
      this.setupBreadcrumb()
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