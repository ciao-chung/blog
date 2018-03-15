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
  RenewToken: () => {
    return $.request({
      url: `/member/token`,
      type: 'PUT',
      api: `member.renew.token`,
    })
  },
}

export default api