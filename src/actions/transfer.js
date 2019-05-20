import Is from "is_js";
import {types, consts, utils} from "@sealsc/web-extension-protocol"
import ontologyTypes from "../types";
import ontologyConsts from "../consts";

async function transfer(to, amount, extra) {
  if(!(extra instanceof ontologyTypes.OriginalAssets)) {
    return new types.Result(null, consts.predefinedStatus.BAD_PARAM(extra))
  }

  if(ontologyConsts.originalToken.ONG === extra) {
    if(!Is.decimal(amount)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(amount))
    }

    amount = utils.mulWithPow(amount, 1000000000)
  } else {
    if(!Is.integer(amount)) {
      return new types.Result(null, consts.predefinedStatus.BAD_PARAM(amount))
    }
  }

  amount = parseInt(amount)

  let result = await this.extension.webjsInstance.asset
    .send(
      {to: to, asset: extra.name, amount: parseInt(amount)}
    )
    .catch(reason => {
      return consts.predefinedStatus.UNKNOWN(reason)
    })

  if(result instanceof types.Status) {
    return new types.Result(null, result)
  } else {
    return new types.Result(result, consts.predefinedStatus.SUCCESS(result))
  }

}

export {
  transfer
}