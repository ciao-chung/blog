<template>
  <div data-role="nav-menu">
    <ul>
      <MenuItem v-for="item, index in menu"
        :key="index"
        :item="item"/>
    </ul>
  </div>
</template>

<script>
import MenuData from 'modules/nav.js'
import MenuItem from 'components/Base/NavMenuItem.vue'
export default {
  data: function () {
    return {}
  },
  created: function () {},
  methods: {},
  computed: {
    menu: function () {
      return MenuData
    },
  },
  watch: {},
  components: {
    MenuItem,
  },
}
</script>

<style lang="sass" type="text/sass">
@import 'src/assets/variable'
div[data-role="nav-menu"]
  text-align: center
  ul
    list-style: none
    margin: 0
    padding: 0
    li
      display: inline-block
      cursor: pointer
      a
        display: inline-block
        padding: 0 20px
        color: blue
        background-color: $black
        height: $nav-height
        line-height: $nav-height
        color: $white
        border: 1px yellow solid
        text-decoration: none
      ul.sub-menu-container
        display: none
        position: absolute
        &[open]
          display: block
        li
          display: block
</style>