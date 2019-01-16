
export function formatterPercentage(row, column) {
  debugger
  if (row[column.property]) {
    return row[column.property] * 100 + '%'
  }
}
