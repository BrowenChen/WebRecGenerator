//Goal is to take the property values of the topics "programming"
// and gaming to create their own property values. 

//Ex. sites["programming"][0].quality = 3


var sites = {
    "programming": [
        "1",
        "2",
        "3",
        "4"
    ],
    "gaming": [
        "3",
        "6"
    ],
}

console.log(sites);

var theKey = sites["programming"];
var newSiteObjects = [];
console.log(theKey);
for (var site in theKey){
    console.log(theKey[site]);
    var val = {
        name: theKey[site]
    }

    newSiteObjects.push(val);
}

console.log(newSiteObjects);
//New Site Object is array of objects
//The name of the card is card.name

for (var i in newSiteObjects){
    console.log(newSiteObjects[i]);
    console.log(newSiteObjects[i].name);
    newSiteObjects[i].card = "hi";
    console.log(newSiteObjects[i].card);

}




// console.log(theKey);
// var vals = Object.keys(theKey).map(function (key) {
//     return theKey[key];
// });

// console.log(vals);  