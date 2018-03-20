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
}

export default api