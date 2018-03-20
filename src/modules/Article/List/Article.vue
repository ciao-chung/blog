<template>
  <div>
    {{article.title}}
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return null
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