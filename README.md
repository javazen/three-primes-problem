# three-primes-problem

The problem is to find the set of 3 prime numbers which together use the digits 1 through 9 exactly once each, and sum to the lowest total.

My original attempt ("Brute Force") simply iterates from 123456789 (the smallest set of digits 1 through 9) and 987654321 (the largest). I later solved the problem in a more efficient way, but this was instructive in its own regard, because I had to find fast ways of reducing the number of cases, and I also wanted the UI to remain responsive so I needed to use an asynchronous approach.

I think the current "Brute Force" code is about the limit of what I can do with this approach; the run time on my 2017 iMac is down from 600 seconds (the first version that worked) to about 15 seconds now. The largest single time sink now is the for-loop itself (about 15% of total time)! There is just no way around the fact that we are performing close to a billion iterations!

Update: as I suspected, there is a better way. I first generate all the "suitable" 3-digit primes (no zeroes, no repeating digits), then try to combine these into a set of 3 3-digit primes that constitute a solution. With no very great effort at improving performance, this "Smart Search" was about 1,000 times as fast, proving once again the primacy of a good algorithm!

I added UI to let the user can choose the fast or the slow search. I am thinking about adding an interactive mode.