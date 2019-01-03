import request from '@/utils/request'

export function getTradeLog() {
  return request({
    url: '/allTradeLogs',
    method: 'get'
  })
}

export function createTradeLog(data) {
  return request({
    url: '/add',
    method: 'post',
    data
  })
}

export function updateTradeLog(data) {
  return request({
    url: '/update',
    method: 'post',
    data
  })
}
