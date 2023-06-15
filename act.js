require('colors');
const mainActs = require('./mainActs');

const getAvailableActs = (doneSteps) => {
  // done step = ['a', 'b', ...]
  if (!doneSteps) throw new Error('pass an array of done steps');

  const log = false;

  log && console.log('---loging from getAvailables---'.bgMagenta);
  log && console.log(doneSteps);

  let acts = [
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

  log && console.log(acts);
  const availables = [];

  acts = acts.map((act) => {
    act.pre = act.pre.filter((item) => doneSteps.indexOf(item) == -1);
    return act;
  });

  acts.forEach((act) => {
    if (doneSteps.indexOf(act.name) != -1) return;
    act.pre.length == 0 && availables.push(act);
  });

  log && console.log(availables);

  return availables.map((act) => act.name);
};

module.exports = { getAvailableActs };
