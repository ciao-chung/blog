export default {
  state: {
    breadcrumb: null,
  },
  mutations: {
    'breadcrumb.set': (state, data) => {
      state.breadcrumb = data
    },
  },
  actions: {
    'breadcrumb.set': (context, data) => {
      context.commit('breadcrumb.set', data)
    },
  },
  getters: {
    breadcrumb: (state) => {
      return state.breadcrumb
    },
  },
}