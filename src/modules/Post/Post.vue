<template>
  <div v-if="post">
    <h1>{{post.title}}</h1>

    <div data-role="content" v-html="post.content"></div>
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
  methods: {
    init: async function () {
      this.post = null
      this.$store.dispatch('loading')
      try {
        this.post = await api.Post(this.code)
        this.setBreadcrumb()
        this.$store.dispatch('loading', false)
      } catch (reason) {
        this.$store.dispatch('loading', false)
        this.$route.replace({ name: '404' })
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
  },
  computed: {
    code: function () {
      return this.$route.params.code
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