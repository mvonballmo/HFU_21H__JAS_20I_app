/**
 *
 * @param {any} obj
 * @param {...string} searchTexts
 * @return {[{object: any, propertyName: string, value: string, matches: string[]}]}
 */
export function* findText(obj, ...searchTexts) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object") {
      yield* findText(value, ...searchTexts);
    } else {
      const textValue = value.toString();

      const matches = searchTexts.filter(s => textValue.includes(s));

      if (matches.length > 0) {
        yield {
          object: obj,
          propertyName: key,
          value: textValue,
          matches,
        };
      }
    }
  }
}
