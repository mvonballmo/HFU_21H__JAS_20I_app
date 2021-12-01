/**
 * Finds all occurrences of any of the `searchTexts` in the given `obj` using a case-sensitive match.
 *
 * Each item in the result includes the object in the hierarchy, the name and value of the property,
 * and the matched elements from the `searchTexts`.
 *
 * @param {any} obj
 * @param {...string} searchTexts
 * @return {[{object: any, propertyName: string, value: string, matches: string[]}]}
 */
export function* findText(obj, ...searchTexts) {
  const isMatch = (needle, haystack) => haystack.includes(needle);

  yield* internalFindText(obj, isMatch, ...searchTexts);
}

/**
 * Finds all occurrences of any of the `searchTexts` in the given `obj` using a case-insensitive match.
 *
 * Each item in the result includes the object in the hierarchy, the name and value of the property,
 * and the matched elements from the `searchTexts`.
 *
 * @param {any} obj
 * @param {...string} searchTexts
 * @return {[{object: any, propertyName: string, value: string, matches: string[]}]}
 */
export function* findTextCI(obj, ...searchTexts) {
  const isMatch = (needle, haystack) => haystack.match(new RegExp(needle, "i"));

  yield* internalFindText(obj, isMatch, ...searchTexts);
}

/**
 * Finds all occurrences of any of the `searchTexts` in the given `obj` using the given `match` function.
 *
 * @param {any} obj
 * @param {function(string, string):boolean} match
 * @param {...string} searchTexts
 * @return {[{object: any, propertyName: string, value: string, matches: string[]}]}
 */
function* internalFindText(obj, match, ...searchTexts) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object") {
      yield* internalFindText(value, match, ...searchTexts);
    } else {
      const textValue = value.toString();

      const matches = searchTexts.filter(s => match(s, textValue));

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
