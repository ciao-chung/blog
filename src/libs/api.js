import request from 'libs/request.js'
request()

const api =  {
  find: (apiName) => {
    let result = api
    for(const node of apiName.split('.')) {
      result = result[node]
    }

    if(!result) {
      result = () => {
        new Promise((resolve, reject) => {
          reject()
        })
      }
    }
    return result
  },
  Config: (type) => {
    return $.request({
      url: `/config/${type}`,
      type: 'GET',
      api: `config`,
    })
  },
  FlatTree: (branch) => {
    return $.request({
      url: `/tree/flat/${branch}`,
      type: 'GET',
      api: `branch`,
    })
  },
  Article: (params) => {
    return $.request({
      url: `/article`,
      data: params,
      type: 'GET',
      api: `article`,
    })
  },
  ArticleDetail: (id) => {
    return $.request({
      url: `/article/${id}`,
      type: 'GET',
      api: `article.detail`,
    })
  },
  ArticleContent: (id) => {
    return $.request({
      url: `/article/${id}/content`,
      type: 'GET',
      api: `article.get.content`,
    })
  },
  ArticleUnlock: (id, params) => {
    return $.request({
      url: `/article/${id}/private`,
      type: 'GET',
      data: params,
      api: `article.unlock`,
    })
  },
  Post: (code) => {
    return $.request({
      url: `/post/${code}`,
      type: 'GET',
      api: `post`,
    })
  },
  Banner: (position) => {
    return $.request({
      url: `/banner/${position}`,
      type: 'GET',
      api: `banner`,
    })
  },
  Design: (params) => {
    return $.request({
      url: `/design`,
      type: 'GET',
      data: params,
      api: `design`,
    })
  },
  DesignDetail: (id) => {
    return $.request({
      url: `/design/${id}`,
      type: 'GET',
      api: `design.detail`,
    })
  },
}

export default api