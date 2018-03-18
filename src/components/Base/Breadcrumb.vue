<template>
  <div :class="{ container: !isFullScreen }">
    <div data-role="breadcrumb" class="breadcrumb" v-if="breadcrumb">
      <li v-for="item in breadcrumb">
        <router-link v-if="item.route"
          :to="item.route">
          {{item.label| trans}}
        </router-link>
        
        <template v-if="!item.route">
          {{item.label| trans}}
        </template>
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
    isFullScreen: function () {
      return !!this.$route.meta.fullscreen
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
div[data-role="breadcrumb"]
  background-color: transparent
</style>