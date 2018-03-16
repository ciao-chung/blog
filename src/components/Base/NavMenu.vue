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
$transition-during: 0.7s
div[data-role="nav-menu"]
  text-align: center
  overflow-y: auto
  ul
    list-style: none
    margin: 0
    padding: 0
    li
      display: inline-block
      cursor: pointer
      width: $li-width
      a
        display: inline-block
        padding: 0 20px
        background-color: $black
        height: $nav-height
        line-height: $nav-height
        width: 100%
        color: $white
        text-decoration: none
      ul.sub-menu-container
        position: absolute
        transition: all $transition-during ease
        opacity: 0
        max-height: 0
        pointer-events: none
        &[open]
          pointer-events: auto
          transition: all $transition-during ease
          opacity: 1
          max-height: 100%
        li
          display: block
          border-top: 1px $white solid
  @media(max-width: 991px)
    ul
      li
        display: block
        width: 100%
        background-color: $black
        border-top: 1px $white solid
        ul.sub-menu-container
          position: relative
          max-height: 0
          opacity: 0
          transition: all $transition-during ease
          &[open]
            transition: all $transition-during ease
            max-height: 80vh
            overflow-y: auto
            opacity: 1
</style>
