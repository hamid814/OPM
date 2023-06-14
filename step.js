class Step {
  constructor(acts) {
    this.acts = acts;
    this.numUsed = 1;
    this.length = acts.length;
    this.done = false;
    this.checkDone();
  }

  checkDone() {
    this.done = this.length === this.numUsed;
  }

  getCurrent() {
    return this.acts[this.numUsed - 1];
  }

  next() {
    this.numUsed += 1;
    this.checkDone();

    return this.acts[this.numUsed - 1];
  }
}

module.exports = Step;
