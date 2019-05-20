const defGasSetting = {
  price: 500,
  limit: 100000000,
}

function buildGasSetting(setting) {
  setting.gasPrice = setting.gasPrice ? setting.gasPrice : defGasSetting.price
  setting.gasLimit = setting.gasLimit ? setting.gasLimit : defGasSetting.limit

  return setting
}

export {
  buildGasSetting,
}