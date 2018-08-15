<template>
  <div>
    <ComponentFilter
      v-if="categories"
      @search="search"
      @changePage="changePage"
      :categories="categories"
      :result="result"
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
import ComponentFilter from './Filter'
import ComponentArticle from './Article'
export default {
  data: function () {
    return {
      filter: {},
      categories: null,
      result: null,
      title: trans('page.article'),
    }
  },
  metaInfo: function () {
    return {
      title: this.title,
      meta: [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
      ],
    }
  },
  created: function () {
    this.parseQueryAsFilter()
    this.init()
  },
  methods: {
    async init() {
      this.setupBreadcrumb()
      this.$store.dispatch('loading')
      await this.loadCategories()
      await this.loadArticle()
    },
    loadArticle: async function() {
      this.$store.dispatch('loading')
      let params = $.extend(true, {}, this.filter)
      try {
        this.result = await api.Article(params)
        this.$store.dispatch('loading', false)
      } catch(error) {
        SSR.error()
        this.$store.dispatch('loading', false)
        return
      }

      this.setupMeta()
      this.$nextTick(() => SSR.done())
      dataLayer.push({
        'event': 'BlogTracking',
        'eventCategory': '頁面瀏覽',
        'eventAction': '文章列表',
        'eventLabel': JSON.stringify(this.$route.query),
      })
    },
    loadCategories: async function() {
      this.categories = null
      try {
        this.categories = await api.FlatTree('article')
      } catch(error) {
        console.error(error)
      }
    },
    parseQueryAsFilter: function () {
      const page = !this.$route.query.page ? 1 : this.$route.query.page
      const keyword = this.$route.query.keyword
      const category = this.$route.query.category

      let filter = {
        search: {},
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
          'category.category_id': category
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
      let query = {
        page: 1,
      }

      if(!data.value) return
      if(data.type == 'keyword') query.keyword = data.value
      if(data.type == 'category') query.category = data.value
      this.$router.push({
        name: 'article',
        query: query
      })
    },
    changePage: function (page) {
      let query = $.extend(true, {}, this.$route.query)
      query.page = page
      this.$router.push({
        name: 'article',
        query: query
      })
    },
    setupMeta() {
      if(!this.filter) return
      if(!this.filter.search) return
      if(!this.filter.search['category.category_id']) return
      const categoryId = this.filter.search['category.category_id']
      const categoryName = this.getCategoryName(categoryId)
      let title = trans('page.article')
      if(categoryName) title = `${title}(${categoryName})`
      this.title = title
    },
    getCategoryName(id) {
      if(!Array.isArray(this.categories)) return
      const categories = $.extend(true, [], this.categories)
      const ids = categories.map((category) => category.id)
      const index = ids.indexOf(id)
      if(index == -1) return null
      return this.categories[index].name
    },
  },
  watch: {
    $route: function() {
      this.parseQueryAsFilter()
      this.loadArticle()
      this.setupBreadcrumb()
    },
  },
  computed: {
    page() {
      if(!this.result) return null
      if(!this.result.pager) return null
      if(!this.result.pager.page) return null
      if(!this.result.pager.page) return null
      return this.result.pager.page
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