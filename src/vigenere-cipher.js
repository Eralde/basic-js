const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  isReverse;

  constructor(isReverse) {
    this.isReverse = isReverse === false;
  }

  reverse(str) {
    return str.split('').reverse().join('');
  }

  encrypt(str, key) {
    if (typeof str !== 'string' || typeof key !== 'string') {
      throw new Error('Incorrect arguments!');
    }

    const klen = key.length;
    const base = 'a'.charCodeAt(0);

    let result = '';

    for (let i = 0, k = 0, len = str.length; i < len; ++i) {
      const char = str[i].toLowerCase();

      if (!/[a-z]/i.test(char)) {
        result += char;
        continue;
      }

      const code = char.charCodeAt(0) - base;
      const kcode = key[k].toLowerCase().charCodeAt(0) - base;

      result += String.fromCharCode(base + (code + kcode) % 26 - 32);
      k = (k + 1) % klen;
    }

    return this.isReverse ? this.reverse(result) : result;
  }

  decrypt(str, key) {
    if (typeof str !== 'string' || typeof key !== 'string') {
      throw new Error('Incorrect arguments!');
    }

    const klen = key.length;
    const base = 'a'.charCodeAt(0);

    let result = '';

    for (let i = 0, k = 0, len = str.length; i < len; ++i) {
      const char = str[i];

      if (!/[a-z]/i.test(char)) {
        result += char;
        continue;
      }

      const code = char.charCodeAt(0) - base + 32;
      const kcode = key[k].charCodeAt(0) - base;

      const shift = code < kcode ? 26 : 0;

      result += String.fromCharCode(base + (code - kcode) % 26 + shift - 32);
      k = (k + 1) % klen;
    }

    return this.isReverse ? this.reverse(result) : result;
  }
}

const directMachine = new VigenereCipheringMachine();
const reverseMachine = new VigenereCipheringMachine(false);

console.log(
  // directMachine.encrypt('Example of sequence: 1, 2, 3, 4.', 'lilkey'),
  directMachine.encrypt('Samelengthkey', 'Samelengthkey'),
);

module.exports = {
  VigenereCipheringMachine
};
