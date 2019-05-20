let ContractInvokeExtraInfo = function (gasPrice, gasLimit) {
  this.gasPrice = gasPrice
  this.gasLimit = gasLimit
}

let OriginalAssets = function (name) {
  this.name = name
}

export default {
  ContractInvokeExtraInfo,
  OriginalAssets,
}