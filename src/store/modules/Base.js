import site from 'static/config/site.js'

export default {
  state: {
    loading: false,
  },
  mutations: {
    'loading': (state, status) => {
      state.loading = status
    },
  },
  actions: {
    'loading': (context, status = true) => {
      context.commit('loading', status)
    },
  },
  getters: {
    site: () => {
      return site
    },
    loading: (state) => {
      return state.loading
    },
  },
}
