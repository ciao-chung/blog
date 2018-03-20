<template>
  <div data-role="article-filter">
    <FormRadio
      v-model="filter_type"
      @change="onFilterTypeChange"
      :inline="true"
      :options="radioInputOptions"/>

    <div class="search">
      <div class="input-group">
        <input
          v-if="filter_type != 'category'"
          v-model="value"
          type="text" class="form-control flat">

        <select class="form-control flat" v-if="filter_type == 'category'" v-model="value">
          <option :value="category.id" v-for="category in categories">
            {{category.name}}
          </option>
        </select>

        <span class="input-group-btn">
          <button class="btn btn-success btn-flat">
            <i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import FormRadio from 'components/Ciao/Form/Radio.vue'
export default {
  props: {
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
      filter_type: null,
      value: null,
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.filter_type = null

      if(!this.isSearchTitle && !this.isSearchCategory) return

      this.filter_type = this.isSearchTitle ? 'title' : 'category'
      this.value = this.searchValue

      if(this.filter_type != 'category') return
      if(this.value) return
      this.value = this.categories[0].id
    },
    onFilterTypeChange: function (filter_type) {
      if(filter_type == 'title') this.value = null
      if(filter_type == 'category') this.value = this.categories[0].id
    },
  },
  computed: {
    isSearchCategory: function () {
      if(!this.filter) return false
      if(!this.filter.search) return false
      if(!this.filter.search['category.category_id']) return false
      return true
    },
    isSearchTitle: function () {
      if(!this.filter) return false
      if(!this.filter.search) return false
      if(!this.filter.search.title) return false
      return true
    },
    searchValue: function () {
      if(!this.isSearchTitle && !this.isSearchCategory) return null
      if(this.isSearchTitle) return this.filter.search.title
      return this.filter.search['category.category_id']
    },
    radioInputOptions: function () {
      return [
        { label: trans('article.data.title'), value: 'title' },
        { label: trans('article.data.category'), value: 'category' },
      ]
    },
  },
  components: {
    FormRadio,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
// @import 'src/assets/variable'
div[data-role="article-filter"]
  .search
    max-width: 300px
</style>