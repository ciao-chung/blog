<template>
  <div data-role="nav">
    <NavBrand/>
    <NavMenu :open="open" />
    <NavSwitch @switchNav="switchNav"/>
  </div>
</template>

<script>
import NavBrand from 'components/Base/NavBrand.vue'
import NavMenu from 'components/Base/NavMenu.vue'
import NavSwitch from 'components/Base/NavSwitch.vue'
export default {
  data: function () {
    return {
      open: false,
    }
  },
  methods: {
    switchNav: function (open) {
      this.open = open
    },
  },
  components: {
    NavBrand,
    NavMenu,
    NavSwitch,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="nav"]
  z-index: $nav-zindex
  height: $nav-height
  width: 100vw
  background-color: $black
  opacity: 0.9
  position: fixed
  top: 0
</style>