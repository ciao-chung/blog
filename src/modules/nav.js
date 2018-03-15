export default [
  {
    label: 'menu.about',
    icon: 'user-circle',
    sub: [
      {
        label: 'menu.dance',
        icon: 'music',
        route: {
          name: 'post',
          params: { code: 'dance' },
        },
      },
      {
        label: 'menu.coding',
        icon: 'desktop',
        route: {
          name: 'post',
          params: { code: 'coding' },
        },
      },
      {
        label: 'menu.trip',
        icon: 'map-marker',
        route: {
          name: 'post',
          params: { code: 'trip' },
        },
      },
      {
        label: 'menu.navy',
        icon: 'anchor',
        route: {
          name: 'post',
          params: { code: 'navy' },
        },
      },
    ],
  },
  {
    label: 'menu.web_dev',
    icon: 'code',
    sub: [
      {
        label: 'menu.skill',
        icon: 'rocket',
        route: {
          name: 'post',
          params: { code: 'skill' },
        },
      },
      {
        label: 'menu.design',
        icon: 'file-code-o',
        route: {
          name: 'design',
        },
      },
    ],
  },
  {
    label: 'menu.article',
    icon: 'share-alt',
    route: {
      name: 'article',
    },
  },
  {
    label: 'menu.github',
    icon: 'github',
    url: 'https://github.com/ciao-chung',
  },
]