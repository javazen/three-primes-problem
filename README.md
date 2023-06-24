# three-primes-problem

The problem is to find the set of 3 prime numbers which together use the digits 1 through 9 exactly once each, and sum to the lowest total.

This code solves the problem in the most brute force way, iterating from 123456789 (the smallest set of digits that could work) and 987654321 (the largest). I will solve the problem in more efficient ways later, but this was instructive in its own regard, because I had to find fast ways of reducing the number of cases, and I also wanted the UI to remain responsive so I needed to use an synchronous approach.

