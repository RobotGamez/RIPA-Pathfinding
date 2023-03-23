# RIPA-Pathfinding
Fastest pathfinding algorithm

Will find optimal routing (depending how you name the Paths)

NOTES
- An individual Path is made up individual path nodes in sequential order either up or down (ie B1, B2, B3 etc)
- All Paths must have access to a common central Path 'A' corridor directly or indirectly
- Connected Paths extending out from Path 'A' must be in alphabetical order from B to Z as it expands out in a tree like fashion
- Create your path nodes and then update both the 'Paths' & 'PathNames' arrays
- Change the pathStart & pathEnd variables and run the code

'Paths' array
- The 'Paths' array should only contain the different connecting path points going from the first path (B) to the next path (C) as 'BC'
- Do not add dead end paths or same path connections (BB)

- 'PathNames' array
- Record the individual path node names like 'B1' and 'C2' (index 0 & 1) linked in the same order as the 'Paths' array (index 0) 'BC'
-  such that there are always 2 entries for each entry in the 'Paths' array.

- Allows for up to 1,000 path nodes per Path and 26 different Paths (update the 'alphabet' array below to add more than 26)
- Reduce the chances of calculating a sub optimal route by keeping lower alphabetical Path names closer to the central 'A' Path
