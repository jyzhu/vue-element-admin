
export const insuranceTypeMap = {
  YIWAI: '意外险',
  ZHONGJI: '重疾险',
  YILIAO: '医疗险',
  SHOUXIAN: '寿险',
  CAICHAN: '财产险',
  CHEXIAN: '车险'
}

export const receivedStatusMap = {
  NOT_RECEIVED: '未收',
  RECEIVED: '已收'
}

export const receivePaymentTypeMap = {
  REPAYMENT_PRINCIPAL_INTEREST: '到期还本付息',
  AVERAGE_CAPITAL: '等额本金',
  AVERAGE_CAPITAL_PLUS_INTEREST: '等额本息',
  INTEREST_PAID_ON_MONTHLY_BASIS: '每月还息，到期还本息'
}

export const dateDimensionMap = {
  DAY: '日',
  MONTH: '月'
}

export const formatterCollections = {
  formatterInsuranceType: function(row, column) {
    if (row[column.property]) {
      return insuranceTypeMap[row[column.property]]
    }
  },

  formatterStatus: function(row, column) {
    if (row[column.property]) {
      return receivedStatusMap[row[column.property]]
    }
  },

  formatterNumber: function(row, column) {
    const realVal = parseFloat(row[column.property]).toFixed(2)
    return parseFloat(realVal)
  },

  formatterPercentage: function(row, column) {
    if (row[column.property]) {
      const realVal = parseFloat(row[column.property] * 100).toFixed(2)
      return realVal + '%'
    }
  }
}
