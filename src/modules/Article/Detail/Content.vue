<template>
  <div data-role="html-content">
    <div v-html="content"></div>

    <div class="input-group" v-if="article.is_lock && !content">
      <input
        v-model="password"
        @keyup.enter="unlock"
        type="password" class="form-control flat">

      <span class="input-group-btn" @click="unlock">
          <button class="btn btn-warning btn-flat">
            <i class="fa fa-unlock"></i>
          </button>
        </span>
    </div>
  </div>
</template>

<script>
import api from 'libs/api'
import Prismjs from 'prismjs'
import PrismjsLoadLanguages from 'prismjs/components/index.js'
export default {
  props: {
    article: {
      type: Object,
    },
    content: {
      type: [String, null],
      default: function () {
        return null
      }
    },
  },
  data: function () {
    return {
      password: null,
    }
  },
  methods: {
    unlock: async function () {
      this.$store.dispatch('loading')
      try {
        const result = await api.ArticleUnlock(this.article.id, {
          password: this.password
        })
        this.$emit('setContent', result.content)
        this.$store.dispatch('loading', false)
      } catch (error) {
        this.$store.dispatch('loading', false)
      }
    },
  },
  watch: {
    content: function () {
      this.$nextTick(() => {
        PrismjsLoadLanguages(['javascript', 'php', 'sass', 'scss', 'bash'])
        Prismjs.highlightAll()
      })
    },
  },
}
</script>

<style src="prismjs/themes/prism.css"></style>
<style lang="sass" type="text/sass" scoped>
div[data-role="html-content"]
  .input-group
    width: 300px
    max-width: 80%
</style>