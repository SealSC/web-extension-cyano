import {types, consts} from "@sealsc/web-extension-protocol"
import Is from "is_js";
import {buildGasSetting} from "./utils";
import ontologyTypes from "./types";

class CyanoContractCaller extends types.ExtensionContractCaller {
  constructor(extension) {
    super(extension)
  }
  async onChainCall(wrapper, methodName, param, extra) {
    let contractApi = this.extension.webjsInstance.smartContract
    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    } else if(0 === param.length) {
      param = []
    }

    if(!extra) {
      extra = new ontologyTypes.ContractInvokeExtraInfo()
    } else {
      if(!(extra instanceof ontologyTypes.ContractInvokeExtraInfo)) {
        return new types.Result(null, consts.predefinedStatus.BAD_PARAM(extra))
      }
    }

    let gasSetting = buildGasSetting(extra)

    let result = await contractApi
      .invoke({
          scriptHash:wrapper.address,
          operation: methodName,
          args: param,
          gasPrice: gasSetting.gasPrice,
          gasLimit: gasSetting.gasLimit,
        })
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(result instanceof types.Status) {
      return new types.Result(null, result)
    } else {
      return new types.Result(result.transaction, consts.predefinedStatus.SUCCESS(result))
    }
  }

  async offChainCall(wrapper, methodName, param = []) {
    let contractApi = this.extension.webjsInstance.smartContract

    if(!Is.array(param)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(param))
    }

    let result = await contractApi
      .invokeRead({
        scriptHash: wrapper.address,
        operation: methodName,
        args: param
      })
      .catch(reason=>{
        return new types.Result(null, consts.predefinedStatus.UNKNOWN(reason))
      })

    if(result instanceof types.Status) {
      return new types.Result(null, result)
    } else {
      return new types.Result(result, consts.predefinedStatus.SUCCESS())
    }
  }
}

export {
  CyanoContractCaller
}