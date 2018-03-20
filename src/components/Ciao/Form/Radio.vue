<template>
  <div v-if="options instanceof Array">
    <div class="radio-wrap" v-for="option in options" :inline="inline">
      <label :disabled="isDisabled(option.value)">
        <input type="radio" name="iCheck" :value="option.value">
        <span>{{option.label}}</span>
      </label>
    </div>
  </div>
</template>

<script>
import 'icheck/icheck.js'
export default {
  props: {
    value: {},
    inline: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    disabled: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {
      style: 'iradio_square-blue',
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function() {
      this.$nextTick(() => {
        const self = this

        this.elements.iCheck({
          radioClass: this.style,
        })

        this.elements.on('ifClicked', (event) => {
          self.$emit('input', event.target.value)
        })

        this.setChecked()
        this.setDisabled()
      })
    },
    setChecked: function() {
      this.$emit('change', this.value)
      $(this.$el).find(`input[value=${this.value}]`).iCheck('check')
    },
    setDisabled: function () {
      this.elements.iCheck('enable')
      for(const value of this.disabled)
        $(this.$el).find(`input[value=${value}]`).iCheck('disable')
    },
    isDisabled: function (value) {
      return this.disabled.indexOf(value) > -1
    }
  },
  computed: {
    elements: function() {
      return $(this.$el).find('input')
    },
  },
  watch: {
    value: function() {
      this.setChecked()
    },
    disabled: function () {
      this.setDisabled()
    },
  },
}
</script>

<style src="icheck/skins/square/_all.css"></style>
<style lang="sass" type="text/sass" scoped>
.radio-wrap
  &[inline]
    display: inline-block
    margin: 10px
  label
    &[disabled]
      cursor: not-allowed
  input[type="radio"]
    opacity: 0
</style>
