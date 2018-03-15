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
}

export default api