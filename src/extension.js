import {types, consts} from "@sealsc/web-extension-protocol"
import {CyanoChecker, webjsInstance} from "./checker";
import {CyanoActions} from "./actions/actions";
import {CyanoContractCaller} from "./contractCaller";
import cyanoConsts from "./consts"

class CyanoExtension extends types.ExtensionWrapper {
  constructor() {
    super()
    this.checker = new CyanoChecker(this)
    this.actions = new CyanoActions(this)
    this.contractCaller = new CyanoContractCaller(this)
  }

  load() {
    this.webjsInstance = webjsInstance
    return new types.Result(this.webjsInstance, consts.predefinedStatus.SUCCESS())
  }
}

let cyano = new CyanoExtension()

export {
  cyano,
  cyanoConsts as consts
}