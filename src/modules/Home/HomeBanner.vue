<template>
  <div v-if="photo" data-role="home-banner">
    <img :src="photo">

    <h2 class="title">{{banner.title}}</h2>
    <h4 class="brief">{{banner.brief}}</h4>
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
      return this.banner.photo.url
    },
  },
  watch: {
    banner: {
      deep: true,
      handler: function () {
        this.setHeight()
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
  .title, .brief
    position: absolute
    width: 100%
    text-align: center
    color: $white
  .title
    top: 60%
    font-size: 45px
  .brief
    top: 75%
</style>