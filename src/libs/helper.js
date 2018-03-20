import queryString from 'qs'

class Helper {
  queryToJson(query) {
    let json = {}
    json.page = !query.page ? 1 : query.page
    json.search = queryString.parse(query.search, { encode: false })
    json.sort = queryString.parse(query.sort, { encode: false })
    if(query.per_page) json.per_page = query.per_page
    return json
  }

  jsonToQuery(json) {
    return queryString.stringify(json)
  }

  isUrl(string) {
    const _patten = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return new RegExp(_patten).test(string)
  }
}

export default new Helper()