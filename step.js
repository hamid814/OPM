require('colors');
const { getAvailableActs } = require('./act');

class Step {
  constructor(acts) {
    if (acts.length === 0) throw new Error('acts cant be empty');

    this.acts = acts;
    this.numUsed = 1;
    this.length = acts.length;
    // this.doneList = [acts[0]];
    this.isDone = false;
    this.checkDone();
  }

  checkDone() {
    this.isDone = this.length === this.numUsed;
  }

  getCurrentAct() {
    return this.acts[this.numUsed - 1];
  }

  next() {
    this.numUsed += 1;
    this.checkDone();

    return this.acts[this.numUsed - 1];
  }
}

class Steps {
  constructor() {
    this.steps = [];
    this.isAllDone = false;
    this.isChainComplete = false;
    this.memory = [];
    this.devParams = {
      maxIters: Infinity,
      currIter: 0,
    };
  }

  addStep(step) {
    this.steps.push(new Step(step));
    this.checkAllDone();
  }

  getStringOfDone() {
    return this.getDoneActs().join('');
  }

  saveChain() {
    this.memory.push(this.getStringOfDone());
    // console.log(this.getStringOfDone());
  }

  getCurrentStep() {
    return this.steps[this.steps.length - 1];
  }

  completeChain() {
    const log = false;

    log &&
      console.log(
        `-----------COMPLITION-${this.devParams.currIter}-start-----------`
          .bgGreen
      );

    this.checkIsChainComplete();

    while (!this.isChainComplete) {
      const avs = getAvailableActs(this.getDoneActs());
      log && console.log(this.getDoneActs().join(''), '->', avs);

      this.addStep(avs);

      this.checkIsChainComplete();
    }

    log &&
      console.log(
        `------------COMPLITION-${this.devParams.currIter}-end------------`
          .bgBlue
      );
  }

  destructChain() {
    // this method is called only when a chain is constructed
    const log = false;
    log &&
      console.log(
        `-----------DESTRUCTION-${this.devParams.currIter}-start-----------`
          .bgRed
      );
    log &&
      console.log(
        'before dest:',
        this.getStringOfDone(),
        this.getStringOfDone().length
      );
    log && console.log(this.steps);
    let isLastStepDone = true;

    while (isLastStepDone) {
      const poped = this.steps.pop();
      log && console.log(poped);
      isLastStepDone = this.getCurrentStep().isDone;
      //   !isLastStepDone && this.getCurrentStep().next();
    }

    this.getCurrentStep().next();

    log && console.log(this.steps);

    log &&
      console.log(
        'after dest:',
        this.getStringOfDone(),
        this.getStringOfDone().length
      );
    log &&
      console.log(
        `------------DESTRUCTION-${this.devParams.currIter}-end------------`
          .bgYellow
      );
  }

  checkIsChainComplete() {
    const avs = getAvailableActs(this.getDoneActs());

    const isComplete = avs.length == 0;

    this.isChainComplete = isComplete;

    console.log(isComplete);

    return isComplete;
  }

  getDoneActs() {
    const doneSteps = [];

    this.steps.forEach((step) => {
      doneSteps.push(step.getCurrentAct());
    });

    return doneSteps;
  }

  checkAllDone() {
    let allDone = true;

    this.steps.forEach((step) => {
      if (!step.isDone) allDone = false;
    });

    this.isAllDone = allDone;

    return allDone;
  }

  loopToGetAllDone() {
    while (
      !this.isAllDone &&
      !this.isChainComplete
      //   &&      this.devParams.currIter <= this.devParams.maxIters
    ) {
      if (this.isChainComplete) this.destructChain();
      this.completeChain();
      this.saveChain();
      this.destructChain();
      this.checkIsChainComplete();

      this.checkAllDone();

      this.devParams.currIter += 1;
    }
  }
}

module.exports = Steps;
