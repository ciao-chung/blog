<template>
  <div data-role="nav">
    <NavBrand/>
    <NavMenu/>
  </div>
</template>

<script>
import NavBrand from 'components/Base/NavBrand.vue'
import NavMenu from 'components/Base/NavMenu.vue'
export default {
  data: function () {
    return {}
  },
  created: function () {},
  methods: {},
  computed: {},
  watch: {
    $route: function() {},
  },
  components: {
    NavBrand,
    NavMenu,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="nav"]
  height: $nav-height
  width: 100vw
  background-color: $black
  opacity: 0.9
  position: fixed
</style>