<template>
  <div v-if="design" data-role="design-detail">
    <div class="photo-wrap" v-if="photo">
      <img :src="photo">
    </div>
    
    <h1>{{design.name}}</h1>

    <div class="item">
      <h4>{{'design.data.url'| trans}}</h4>

      <div>
        <a v-if="isUrl(design.url)" target="_blank" :href="design.url">{{design.url}}</a>
        <span v-if="!isUrl(design.url)">{{design.url}}</span>
      </div>
    </div>

    <div class="item">
      <h4>{{'design.data.period'| trans}}</h4>

      <div>
        {{design.period}}
      </div>
    </div>

    <div class="item" v-html="design.content"></div>
  </div>
</template>

<script>
import api from 'libs/api'
import Helper from 'libs/helper.js'
export default {
  data: function () {
    return {
      design: null,
      meta: [],
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
    isUrl: function (string) {
      return Helper.isUrl(string)
    },
    init: async function() {
      this.design = null
      this.$store.dispatch('loading')
      try {
        this.design = await api.DesignDetail(this.id)
        this.$store.dispatch('loading', false)
        this.setupMeta()
        this.setupBreadcrumb()
        this.$nextTick(SSR.done)
      } catch (error) {
        this.$store.dispatch('loading', false)
        this.$router.replace({ name: '404' })
      }
    },
    setupMeta: function () {
      let meta = [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: this.design.name,
        }
      ]

      if(this.design.description) {
        meta.push({
          vmid: 'og:description',
          property: 'og:description',
          content: this.design.brief,
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
          label: 'page.design',
          route: { name: 'design' },
        },
        {
          label: this.design.name,
        },
      ])
    },
  },
  computed: {
    id: function () {
      return this.$route.params.id
    },
    title: function () {
      if(!this.design) return null
      return this.design.name
    },
    photo: function () {
      if(!this.design) return ''
      if(!this.design.photo) return ''
      if(!this.design.photo.url) return ''
      return this.design.photo.url
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

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="design-detail"]
  .photo-wrap
    width: 100%
    overflow: hidden
    border: 1px $light-gray solid
    img
      width: 100%
  .item
    margin: 30px 0
    font-size: 16px
</style>