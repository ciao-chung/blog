<template>
  <VueRecaptcha
    v-if="site_key"
    ref="recaptcha"
    @verify="emitVerify"
    :sitekey="site_key" />
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  props: {
    site_key: {
      type: String,
      default: null,
    },
  },
  beforeCreate: function () {
    if($('#recaptcha-api').length > 0) return
    $('body').append("<script id='recaptcha-api' src=\"https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit\" async defer><\/script>")
  },
  methods: {
    emitVerify: function (response) {
      this.$emit('verify', response)
    },
    reset: function() {
      this.$refs.recaptcha.reset()
    },
  },
  components: {
    VueRecaptcha,
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>