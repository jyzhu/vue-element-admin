import request from '@/utils/request'

export function listAllGuaranteeSlips() {
  return request({
    url: '/insurance/all',
    method: 'get'
  })
}

export function createGuaranteeSlip(data) {
  return request({
    url: '/insurance/add',
    method: 'post',
    data
  })
}

export function updateGuaranteeSlip(data) {
  return request({
    url: '/insurance/update',
    method: 'post',
    data
  })
}

export function deleteGuaranteeSlip(id) {
  return request({
    url: '/insurance/' + id,
    method: 'delete'
  })
}
