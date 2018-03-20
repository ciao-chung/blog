<template>
  <div data-role="article-filter">
    {{filter}}
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
</style>