const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digits = n.toString().split('');
  const numbers = digits.map((digit, index) => {
    const copy = [...digits];

    copy.splice(index, 1);

    return Number.parseInt(copy.join(''), 10);
  });

  return Math.max(...numbers);
}

module.exports = {
  deleteDigit
};
