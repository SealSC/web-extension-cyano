import {types, consts} from "@sealsc/web-extension-protocol"

async function loadContract(address) {
  let wrapper = new types.ContractWrapper("", address)
  return new types.Result(wrapper, consts.predefinedStatus.SUCCESS())
}

export {
  loadContract
}