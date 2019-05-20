import {types, consts} from "@sealsc/web-extension-protocol";
import {webjsInstance} from "../checker";

async function getAccount() {
  let account = await webjsInstance.asset.getAccount()
    .catch(reason => {
      return consts.predefinedStatus.UNKNOWN(reason)
    })

  if(account instanceof types.Status) {
    return new types.Result(null, account)
  }


  return !!account ?
    new types.Result(account, consts.predefinedStatus.SUCCESS()) :
    new types.Result(null, consts.predefinedStatus.NOT_LOGIN())
}

export {
  getAccount
}