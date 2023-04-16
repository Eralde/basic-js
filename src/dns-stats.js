const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const splitToSubdomains = (domain) => {
    const chunks = domain
      .split('.')
      .map(chunk => `.${chunk}`)
      .reverse();

    const processedChunks = chunks.reduce(
      (acc, chunk) => {
        const subdomain = acc.prev + chunk;

        acc.mergedChunks.push(subdomain);
        acc.prev = subdomain;

        return acc;
      },
      {
        mergedChunks: [],
        prev: '',
      }
    );

    return processedChunks.mergedChunks;
  };

  return domains.reduce(
    (acc, domain) => {
      const subdomains = splitToSubdomains(domain);

      subdomains.forEach(subdomain => {
        acc[subdomain] = acc[subdomain] ?? 0;

        acc[subdomain]++;
      });

      return acc;
    },
    {},
  );
}

module.exports = {
  getDNSStats
};
