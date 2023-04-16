/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
const doesAffectPrev = (cmd) => ['--discard-prev', '--double-prev'].includes(cmd);
const doesAffectNext = (cmd) => ['--discard-next', '--double-next'].includes(cmd);

function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }

  const result = [];

  for (let i = 0, len = arr.length; i < len; ++i) {
    const item = arr[i];
    const type = typeof item;

    if (
      type === 'number'
      || type !== 'string'
    ) {
      result.push(item);
      continue;
    }

    switch (item) {
      case '--discard-next':
        i++;

        if (doesAffectPrev(arr[i + 1])) {
          i++;
        }
        continue;

      case '--discard-prev':
        result.pop();

        if (doesAffectNext(arr[i - 1])) {
          result.pop();
        }
        continue;

      case '--double-next':
        if (typeof arr[i + 1] === 'number') {
          result.push(arr[i + 1]);
        }
        continue;

      case '--double-prev':
        if (typeof arr[i - 1] === 'number') {
          result.push(result[result.length - 1]);
        }
        continue;
    }

    result.push(item);
  }

  return result;
}

module.exports = {
  transform
};
