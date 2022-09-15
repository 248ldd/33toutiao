import request from '@/utils/request'

/**
 *
 * @param {*} q 搜索关键字
 * @returns  Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param {Number} page 分页的页数(非必填 默认值1)
 * @param {Number} per_page 每一页的数量
 * @param {String} q 搜索关键字
 * @returns Promise
 */
export const getResultsAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
