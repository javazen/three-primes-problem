const TRACE = true;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('three-primes-search.js loaded');

export function* longRunningCalculation() {
  let sum, lowestSum = 1000000000;
  let originalTime = Date.now();
  const badEndingDigitsStr = ['2', '4', '5', '6', '8'];
  let solutionArray = [];
  let obj = {p1:'', p2:'', p3:'', sun:'', lowestSum:'', lowp1:'', lowp2:'', lowp3:'', asterisks:''};
  for (let i=123456791; i<=987654319; i++) {
    if (i % 10000000 === 0) {
      obj.i = i;
      obj.asterisks += '*';
      yield obj; // Yield result to update UI after every 10 million iterations
    }
    let str = i.toString();
    // fail fast in many cases
    // last digit of each 3-digit number can't end with 24568 (would be a composite)
    if (badEndingDigitsStr.includes(str[2]))
      continue;
    if (badEndingDigitsStr.includes(str[5]))
      continue;
    if (badEndingDigitsStr.includes(str[8]))
      continue;
    // solutions do not include 0
    if (str.includes('0'))
      continue;
    // when a>b, abc > bac, so skip the larger one
    if ( (str[0] > str[1]) || (str[3] > str[4]) || (str[6] > str[7]) )
      continue;

    let aDigitArray = Array.from(str, Number);

    // make sure we use each digit once
    let aDigitSet = new Set(aDigitArray);
    if (aDigitSet.size != aDigitArray.length)
      continue;
    
    // create the 3-digit numbers and check that they are prime
    let n1 = aDigitArray[2] + 10*aDigitArray[1] + 100*aDigitArray[0];
    let n2 = aDigitArray[5] + 10*aDigitArray[4] + 100*aDigitArray[3];
    let n3 = aDigitArray[8] + 10*aDigitArray[7] + 100*aDigitArray[6];
    if (!isPrime(n1) || !isPrime(n2) || !isPrime(n3))
      continue;
    
    // we have found a solution!
    sum = n1 + n2 + n3;
    obj.p1 = n1;
    obj.p2 = n2;
    obj.p3 = n3;
    obj.sum = sum;
    if (sum < lowestSum) {
      lowestSum = sum;
      obj.lowestSum = lowestSum;
      obj.lowp1 = n1;
      obj.lowp2 = n2;
      obj.lowp3 = n3;
    }

    // make sure we don't already have this but with the primes permuted
    // const goodArray = [n1, n2, n3];
    const goodArraySorted = [n1, n2, n3].sort(function(a, b) {return a - b;});
    const goodObj = {p1: goodArraySorted[0], p2: goodArraySorted[1], p3: goodArraySorted[2]};
    if (isDuplicate(solutionArray, goodObj))
      continue;
    
    // Hooray, we have a valid solution!
    // save the solution to eliminate duplicates
    solutionArray.push(goodObj);

    if (TRACE) console.log('p1= ' + n1 + ' p2= ' + n2 + ' p3= ' + n3 + ' --> sum= ' + sum);

    // Also yield result to update UI when a solution is found
    obj.i = i;
    yield obj;
  }
  if (TRACE) console.log ('total time= ' + (Date.now()-originalTime));
  return obj;

  // customized for this project, where n is between 100 and 999 and 
  // we have already removed n which ends in 2 and 5
  function isPrime(n) {
    if (n % 3 === 0)
      return false;
    if (n % 7 === 0)
      return false;
    if (n % 11 === 0)
      return false;
    if (n % 13 === 0)
      return false;
    if (n % 17 === 0)
      return false;
    if (n % 19 === 0)
      return false;
    if (n % 23 === 0)
      return false;
    if (n % 29 === 0)
      return false;
    if (n % 31 === 0)
      return false;
    
    return true;
  }

  function isDuplicate(solutionArray, goodObj) {
    for (let i=0; i<solutionArray.length; i++) {
      const aSolution = solutionArray[i];
      if (aSolution.p1 === goodObj.p1 && aSolution.p2 === goodObj.p2 && aSolution.p3 === goodObj.p3)
        return true;
    }
    return false;
  }

}

