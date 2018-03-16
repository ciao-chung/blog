<template>
  <router-link :to="{ name: 'home' }" data-role="nav-brand">
    <i class="fa fa-anchor"></i>
    <span>{{site.name}}</span>
  </router-link>
</template>

<script>
export default {
  computed: {
    site: function () {
      return this.$store.getters.site
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
a[data-role="nav-brand"]
  color: $white
  position: absolute
  top: 0
  height: $nav-height
  line-height: $nav-height
  padding: 0 20px
  text-decoration: none
  .fa
    color: $light-blue
  @media(max-width: 991px)
    position: relative
    display: block
    text-align: center
</style>