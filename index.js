var fs = require('fs');
var ApgExp = require("apg-exp");

// Get contents of file name given in 1st command line argument
//var args = require('minimist')(process.argv.slice(2));
var args = { _: process.argv.slice(2)};

// console.dir(args._[0]);

var pattern = fs.readFileSync(args._[0], 'utf8');

var flags = null;

var stringToMatch = args._[1] ||
`2019-06-12 17:51:39,405
2019-06-12 17:51:39,409`

try {
  var exp = new ApgExp(pattern, flags);
  var result = exp.exec(stringToMatch);
  if (result) {
    console.log(result.toText());
    // do something with results
  } else {
    console.error("Parsing failed");
    // handle failure
  }
} catch(e) {
  if (e.name === "ApgExpError") {
    console.error(e.toText());
  } else if(e instanceof Error){
    console.log("Error thrown: " + e.message);
  } else {
    console.log("Unrecognized exception thrown:\n" + e);
  }
}
