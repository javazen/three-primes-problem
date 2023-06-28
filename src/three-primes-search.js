const TRACE = true;
const DEBUG = false;

// In the unlikely event this is run in a REALLY old browser that does not support console.log
if (!window.console) { window.console = { log: function(){} }; }

if (TRACE) console.log('three-primes-search.js loaded');

export function* bruteForceSearch() {
  let sum, lowestSum = 1000000000;
  let listOfPrimes = findAllSuitableThreeDigitPrimes();
  let originalTime = Date.now();
  let solutionArray = [];
  let obj = {p1:'', p2:'', p3:'', sum:'', lowestSum:'', lowp1:'', lowp2:'', lowp3:'', asterisks:''};
  for (let i=127463589; i<=983647521; i++) {
    let str = '' + i;
    // fail fast in many cases
    // last digit of each 3-digit number can't end with 24568 (would be a composite)
    if ('2' === str[2] || '4' === str[2] || '5' === str[2] || '6' === str[2] || '8' === str[2])
      continue;
    if ('2' === str[5] || '4' === str[5] || '5' === str[5] || '6' === str[5] || '8' === str[5])
      continue;
    if ('2' === str[8] || '4' === str[8] || '5' === str[8] || '6' === str[8] || '8' === str[8])
      continue;

      // Give the UI a chance to update
    if (i % 20000000 === 0) {
      obj.i = i;
      obj.asterisks += '*';
      yield obj; // Yield result to update UI after every 10 million iterations
    }

    // solutions cannot include 0
    if ('0' === str[1] || '0' === str[2] || '0' === str[3] || '0' === str[4] || '0' === str[5] || '0' === str[6] || '0' === str[7] || '0' === str[8])
      continue;
    
    let aDigitArray = Array.from(str, Number);

    // make sure we use each digit once
    let aDigitSet = new Set(aDigitArray);
    if (aDigitSet.size != 9)
      continue;
    

    // create the 3-digit numbers and check that they are prime
    let n1 = aDigitArray[2] + 10*aDigitArray[1] + 100*aDigitArray[0];
    let n2 = aDigitArray[5] + 10*aDigitArray[4] + 100*aDigitArray[3];
    let n3 = aDigitArray[8] + 10*aDigitArray[7] + 100*aDigitArray[6];
    if (!listOfPrimes.includes(n1) || !listOfPrimes.includes(n2) || !listOfPrimes.includes(n3))
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

    if (DEBUG) console.log('p1= ' + n1 + ' p2= ' + n2 + ' p3= ' + n3 + ' --> sum= ' + sum);

    // Also yield result to update UI when a solution is found
    obj.i = i;
    yield obj;
  }
  if (TRACE) console.log ('total time= ' + (Date.now()-originalTime));
  return obj;

  function isDuplicate(solutionArray, goodObj) {
    for (let i=0; i<solutionArray.length; i++) {
      const aSolution = solutionArray[i];
      if (aSolution.p1 === goodObj.p1 && aSolution.p2 === goodObj.p2 && aSolution.p3 === goodObj.p3)
        return true;
    }
    return false;
  }

}

export function smartSearch() {
  let lowestSum = 1000000000;
  let listOfPrimes = findAllSuitableThreeDigitPrimes();
  let originalTime = Date.now();
  let solutionArray = [];
  let obj = {p1:'', p2:'', p3:'', sum:'', lowestSum:'', lowp1:'', lowp2:'', lowp3:'', asterisks:''};

  for (let i=0; i<listOfPrimes.length; i++) {
    let n1 = listOfPrimes[i];
    let s1 = n1.toString();
    for (let j=i+1; j<listOfPrimes.length; j++) {
      // make sure there are no duplicate digits
      let n2 = listOfPrimes[j];
      let s2 = n2.toString();
      let s12 = s1 + s2;
      let arr12 = Array.from(s12, String);
      let set12 = new Set(arr12);
      if (set12.size != arr12.length) 
        continue;
      
      for (let k=j+1; k<listOfPrimes.length; k++) {
        let n3 = listOfPrimes[k];
        let s3 = n3.toString();
        let s123 = s1 + s2 + s3;
        let arr123 = Array.from(s123, String);
        let set123 = new Set(arr123);
        if (set123.size === arr123.length) {
          solutionArray.push([n1, n2, n3]);
        }
      }
    }
  }

  // See which of the solutions is best:
  for (let i=0; i<solutionArray.length; i++) {
    let aSolution = solutionArray[i];
    let sum = aSolution[0] + aSolution[1] + aSolution[2];
    if (sum < lowestSum) {
      obj.lowp1 = aSolution[0];
      obj.lowp2 = aSolution[1];
      obj.lowp3 = aSolution[2];
      obj.lowestSum = sum;
      lowestSum = sum;
    }
  }

  if (TRACE) console.log ('total time= ' + (Date.now()-originalTime));
  return obj;
}

// sieve for primes but also remove any prime with a 0 or repeating digit in it, 
// or of pattern abc where a > b
export function findAllSuitableThreeDigitPrimes() {
  let primesArray = [];
  for (let i=101; i<=986; i++) {
    let str = '' + i;
    // fail fast in many cases
    // last digit of each 3-digit number can't end with 24568 (would be a composite)
    if ('2' === str[2] || '4' === str[2] || '5' === str[2] || '6' === str[2] || '8' === str[2])
      continue;
    if ('2' === str[5] || '4' === str[5] || '5' === str[5] || '6' === str[5] || '8' === str[5])
      continue;
    if ('2' === str[8] || '4' === str[8] || '5' === str[8] || '6' === str[8] || '8' === str[8])
      continue;

    // solutions cannot include 0
    if ('0' === str[1] || '0' === str[2] || '0' === str[3] || '0' === str[4] || '0' === str[5] || '0' === str[6] || '0' === str[7] || '0' === str[8])
      continue;

    let aDigitArray = Array.from(str, Number);

    // make sure we use each digit once
    let aDigitSet = new Set(aDigitArray);
    if (aDigitSet.size != aDigitArray.length)
      continue;
    
    // create the 3-digit numbers and check that they are prime
    // let n1 = aDigitArray[2] + 10*aDigitArray[1] + 100*aDigitArray[0];
    if (!isPrime(i))
      continue;
    
    // we have found a solution!
    primesArray.push(i);
  }

  return primesArray;

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


}
