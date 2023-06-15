const Steps = require('./step');
const { getAvailableActs } = require('./act');

const memory = {
  cases: [],
};

const app = () => {
  const steps = new Steps();

  const firstAvailables = getAvailableActs([]);
  steps.addStep(firstAvailables);

  steps.loopToGetAllDone();
  console.log(steps.memory.length);
  console.log(steps);

  // console.log(getAvailableActs(['a', 'b', 'c', 'd', 'e', 'f', 'h']));

  // console.log(steps);
  // steps.completeChain();
  // console.log(steps.getStringOfDone());
  // steps.destructChain();
  // console.log(steps.getStringOfDone());
  // steps.completeChain();
  // console.log(steps.getStringOfDone());
  // steps.destructChain();
  // console.log(steps.getStringOfDone());

  /*
  // Get availables
 
  // Add first available steps to the stepsList

  // Check if its the end of the stepsList
    // If Yes:
    // Come back step by step to find Not-done steps
      // If there is Not-done step, proceed w/ that
      // If there is no Not-done step left ( all steps are done ), close app()

    // If No:
    // Choose one act and proceed to next step
  */
};

app();
