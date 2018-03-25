<template>
  <div data-role="article-filter">
    <div class="pagination-wrap">
      <Pagination
        @changePage="changePage"
        :pager="pager"/>
    </div>

    <div class="search row">
      <div class="col-md-4">
        <div class="input-group">
          <input
            v-model="keyword"
            @keyup.enter="search('keyword')"
            :placeholder="keyword_placeholder"
            type="text" class="form-control flat">

          <span class="input-group-btn" @click="search('keyword')">
            <button class="btn btn-success btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>

      <div class="col-md-4">
        <div class="input-group">
          <select v-model="category" class="form-control flat">
            <option v-for="category in category_list" :value="category.id">
              {{category.name}}
            </option>
          </select>

          <span class="input-group-btn" @click="search('category')">
            <button class="btn btn-success btn-flat">
              <i class="fa fa-tags"></i>
            </button>
          </span>
        </div>
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
      category: null,
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.keyword = null
      this.category = null
      if(this.isFilterByCategory) {
        this.category = this.$route.query.category
        return
      }

      let keyword = this.filter.search.title
      keyword = Helper.removeLikeSymbol(keyword)
      this.keyword = keyword
    },
    search: function (type) {
      this.$emit('search', {
        type: type,
        value: type == 'keyword' ? this.keyword : this.category,
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
      return trans('article.filter.keyword.help')
    },
    isFilterByKeyword: function () {
      return this.$route.query.keyword
    },
    isFilterByCategory: function () {
      return this.$route.query.category
    },
    category_list: function () {
      let category_list = [
        { id: null, name: trans('article.filter.category_clear') }
      ]
      if(!this.categories) return category_list
      category_list = category_list.concat(this.categories)
      return category_list
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
</style>