<template>
  <div v-if="pager" data-role="pagination-wrap">
    <div class="input-group" v-if="input">
      <span class="input-group-addon">{{'filter.pagination.current'| trans}}</span>
      <input type="text" class="form-control" v-model="inputValue" @keyup.enter="changeInputPage">
      <span class="input-group-btn" @click="changeInputPage">
        <button class="btn btn-success">
          <i class="fa fa-location-arrow"></i>
        </button>
      </span>
    </div>

    <div data-role="pagination">
      <!-- 上一頁 -->
      <a
        v-if="pager.pages > 1"
        :disabled="!pager.has_previous"
        @click="previous">
        <i class="fa fa-angle-left"></i>
      </a>

      <!-- 頁數 -->
      <template v-if="pager.pages > 1" v-for="page in body">
        <a
          v-if="page != 0"
          @click="changePage(page)"
          :class="{ active: pager.page == page }">
          {{page}}
        </a>

        <a v-if="page == 0">...</a>
      </template>

      <!-- 下一頁 -->
      <a
        v-if="pager.pages > 1"
        :disabled="!pager.has_next"
        @click="next">
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pager', 'input'],
  data: function () {
    return {
      // 開始簡化的頁數
      simplify_at: 3,

      // 間距值
      padding: 2,

      inputValue: 0,
    }
  },
  created: function () {
    this.setInputValue()
  },
  methods: {
    changeInputPage: function() {
      if(isNaN(this.inputValue)) return
      this.changePage(this.inputValue);
    },
    changePage: function(page) {
      this.$emit('changePage', page)
    },
    previous: function() {
      if(!this.pager.has_previous) return
      this.changePage(this.pager.page-1)
    },
    next: function() {
      if(!this.pager.has_next) return
      this.changePage(this.pager.page+1)
    },
    setInputValue: function() {
      if(!this.pager) return
      this.inputValue = this.pager.page
    },
  },
  computed: {
    isSimplify: function() {
      return this.pager.pages >= this.simplify_at
    },
    body: function() {
      const pages = this.pager.pages
      const current = this.pager.page
      let body = []

      // 還不須簡化
      if(!this.isSimplify) {
        for(let i=1; i<=pages; i++) body.push(i)
        return body
      }

      // 左邊超出間距值(須簡化), 補0
      if(current-this.padding > 1) {
        body.push(1)
        body.push(0)
        for(let i=current-this.padding; i<=current-1; i++) body.push(i)
      }

      // 左邊沒超出間距值
      else if(current-this.padding <= 1) {
        for(let i=1; i<=current-1; i++) body.push(i)
      }

      // 目前頁數
      body.push(current)

      // 右邊超出間距值(須簡化), 補0
      if(pages - this.padding > current + 1) {
        for(let i=current+1; i<=current+this.padding; i++) body.push(i)
        body.push(0)
        body.push(pages)
      }

      // 右邊沒超出間距值
      else if(pages - this.padding <= current + 1) {
        for(let i=current+1; i<=pages; i++) body.push(i)
      }

      return body
    },
  },
  watch: {
    'pager.page': function() {
      this.setInputValue()
    },
  },
  components: {},
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
ul.pagination
  li
    cursor: pointer
    &[disabled]
      cursor: not-allowed

div[data-role="pagination-wrap"]
  padding: 10px
  div[data-role="info"]
    &>span
      margin-right: 20px

div[data-role="pagination"]
  a
    font-size: 16px
    margin: 0 5px
    color: $light-gray
    cursor: pointer
    &.active
      color: $theme-color
      font-weight: bolder
    &[disabled]
      cursor: not-allowed
</style>