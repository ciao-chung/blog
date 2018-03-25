<template>
  <div data-role="article-filter">
    {{filter}} ,, {{keyword}}

    <div>
      <Pagination
        @changePage="changePage"
        :pager="pager"/>
    </div>

    <div class="search">
      <div class="input-group">
        <input
          v-model="keyword"
          @keyup.enter="search"
          :placeholder="keyword_placeholder"
          type="text" class="form-control flat">

        <span class="input-group-btn" @click="search">
          <button class="btn btn-success btn-flat">
            <i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from 'libs/helper.js'
import Pagination from 'components/Ciao/Pagination'
export default {
  props: {
    result: {
      type: Object,
      default: function () {
        return null
      }
    },
    filter: {
      type: Object,
      default: function () {
        return {}
      }
    },
    categories: {
      type: Array,
      default: function () {
        return null
      },
    },
  },
  data: function () {
    return {
      keyword: null,
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.keyword = null
      if(!this.isFilterByKeyword) return
      let keyword = this.filter.search.title
      keyword = Helper.removeLikeSymbol(keyword)
      this.keyword = keyword
    },
    search: function () {
      this.$emit('search', {
        type: this.isFilterByKeyword ? 'keyword' : 'category',
        value: this.keyword,
      })
    },
    changePage: function (page) {
      this.$emit('changePage', page)
    },
  },
  components: {
    Pagination,
  },
  computed: {
    pager: function () {
      if(!this.result) return null
      return this.result.pager
    },
    keyword_placeholder: function () {
      return trans('article.keyword.help')
    },
    isFilterByKeyword: function () {
      return !!this.filter.search.title
    },
    isFilterByCategory: function () {
      return !!this.filter.search.category
    },
  },
  watch: {
    filter: {
      deep: true,
      handler: function () {
        this.init()
      },
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
div[data-role="article-filter"]
  max-width: 300px
</style>