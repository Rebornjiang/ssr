import request from '@/utils/request'



export function getArticles() {
  return request({
    method: 'GET',
    url: '/api/v1/topics'
  })
}