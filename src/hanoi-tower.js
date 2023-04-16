const { NotImplementedError } = require('../extensions/index.js');

/**
 * Calculate turns number and time (in seconds) required
 * to solve puzzle
 * 
 * @param {Number} disks number of disks
 * @param {Number} turnsSpeed speed (in turns/hour)
 * @return {Object} object with props turns (number of turns)
 * and seconds (time in seconds)
 *
 * @example
 * 
 * calculateHanoi(9, 4308) => { turns: 511, seconds: 427 }
 *
 */
const hanoiTurns = {};

const getHanoiTurns = (diskNumber) => {
  if (diskNumber === 1) {
    return 1;
  }

  if (hanoiTurns[diskNumber]) {
    return hanoiTurns[diskNumber];
  }

  const turns = getHanoiTurns(diskNumber - 1) * 2 + 1;

  hanoiTurns[diskNumber] = turns;

  return turns;
}

function calculateHanoi(disksNumber, turnsSpeed) {
  const turns = getHanoiTurns(disksNumber);
  const seconds = Math.floor(turns / (turnsSpeed / 3600));

  return {turns, seconds};
}

module.exports = {
  calculateHanoi
};
