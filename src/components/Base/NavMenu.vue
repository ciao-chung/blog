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
div[data-role="nav-menu"]
  ul
    list-style: none
    li
      color: blue
</style>