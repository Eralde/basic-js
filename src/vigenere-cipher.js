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
  table;
  base;

  constructor(isReverse) {
    this.isReverse = isReverse === false;
    this.base = 'A'.charCodeAt(0);
    this.alpLen = 26;

    // pre-generate table that for given [x][y] returns encrypted char
    this.table = [];

    for (let i = 0; i < this.alpLen; i++) {
      this.table[i] = [];

      for (let j = 0; j < this.alpLen; j++) {
        const code = ((i + j) % this.alpLen) + this.base;

        this.table[i][j] = String.fromCharCode(code);
      }
    }
  }

  listToString(xs) {
    return this.isReverse
      ? xs.reverse().join('')
      : xs.join('');
  }

  // ... Machines encrypt and decrypt only latin alphabet
  // (all other symbols remain unchanged).
  shouldEncrypt(char) {
    const code = char.charCodeAt(0) - this.base;

    return code >= 0 && code < this.alpLen;
  }

  encrypt(str, key) {
    if (typeof str !== 'string' || typeof key !== 'string') {
      throw new Error('Incorrect arguments!');
    }

    const keyU = key.toUpperCase();
    const strU = str.toUpperCase();

    const klen = key.length;
    const result = [];

    for (let i = 0, k = 0, len = str.length; i < len; ++i) {
      const char = strU[i];

      const x = char.charCodeAt(0) - this.base;
      const y = keyU[k % klen].charCodeAt(0) - this.base;

      if (this.shouldEncrypt(char)) {
        result.push(this.table[x][y]);
        k++;
      } else {
        result.push(char);
      }
    }

    return this.listToString(result);
  }

  decrypt(str, key) {
    if (typeof str !== 'string' || typeof key !== 'string') {
      throw new Error('Incorrect arguments!');
    }

    const keyU = key.toUpperCase();
    const strU = str.toUpperCase();

    const klen = key.length;
    const result = [];

    for (let i = 0, k = 0, len = str.length; i < len; ++i) {
      const char = strU[i];

      if (this.shouldEncrypt(char)) {
        const y = keyU[k % klen].charCodeAt(0) - this.base;
        const idx = this.table[y].indexOf(char);

        result.push(this.table[0][idx]);
        k++;
      } else {
        result.push(char);
      }
    }

    return this.listToString(result);
  }
}

module.exports = {
  VigenereCipheringMachine
};
