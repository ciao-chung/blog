<template>
  <div v-if="photo" data-role="home-banner">
    <img :src="photo">
  </div>
</template>

<script>
export default {
  props: ['banner'],
  data: function () {
    return {
      initHeight: 0,
    }
  },
  mounted: function () {
    this.setHeight()
  },
  methods: {
    setHeight: function() {
      this.$nextTick(() => {
        this.initHeight = $(this.$el).height()
        $(window).resize(() => $(this.$el).height(this.initHeight) )
      })
    },
  },
  computed: {
    photo: function () {
      if(!this.banner) return null
      if(!this.banner.photo) return null
      if(!this.banner.photo.master) return null
      return this.banner.photo.master.url
    },
  },
  watch: {
    banner: {
      deep: true,
      handler: function () {
        this.initHeight()
      },
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable.sass'
div[data-role="home-banner"]
  height: 100vh
  img
    height: 100%
    width: 100%
    object-position: center 70%
    object-fit: cover
</style>