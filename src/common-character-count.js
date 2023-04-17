/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const charsS1 = s1
    .split('')
    .reduce(
      (acc, char) => ({...acc, [char]: (acc[char] ? acc[char] + 1 : 1)}),
      {},
    );

  const count = s2
    .split('')
    .reduce(
      (acc, char) => {
        if (char in charsS1 && charsS1[char] > 0) {
          charsS1[char]--;

          return acc + 1;
        }

        return acc;
      },
      0,
    );

  return count;
}

module.exports = {
  getCommonCharacterCount
};
