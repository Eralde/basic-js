/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (typeof value === 'undefined') {
      this.chain.push('');
    } else {
      this.chain.push(value);
    }

    return this;
  },
  removeLink(position) {
    if (
      typeof position !== 'number'
      || position < 1
      || position > this.chain.length
    ) {
      this.chain = [];

      throw new Error('You can\'t remove incorrect link!');
    }

    this.chain.splice(position - 1, 1);

    return this;
  },
  reverseChain() {
    this.chain.reverse();

    return this;
  },
  finishChain() {
    const chainStr = this.chain
      .map(item => `( ${item} )`)
      .join('~~');

    this.chain = [];

    return chainStr;
  },
};

module.exports = {
  chainMaker
};
