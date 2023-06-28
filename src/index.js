import {bruteForceSearch, smartSearch} from './three-primes-search.js';

const TRACE = true;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('index.js loaded');

let bruteForceBtn, smartBtn, stopBtn, p1Field, p2Field, p3Field, sumField, latestSolutionField, progressField, userStop = false;

document.addEventListener("DOMContentLoaded", function(event) {
  if (TRACE) console.log('DOMContentLoaded');
  stopBtn = document.getElementById("stop");
  stopBtn.addEventListener('click', handleStop);
  p1Field = document.getElementById("prime1");
  p2Field = document.getElementById("prime2");
  p3Field = document.getElementById("prime3");
  sumField = document.getElementById("lowestSum");
  latestSolutionField = document.getElementById("latestSolution");
  progressField = document.getElementById("progress");
  bruteForceBtn = document.getElementById("bruteForce");
  bruteForceBtn.addEventListener('click', handleBruteForce);
  smartBtn = document.getElementById("smart");
  smartBtn.addEventListener('click', handleSmart);
  
 // startSearch();
});

export function handleBruteForce() {
  const iterator = bruteForceSearch();
  
  function performCalculation() {
    const { value, done } = iterator.next();
    if (done || userStop) {
      updateUI(value);
    } else {
      updateUI(value);
      setTimeout(performCalculation, 0); // Yield control and schedule next iteration
    }
  }
  
  performCalculation();
}
export function handleSmart() {
  let solutionObj = smartSearch();
  updateUI(solutionObj);
}
function handleStop() {
  userStop = true;
}


function updateUI(value) {
  p1Field.value = value.lowp1;
  p2Field.value = value.lowp2;
  p3Field.value = value.lowp3;
  sumField.value = value.lowestSum;
  latestSolutionField.value = `latest solution:   p1=${value.p1}    p2=${value.p2}    p3=${value.p3}   sum:${value.sum}`;
  progressField.innerHTML = value.asterisks;
  // const total = 987654321 - 123456789;
  // const done = value.i - 123456789;
  // progressField.innerHTML = `${done} examined out of ${total}`;
}