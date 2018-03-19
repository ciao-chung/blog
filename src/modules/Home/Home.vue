<template>
  <div>
    <HomeBanner :banner="banner" />
  </div>
</template>

<script>
import api from 'libs/api'
import HomeBanner from './HomeBanner'
export default {
  data: function () {
    return {
      banner: null,
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: async function () {
      this.banner = null
      this.$store.dispatch('loading')
      try {
        this.banner = await api.Banner('home')
        this.$store.dispatch('loading', false)
      } catch (error) {
        this.$store.dispatch('loading', false)
      }
    },
  },
  watch: {},
  components: {
    HomeBanner,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
</style>