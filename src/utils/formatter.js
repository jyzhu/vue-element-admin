
export const insuranceTypeMap = {
  YIWAI: '意外险',
  ZHONGJI: '重疾险',
  YILIAO: '医疗险',
  SHOUXIAN: '寿险',
  CAICHAN: '财产险',
  CHEXIAN: '车险'
}

export const formatterCollections = {
  formatterInsuranceType: function(row, column) {
    if (row[column.property]) {
      return insuranceTypeMap[row[column.property]]
    }
  }
}
