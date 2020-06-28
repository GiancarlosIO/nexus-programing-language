const tap = require('lodash/tap');

const pipe = (...funcs) => (value) =>
  funcs.reduce((value, func) => func(value), value);

const log = (value) => tap(value, console.log);

/** returns the first element */
const peek = (array) => array[0];

/**
 * Deletes the first element and returns that deleted element
 */
const pop = (array) => array.shift();

module.exports = { pipe, log, peek, pop, tap };
