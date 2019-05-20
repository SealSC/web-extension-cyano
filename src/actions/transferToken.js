import {types, consts, utils} from "@sealsc/web-extension-protocol"

async function transferToken(wrapper, to, amount) {
  let contractCaller = this.extension.contractCaller
  let webjsInstance = this.extension.webjsInstance

  let decimalResult = await contractCaller.offChainCall(wrapper, 'decimals')
  if(consts.predefinedStatus.SUCCESS().code !== decimalResult.status.code) {
    return decimalResult
  }

  let tokenDecimal = decimalResult.data

  amount = utils.mulWithPow(amount, 10, tokenDecimal)
  amount = parseInt(amount)

  let accountResult = await this.extension.actions.getAccount()

  if(consts.predefinedStatus.SUCCESS().code !== accountResult.status.code) {
    return accountResult
  }

  let fromHex = webjsInstance.utils.addressToHex(accountResult.data)
  let toHex = webjsInstance.utils.addressToHex(to)

  return await contractCaller.onChainCall(
    wrapper,
    'transfer',
    [
      {type: "ByteArray", value: fromHex},
      {type: "ByteArray", value: toHex},
      {type: "Integer", value: amount}
    ]
  )
}

export {
  transferToken
}