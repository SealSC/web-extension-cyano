import Is from "is_js";
import {types, consts} from "@sealsc/web-extension-protocol"
import * as ontologyDApi from "ontology-dapi";


const ontologyNetworkType = {
  main: 'MAIN',
}

let webjsInstance = null
class OntologyDApiWrapper {
  constructor(client) {
    client.registerClient({})
    let api = client.api
    this.provider = api.provider
    this.asset = api.asset
    this.network = api.network
    this.smartContract = api.smartContract
    this.utils = api.utils
  }
}

if(Is.chrome()) {
  webjsInstance = new OntologyDApiWrapper(ontologyDApi.client)
}

class CyanoChecker extends types.ExtensionChecker {
  async installed() {
    if (null === webjsInstance) {
      return new types.Result(false, consts.predefinedStatus.NO_EXTENSION())
    }

    let provider = await webjsInstance.provider.getProvider()
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(provider instanceof types.Status) {
      return new types.Result(false, consts.predefinedStatus.NO_EXTENSION(provider))
    } else {
      return new types.Result(true, consts.predefinedStatus.SUCCESS())
    }
  }

  async isMainnet() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    let network = await webjsInstance.network.getNetwork()
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(network instanceof types.Status) {
      return new types.Result(false, network)
    } else {
      return new types.Result(ontologyNetworkType.main === network.type, consts.predefinedStatus.SUCCESS(network))
    }
  }

  async isLogin() {
    let checkInstall = await this.installed()
    if(!checkInstall.data) {
      return checkInstall
    }

    let account = await webjsInstance.asset.getAccount()
      .catch(reason => {
        return consts.predefinedStatus.UNKNOWN(reason)
      })

    if(account instanceof types.Status) {
      return new types.Result(false, account)
    } else {
      return new types.Result(!!account, consts.predefinedStatus.SUCCESS())
    }
  }
}


export {
  CyanoChecker,
  webjsInstance,
}