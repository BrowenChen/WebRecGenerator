//Obj 2) Need to test if JSON file is existing. If not existing, 
//Create new. If existing, use previous JSON data.

//Function file exists checker

var path = require('path'); 
var fs = require('fs');

// path.exists('sp.json', function(exists) { 
//   if (exists) { 
//     // do something 
//     console.log("This exists");
//   } else {
//     console.log("This doesn't exist, making new file");

//   }
// }); 

/*
    Method checks if file exists or not

    @method checkExists
    @param {String} filename
    @return {Boolean} True or False

*/

var tempExist = 0;

var contentsSync = fs.readFileSync('sites.json').toString();
console.log(contentsSync);

var contents = fs.readFile('sites.json', function(err, data){
    if (err) throw err;

});
console.log(contents);


var checkExists = function(file){
    path.exists(file, function(exists) { 
      if (exists) { 
        // do something 
        console.log("This exists");
        tempExist = true;
      } else {
        console.log("This doesn't exist, making new file");
        tempExist = false;
      }
    }); 
}


checkExists("sites.json");
checkExists("no.json");
console.log(tempExist);
console.log(tempExist);

//There is a synchronous error





// //Goal is to take the property values of the topics "programming"
// // and gaming to create their own property values. 

// //Ex. sites["programming"][0].quality = 3


// var sites = {
//     "programming": [
//         "1",
//         "2",
//         "3",
//         "4"
//     ],
//     "gaming": [
//         "3",
//         "6"
//     ],
// }

// console.log(sites);

// var theKey = sites["programming"];
// var newSiteObjects = [];
// console.log(theKey);
// for (var site in theKey){
//     console.log(theKey[site]);
//     var val = {
//         name: theKey[site]
//     }

//     newSiteObjects.push(val);
// }

// console.log(newSiteObjects);
// //New Site Object is array of objects
// //The name of the card is card.name

// for (var i in newSiteObjects){
//     console.log(newSiteObjects[i]);
//     console.log(newSiteObjects[i].name);
//     newSiteObjects[i].card = "hi";
//     console.log(newSiteObjects[i].card);

// }




// console.log(theKey);
// var vals = Object.keys(theKey).map(function (key) {
//     return theKey[key];
// });

// console.log(vals);  