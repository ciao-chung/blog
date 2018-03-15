export default [
  {
    label: 'menu.about',
    sub: [
      {
        label: 'menu.dance',
        route: {
          name: 'post',
          params: { code: 'dance' },
        },
      },
      {
        label: 'menu.coding',
        route: {
          name: 'post',
          params: { code: 'coding' },
        },
      },
      {
        label: 'menu.trip',
        route: {
          name: 'post',
          params: { code: 'trip' },
        },
      },
      {
        label: 'menu.navy',
        route: {
          name: 'post',
          params: { code: 'navy' },
        },
      },
    ],
  },
  {
    label: 'menu.web_dev',
    sub: [
      {
        label: 'menu.skill',
        route: {
          name: 'post',
          params: { code: 'skill' },
        },
      },
      {
        label: 'menu.design',
        route: {
          name: 'design',
        },
      },
    ],
  },
  {
    label: 'menu.article',
    route: {
      name: 'article',
    },
  },
  {
    label: 'menu.github',
    url: 'https://github.com/ciao-chung',
  },
]