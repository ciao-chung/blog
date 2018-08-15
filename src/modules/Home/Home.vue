<template>
  <div>
    <HomeBanner :banner="top" />

    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <HomeVcard :banner="vcard" />
      </div>
    </div>
  </div>
</template>

<script>
import api from 'libs/api'
import HomeBanner from './HomeBanner'
import HomeVcard from './HomeVcard'
export default {
  data: function () {
    return {
      top: null,
      vcard: null,
    }
  },
  created: function () {
    this.init()
    dataLayer.push({
      'event': 'BlogTracking',
      'eventCategory': '頁面瀏覽',
      'eventAction': '首頁',
    })
  },
  methods: {
    async init() {
      this.$store.dispatch('loading')
      try {
        await Promise.all([
          this.loadBanner('top'),
          this.loadBanner('vcard'),
        ])
        this.$store.dispatch('loading', false)
        this.$nextTick(() => SSR.done())
      } catch (error) {
        this.$store.dispatch('loading', false)
      }
    },
    loadBanner(type) {
      const self = this
      this[type] = null
      const _api = api.Banner(`home-${type}`)
      _api.then((result) => self[type] = result)
      return _api
    },
  },
  components: {
    HomeBanner,
    HomeVcard,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
.row
  margin: 0
</style>