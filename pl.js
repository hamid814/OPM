require('colors');
const acts = require('./mainActs.js');
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./configs.txt'),
});

let lineNum = 0;
let maxNum = 0;
let totalEff = 0;
const STATION_TIME = 27;
let maxEfficiency = 0;

lineReader.on('line', function (line) {
  const pl = new ProductionLine(line);
  maxEfficiency = Math.max(pl.efficiency, maxEfficiency);

  totalEff += pl.efficiency;

  // console.log(pl.efficiency);

  if (pl.efficiency > 0.9344444444444444) {
    // console.log(pl.actNames.join(''));
    console.log(pl.stations.length);
    maxNum += 1;
  }
  lineNum += 1;
});

lineReader.on('close', function () {
  console.log('all done, son'.rainbow);
  console.log(maxNum);
  console.log('max-Eff:', String(maxEfficiency).magenta);
  console.log('avg-Eff:', String(totalEff / lineNum).magenta);
});

const getAct = (actName) => {
  return acts.filter((act) => act.name == actName)[0];
};

class Station {
  constructor() {
    this.remainingTime = STATION_TIME;
    this.acts = []; // [ {name: 'a', time: 4, ...}, ... ]
  }

  addAct(act) {
    this.remainingTime -= act.time;

    this.acts.push(act);

    if (this.remainingTime < 0) {
      throw new Error('Station time limit exeeded');
    }
  }
}

class ProductionLine {
  constructor(config) {
    this.stations = [new Station()];
    this.actNames = config.split('');
    this.efficiency = 1;

    this.actNames.forEach((actName) => {
      this.addActToStations(actName);
    });

    this.clacEfficiency();
  }

  get lastStationRemainginTime() {
    return this.stations[this.stations.length - 1].remainingTime;
  }

  get lastStation() {
    return this.stations[this.stations.length - 1];
  }

  addActToStations(actName) {
    const act = getAct(actName);

    if (this.lastStationRemainginTime < act.time) {
      this.stations.push(new Station());
      this.lastStation.addAct(act);
    } else {
      this.lastStation.addAct(act);
    }
  }

  clacEfficiency() {
    const fullTime = this.stations.length * STATION_TIME;
    let allRemainingTime = 0;

    this.stations.forEach((s) => (allRemainingTime += s.remainingTime));

    this.efficiency = 1 - allRemainingTime / fullTime;
  }
}
