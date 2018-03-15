<template>
  <div data-role="nav">
    <NavBrand/>
  </div>
</template>

<script>
import NavBrand from 'components/Base/NavBrand.vue'
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