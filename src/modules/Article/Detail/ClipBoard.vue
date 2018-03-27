<template>
  <div class="input-group copy-url">
    <input class="form-control article-url" type="text" :value="url">

    <span class="input-group-btn">
			<button class="btn btn-default btn-flat copy-btn" data-clipboard-target=".article-url" data-toggle="tooltip">
				<i class="fa fa-clipboard"></i>
			</button>
		</span>
  </div>
</template>

<script>
import ClipBoard from 'clipboard'
export default {
  mounted: function() {
    this.init()
  },
  methods: {
    init: function () {
      new ClipBoard('button[data-clipboard-target]')
    },
  },
  computed: {
    url: function () {
      return window.location.href
    },
  },
}
</script>