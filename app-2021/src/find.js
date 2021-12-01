/**
 *
 * @param {any} obj
 * @param {...string} searchTexts
 * @return {[{object: any, propertyName: string, value: string, searchText: string}]}
 */
export function* findText(obj, ...searchTexts) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object") {
      yield* findText(value, ...searchTexts);
    } else {
      const textValue = value.toString();

      for (const searchText of searchTexts) {
        if (textValue.includes(searchText)) {
          yield {
            object: obj,
            propertyName: key,
            value: textValue,
            searchText,
          };
        }
      }
    }
  }
}
