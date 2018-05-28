<template>
  <div v-if="post">
    <h1>{{post.title}}</h1>

    <div data-role="html-content" v-html="post.content"></div>
  </div>
</template>

<script>
import api from 'libs/api'
export default {
  data: function () {
    return {
      post: null,
    }
  },
  created: function () {
    this.init()
  },
  metaInfo: function () {
    return {
      title: this.title,
      meta: this.meta,
    }
  },
  methods: {
    init: async function () {
      this.post = null
      this.$store.dispatch('loading')
      try {
        this.post = await api.Post(this.code)
        this.setupMeta()
        this.setBreadcrumb()
        this.$store.dispatch('loading', false)

        dataLayer.push({
          'event': 'BlogTracking',
          'eventCategory': '頁面瀏覽',
          'eventAction': '文案',
          'eventLabel': this.post.title,
        })
      } catch (reason) {
        this.$store.dispatch('loading', false)
        this.$router.replace({ name: '404' })
      }
    },
    setBreadcrumb: function () {
      this.$store.dispatch('breadcrumb.set', [
        {
          label: 'page.home',
          route: { name: 'home' },
        },
        {
          label: this.post.title,
        },
      ])
    },
    setupMeta: function () {
      let meta = [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.post.title,
        }
      ]

      if(this.post.keywords) {
        meta.push({
          vmid: 'keywords',
          name: 'keywords',
          content: this.post.keywords,
        })
      }

      if(this.post.descriptions) {
        meta.push({
          vmid: 'og:description',
          property: 'og:description',
          content: this.post.descriptions,
        })

        meta.push({
          vmid: 'description',
          name: 'description',
          content: this.post.descriptions,
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
  },
  computed: {
    code: function () {
      return this.$route.params.code
    },
    title: function () {
      if(!this.post) return ''
      return this.post.title
    },
    photo: function () {
      if(!this.post) return ''
      if(!this.post.photo) return ''
      if(!this.post.photo.url) return ''
      return this.post.photo.url
    },
  },
  watch: {
    $route: function() {
      this.init()
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
</style>