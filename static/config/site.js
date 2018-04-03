module.exports = {
  name: 'Ciao\'s Blog',
  meta: [
    {
      charset: 'utf-8'
    },
    {
      vmid: 'keywords',
      name: 'keywords',
      content: 'Ciao\'s Blog,鍾板橋,板橋Blog',
    },
    {
      vmid: 'description',
      name: 'description',
      content: '我是板橋',
    },
    {
      vmid: 'og:title',
      property: 'og:title',
      content: 'Ciao\'s Blog',
    },
    {
      vmid: 'og:description',
      property: 'og:description',
      content: '我是板橋',
    },
    {
      vmid: 'og:site_name',
      property: 'og:site_name',
      content: 'Ciao\'s Blog',
    },
    {
      vmid: 'og:url',
      property: 'og:url',
      content: window.location.href,
    },
    {
      vmid: 'og:image',
      property: 'og:image',
      content: 'https://static.ciao-chung.com/ciao/blog/main-sm.jpg',
    },
  ],
  link: [
    { rel: 'favicon', href: '/static/favicon.ico' },
    { rel: 'shortcut icon', href: '/static/favicon.ico' },
  ],
}