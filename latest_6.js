/* Robbo's Intersecting Paths Algorithm (RIPA)
Creative Commons License (CC BY)
by Robert Codell

Im pretty sure this is the fastest method of pathfinding available with 95%+ optimal routing (depending how you name the Paths)

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
*/


var pathStart = "E1";
var pathEnd = "C2";
var showInfo = true;

var Paths = ['AB','BA','AC','CA','AG','GA','BC','CB','DC','FC','EB','EC','FC','HG'];
var PathNames = ['A1','B1','B1','A1','A2','C1','C1','A2','A3','G1','G1','A3','B4','C2','C2','B4','D1','C1','F1','C4','E1','B3','E4','C6','F1','C4','H1','G3'];

var startTime = new Date().getTime();
var maxRuns = 10; // max tries before cant find path (normally is 1-3)
var foundPath = false;
this.nextCount = 1;
this.lastCount = 1;
this.prevEnd = 0;
this.arrayStart = [];
this.arrayEnd = [];
this.pathBasic = [];
this.pathFull = [];
this.nextStart = pathStart[0];
this.lastEnd = pathEnd[0];
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var letters = alphabet.length-1;


// FUNCTIONS

// get next end path
this.nextFromEnd = function() {
this.lastCount = 0;

for (i=letters; i > -1; i--) {
this.nextPath = alphabet[i];
if (this.nextPath != this.prevEnd) {
var tryPath = this.lastEnd+this.nextPath;
var foundID = Paths.indexOf(tryPath);
if (foundID != -1) {
this.lastCount++;
this.lastFound = this.nextPath;
this.lastFoundPath = this.nextPath+this.lastEnd;
this.lastFoundID = foundID;
}}}
// get next lowest path up tree
if (this.lastCount==1 || this.lastCount > 1 && this.firstMultiLast) {
this.prevEnd = this.lastEnd;
this.lastEnd = this.lastFound;
this.arrayEnd.push("b");
this.arrayEnd.push(lastFoundID);
this.arrayEnd.push(lastFoundPath);
if (this.lastCount > 1) {this.firstMultiLast = false;}
}}

// get next start path
this.nextFromStart = function() {
this.nextCount = 0;
// get next lowest path up tree
for (i=letters; i > -1; i--) {
this.nextPath = alphabet[i];
var tryPath = this.nextStart+this.nextPath;
var foundID = Paths.indexOf(tryPath);
if (foundID != -1) {
this.nextCount++;
this.nextFound = this.nextPath;
this.nextFoundPath = tryPath;
this.nextFoundID = foundID;
}}
if (this.nextCount==1 || this.nextCount > 1 && this.firstMultiNext) {
this.nextStart = this.nextFound;
this.arrayStart.push(nextFoundPath);
this.arrayStart.push(nextFoundID);
this.arrayStart.push("f");
if (this.nextCount > 1) {this.firstMultiNext = false;}
}}

// run detailed search
if (showInfo) {print("search from: " + pathStart + " to " + pathEnd + "\n");}

// cycle last end-path until multiple options
this.firstMultiLast = true;
this.firstMultiNext = true;

// run until a direct path is found
for (r=0; r<maxRuns; r++) {

if (foundPath == false) {

// check for direct connect
var tryPath = this.nextStart+this.lastEnd;
var foundID = Paths.indexOf(tryPath);
if (foundID != -1 || this.nextStart == this.lastEnd) {
foundPath = true;
r=maxRuns;
if (foundID != -1) {
this.arrayStart.push(tryPath);
this.arrayStart.push(foundID);
this.arrayStart.push("f");
}}
// check for common path
if (foundPath == false && this.lastEnd != "A") {
this.nextFromEnd();
var tryPath = this.nextStart+this.lastEnd;
var foundID = Paths.indexOf(tryPath);
if (foundID != -1 || this.nextStart == this.lastEnd) {
foundPath = true;
r=maxRuns;
if (foundID != -1) {
this.arrayStart.push(tryPath);
this.arrayStart.push(foundID);
this.arrayStart.push("f");
}}}

if (foundPath == false && this.nextStart != "A") {this.nextFromStart();}
} // end of check if false
} // end of loop

// append end to start array
if (foundPath == true) {

var count = this.arrayEnd.length -1;
for (a=count; a > -1; a--) {
this.arrayStart.push(this.arrayEnd[a]);
}
if (showInfo) {print("path simple: " + this.arrayStart.toString() + "\n");}

// get summary path
var count = this.arrayStart.length;
for (p=0; p < count; p+=3) {
var pathID = this.arrayStart[p+1];
var dir = this.arrayStart[p+2];
var pathNameID = pathID * 2;
if (dir == "f") {
var pathFrom = PathNames[pathNameID];
var pathTo = PathNames[pathNameID+1];
} else {
var pathFrom = PathNames[pathNameID+1];
var pathTo = PathNames[pathNameID];
}
this.pathBasic.push(pathFrom);
this.pathBasic.push(pathTo);
}

// append start & end as needed
var count = this.pathBasic.length;
if (pathEnd != this.pathBasic[count-1]) {this.pathBasic.push(pathEnd);}
if (pathStart != this.pathBasic[0]) {this.pathBasic.unshift(pathStart);}
if (showInfo) {print("path outline: " + this.pathBasic.toString() + "\n");}

// create complete path
var count = this.pathBasic.length;
for (i=0; i < count; i++) {
var cur = this.pathBasic[i];
this.pathFull.push(cur);
// exclude last item
if (i < count -1) {
var next = this.pathBasic[i+1];

// missing items needed - max 3 digits (ie A999)
if (cur[0] == next[0]) {
var idCur = cur.substring(1,4) * 1;
var idNext = next.substring(1,4) * 1;
var diff = idNext - idCur;
var adjust = 1;
if (diff < 0) {adjust = -1;}
var diffCount = Math.abs(diff) - 1;

// insert missing items
for (n=0; n < diffCount; n++) {
idCur += adjust;
var insert = cur[0] + idCur;
this.pathFull.push(insert);
}}}
}
var endTime = new Date().getTime();
var timeTaken = endTime - startTime;
print("Time: " + timeTaken + " ms");
print("path full: " + this.pathFull.toString());
} else {print("cannot find end path - recheck array data");}