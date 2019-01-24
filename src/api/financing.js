import request from '@/utils/request'

export function listFixedIncomeRecords() {
  return request({
    url: '/fixedincome/list',
    method: 'get'
  })
}

export function getFixedIncomeSummary() {
  return request({
    url: '/fixedincome/summary',
    method: 'get'
  })
}

export function createFixedIncomeRecord(data) {
  return request({
    url: '/fixedincome/add',
    method: 'post',
    data
  })
}

export function updateFixedIncomeRecord(data) {
  return request({
    url: '/fixedincome/update',
    method: 'post',
    data
  })
}

export function deleteFixedIncomeRecord(id) {
  return request({
    url: '/fixedincome/' + id,
    method: 'delete'
  })
}

export function listReceivedPaymentDetails(id) {
  return request({
    url: '/fixedincome/receivedPayment/' + id,
    method: 'get'
  })
}
export function updateReceivedPaymentTradeLog(data) {
  return request({
    url: '/fixedincome/receivedPayment',
    method: 'post',
    data
  })
}

export function deleteReceivedPaymentTradeLog(id) {
  return request({
    url: '/fixedincome/receivedPayment/' + id,
    method: 'delete'
  })
}

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

export function listAllFunds() {
  return request({
    url: '/fund/listAllFunds',
    method: 'get'
  })
}

export function listAllFundInvestmentRecords() {
  return request({
    url: '/fund/listAllFundInvestmentRecords',
    method: 'get'
  })
}

export function listAllFundInvestmentTradeLog(id) {
  return request({
    url: '/fund/listAllFundInvestmentTradeLog/' + id,
    method: 'get'
  })
}

export function createFundInvestmentTradeLog(data) {
  debugger
  return request({
    url: '/fund/investmentRecord/trade/add',
    method: 'post',
    data
  })
}

export function updateFundInvestmentTradeLog(data) {
  debugger
  return request({
    url: '/fund/investmentRecord/trade/update',
    method: 'post',
    data
  })
}

export function deleteFundInvestmentTradeLog(id) {
  debugger
  return request({
    url: '/fund/investmentRecord/trade/' + id,
    method: 'delete'
  })
}

export function getFundInvestmentRecord(id) {
  return request({
    url: '/fund/investmentRecord/' + id,
    method: 'get'
  })
}

export function loginByUsername(username, password) {
  debugger
  const data = {
    username,
    password
  }
  return request({
    url: '/secure/login',
    method: 'post',
    data
  })
}
