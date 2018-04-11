<template>
  <div data-role="404">
    <h2 class="text-danger">
      <i class="fa fa-warning"></i>
      {{'404.message'|trans}}
    </h2>
  </div>
</template>

<script>
export default {
  created: function () {
    dataLayer.push({
      'event': 'BlogTracking',
      'eventCategory': '頁面瀏覽',
      'eventAction': '404',
    })
    SSR.error()
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/base'
div[data-role="404"]
  margin-top: $nav-height + 30
</style>