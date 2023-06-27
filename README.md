# three-primes-problem

The problem is to find the set of 3 prime numbers which together use the digits 1 through 9 exactly once each, and sum to the lowest total.

This code solves the problem in the most brute force way, iterating from 123456789 (the smallest set of digits that could work) and 987654321 (the largest). I will solve the problem in more efficient ways later, but this was instructive in its own regard, because I had to find fast ways of reducing the number of cases, and I also wanted the UI to remain responsive so I needed to use an synchronous approach.

I think the current code is about the limit of what I can do with this approach; the run time on my 2017 iMac is down from 600 seconds (the first version that worked) to a little less than 40 seconds now. The largest single time sink now is converting a number to a string! There is just no way around the fact that we are performing close to a billion iterations!

