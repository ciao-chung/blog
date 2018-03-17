<template>
  <div class="containter">
    <div data-role="breadcrumb" class="breadcrumb" v-if="breadcrumb">
      <li v-for="item in breadcrumb">
        <a>{{item}}</a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumb: function () {
      return this.$store.getters.breadcrumb
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
div[data-role="breadcrumb"]
  background-color: transparent
</style>