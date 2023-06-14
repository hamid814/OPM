const acts = [
  {
    name: 'a',
    pre: [],
    time: 4,
  },
  {
    name: 'b',
    pre: [],
    time: 5,
  },
  {
    name: 'c',
    pre: [],
    time: 8,
  },
  {
    name: 'd',
    pre: ['a'],
    time: 4,
  },
  {
    name: 'e',
    pre: ['a', 'b'],
    time: 3,
  },
  {
    name: 'f',
    pre: ['b'],
    time: 3,
  },
  {
    name: 'g',
    pre: ['e', 'd'],
    time: 5,
  },
  {
    name: 'h',
    pre: ['f'],
    time: 7,
  },
  {
    name: 'i',
    pre: ['h', 'g'],
    time: 1,
  },
  {
    name: 'j',
    pre: ['i'],
    time: 7,
  },
  {
    name: 'k',
    pre: ['c', 'j'],
    time: 4,
  },
];

module.exports = acts;
