<template>
  <div data-role="article" v-if="article">
    <h1>{{article.title}}</h1>

    <div class="time">
      {{article.updated_at}}
    </div>

    <div class="category" v-if="article.category">
      <router-link target="_blank" :to="{ name: 'article', query: { category: category.id } }" class="label label-info"
         v-for="category in article.category"
         :key="category.id">
        {{category.name}}
      </router-link>
    </div>

    <div data-role="html-content" v-html="content"></div>
  </div>
</template>

<script>
import api from 'libs/api'
export default {
  data: function () {
    return {
      article: null,
      content: null,
      meta: [],
    }
  },
  created: function () {
    this.init()
  },
  metaInfo: function () {
    return {
      title: this.title,
      meta: this.meta
    }
  },
  methods: {
    init: async function () {
      this.article = null
      this.content = null
      this.meta = []
      this.$store.dispatch('loading')
      try {
        this.article = await api.ArticleDetail(this.id)
        this.setupMeta()
        this.setupBreadcrumb()
        this.loadContent()
      } catch (error) {
        SSR.error()
        this.$store.dispatch('loading', false)
        this.$router.replace({ name: '404' })
      }
    },
    loadContent: async function() {
      if(this.article.is_lock) {
        this.$store.dispatch('loading', false)
        this.$nextTick(SSR.done)
        return
      }

      try {
        this.$store.dispatch('loading', false)
        const result = await api.ArticleContent(this.id)
        this.content = result.content
        this.$nextTick(() => {
          SSR.done()
          require('prismjs')
        })
      } catch(error) {
        SSR.error()
        this.$store.dispatch('loading', false)
      }
    },
    setupMeta: function () {
      let meta = [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.article.title,
        }
      ]

      if(this.article.description) {
        meta.push({
          vmid: 'og:description',
          property: 'og:description',
          content: this.article.description,
        })
      }

      if(this.photo) {
        meta.push({
          vmid: 'og:image',
          property: 'og:image',
          content: this.photo,
        })
      }

      this.meta = meta
    },
    setupBreadcrumb: function () {
      this.$store.dispatch('breadcrumb.set', [
        {
          label: 'page.home',
          route: { name: 'home' },
        },
        {
          label: 'page.article',
          route: { name: 'article' },
        },
        {
          label: this.title,
        },
      ])
    },
  },
  computed: {
    id: function () {
      return this.$route.params.id
    },
    title: function () {
      if(!this.article) return ''
      return this.article.title
    },
    photo: function () {
      if(!this.article) return ''
      if(!this.article.photo) return ''
      if(!this.article.photo.url) return ''
      return this.article.photo.url
    },
  },
  watch: {
    $route: function() {
      this.init()
    },
  },
  components: {},
}
</script>

<style src="prismjs/themes/prism-okaidia.css"></style>
<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="article"]
  &>*
    margin: 30px 0
  .time
    color: $text
  .category
    a
      margin-right: 20px
      border-radius: 0
      font-size: 14px
  div[data-role="html-content"]

</style>