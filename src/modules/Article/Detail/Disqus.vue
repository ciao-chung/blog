<template>
  <div>
    <div id="disqus_thread"></div>
    <noscript>
      Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript" rel="nofollow">
        comments powered by Disqus.
      </a>
    </noscript>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.init()
  },
  methods: {
    init: function() {
      (function() {
        var d = document, s = d.createElement('script');
        s.src = '//ciao-blog.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      })();
    }
  }
}
</script>