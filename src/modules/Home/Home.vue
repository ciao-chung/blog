<template>
  <div>
    <HomeBanner :banner="banner" />

    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <HomeVcard />
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
      banner: {
        photo: {
          master: {
            uid: '123456',
            url: 'https://goo.gl/yALcQr',
          },
          photos: [
            {
              uid: '123456',
              url: 'https://goo.gl/yALcQr',
            }
          ],
        },
        title: 'Ciao!',
        brief: '我是板橋',
      },
    }
  },
  created: function () {
    return
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
    HomeVcard,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
.row
  margin: 0
</style>