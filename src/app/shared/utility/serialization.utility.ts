import * as _ from "lodash";

export class SerializationUtility {
  public static ObjectToKeyValueString(obj: object, encodeValue: boolean = false): string {
    let keyValuePair: Array<any>;
    if (!obj) {
      return '';
    }
    keyValuePair = _.map(obj, (value, key):any => {
      let v : any = value;
      if (encodeValue == true) {
        v = encodeURIComponent(value);
      }

      if (value != "" || value != _.isNil && value == 0) {
        return `${key}=${value}`;
      }
    });
    return keyValuePair.join("&");
  }
}
