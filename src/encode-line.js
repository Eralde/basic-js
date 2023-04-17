/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const len = str.length;

  const encoded = str
    .split('')
    .reduce(
      (acc, char, index) => {
        const {count, curr} = acc.chunk;

        if (char === curr) {
          acc.chunk = {curr, count: count + 1};
        } else {
          acc.list.push({...acc.chunk});

          acc.chunk = {curr: char, count: 1};
        }

        return acc;
      },
      {
        chunk: {curr: '', count: 0},
        list: [],
      },
    );

  const chunks = [...encoded.list, encoded.chunk];

  return chunks
    .filter(({curr, count}) => count > 0 || curr)
    .map(({curr, count}) => {
      const prefix = count > 1 ? String(count) : '';

      return `${prefix}${curr}`;
    })
    .join('');
}

module.exports = {
  encodeLine
};
